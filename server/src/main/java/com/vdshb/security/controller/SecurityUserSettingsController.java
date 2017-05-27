package com.vdshb.security.controller;

import com.vdshb.security.AccessTokenSecurityContextRepository;
import com.vdshb.security.SecurityUserToken;
import com.vdshb.security.domain.entity.ChangeEmail;
import com.vdshb.security.domain.entity.SecurityUser;
import com.vdshb.security.domain.request.ChangePasswordRequest;
import com.vdshb.security.domain.request.UserInfoRequest;
import com.vdshb.security.domain.response.PublicUser;
import com.vdshb.security.repository.ChangeEmailRepository;
import com.vdshb.security.repository.SecurityUserRepository;
import com.vdshb.security.service.SecurityEmailService;
import com.vdshb.security.service.SecurityUserService;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.transaction.Transactional;
import java.time.Instant;
import java.util.List;

@RestController
public class SecurityUserSettingsController {

    @Value("${security.email-confirmation-token-expiration-time}")
    int emailTokenExpirationTime;

    @Value("${app.url}")
    String appUrl;

    @Inject
    private SecurityUserService securityUserService;

    @Inject
    private SecurityUserRepository securityUserRepository;

    @Inject
    private ChangeEmailRepository changeEmailRepository;

    @Inject
    private SecurityEmailService securityEmailService;

    @Inject
    private AccessTokenSecurityContextRepository accessTokenSecurityContextRepository;

    @PostMapping("/api/security/current-user/change-info")
    public PublicUser changeUserInfo(@RequestBody UserInfoRequest userInfoRequest) {
        SecurityUserToken userToken = (SecurityUserToken) SecurityContextHolder.getContext().getAuthentication();
        SecurityUser currentUser = userToken.getPrincipal();
        currentUser.setName(userInfoRequest.getName());
        currentUser.setLanguage(userInfoRequest.getLanguage());
        securityUserRepository.save(currentUser);
        return new PublicUser(userToken);
    }

    @PostMapping("/api/security/current-user/change-password")
    public ResponseEntity changePassword(@RequestBody ChangePasswordRequest changePasswordRequest) {
        SecurityUserToken userToken = (SecurityUserToken) SecurityContextHolder.getContext().getAuthentication();
        SecurityUser currentUser = userToken.getPrincipal();
        if (!securityUserService.isCorrectPassword(currentUser, changePasswordRequest.getCurrentPassword())) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(null);
        }
        currentUser.setSalt(RandomStringUtils.randomAlphanumeric(6));
        currentUser.setHashedPassword(DigestUtils.sha512Hex(changePasswordRequest.getNewPassword() + currentUser.getSalt()));
        securityUserRepository.save(currentUser);
        return ResponseEntity.ok(null);
    }

    @PostMapping("/api/security/current-user/change-email")
    public ResponseEntity changePassword(@RequestBody UserInfoRequest userInfoRequest) {
        SecurityUserToken userToken = (SecurityUserToken) SecurityContextHolder.getContext().getAuthentication();
        SecurityUser currentUser = userToken.getPrincipal();
        String newEmail = userInfoRequest.getEmail().toLowerCase();

        if (currentUser.getEmail().equals(newEmail)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        if (securityUserRepository.findByEmail(newEmail) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }

        ChangeEmail changeEmail = new ChangeEmail();
        changeEmail.setNewEmail(newEmail);
        changeEmail.setCurrentEmailConfirmationToken(RandomStringUtils.randomAlphanumeric(64));
        changeEmail.setNewEmailConfirmationToken(RandomStringUtils.randomAlphanumeric(64));
        changeEmail.setCreationDateTime(Instant.now());
        changeEmail.setCurrentEmailConfirmed(false);
        changeEmail.setNewEmailConfirmed(false);
        changeEmail.setSecurityUser(currentUser);
        changeEmailRepository.save(changeEmail);
        securityEmailService.onEmailChangeSendNewEmailAddressConfirmationMessage(changeEmail);
        securityEmailService.onEmailChangeSendCurrentEmailAddressConfirmationMessage(changeEmail);
        return ResponseEntity.ok(null);
    }

    @GetMapping("/api/security/change-email/confirm-current-email/{emailConfirmationToken}")
    @Transactional
    public ResponseEntity changeEmail_ConfirmCurrentEmail(@PathVariable String emailConfirmationToken) {
        ChangeEmail changeEmail = changeEmailRepository.findByCurrentEmailConfirmationToken(emailConfirmationToken);
        if (changeEmail == null || changeEmail.getCreationDateTime().plusSeconds(emailTokenExpirationTime).isBefore(Instant.now())) {
            return ResponseEntity.status(HttpStatus.FOUND).header("Location", appUrl + "/security/message/change-email__email-confirmation-error").body(null);
        }

        changeEmail.setCurrentEmailConfirmed(true);
        changeEmailRepository.save(changeEmail);
        if (changeEmail.isNewEmailConfirmed()) {
            finishChangeEmail(changeEmail);
            return ResponseEntity.status(HttpStatus.FOUND).header("Location", appUrl + "/security/message/change-email__success").body(null);
        }

        return ResponseEntity.status(HttpStatus.FOUND).header("Location", appUrl + "/security/message/change-email__current-email-confirmation-success").body(null);
    }

    @GetMapping("/api/security/change-email/confirm-new-email/{emailConfirmationToken}")
    @Transactional
    public ResponseEntity changeEmail_ConfirmNewEmail(@PathVariable String emailConfirmationToken) {
        ChangeEmail changeEmail = changeEmailRepository.findByNewEmailConfirmationToken(emailConfirmationToken);
        if (changeEmail == null || changeEmail.getCreationDateTime().plusSeconds(emailTokenExpirationTime).isBefore(Instant.now())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        changeEmail.setNewEmailConfirmed(true);
        changeEmailRepository.save(changeEmail);
        if (changeEmail.isCurrentEmailConfirmed()) {
            finishChangeEmail(changeEmail);
            return ResponseEntity.status(HttpStatus.FOUND).header("Location", appUrl + "/security/message/change-email__success").body(null);
        }

        return ResponseEntity.status(HttpStatus.FOUND).header("Location", appUrl + "/security/message/change-email__new-email-confirmation-success").body(null);
    }

    private void finishChangeEmail(ChangeEmail changeEmail) {
        SecurityUser securityUser = changeEmail.getSecurityUser();
        securityUser.setEmail(changeEmail.getNewEmail());
        securityUserRepository.save(securityUser);
        accessTokenSecurityContextRepository.dropCachedAuthentication(securityUser.getAccessToken());

        List<ChangeEmail> changeSecurityUserWithSameNewEmail = changeEmailRepository.findByNewEmail(changeEmail.getNewEmail());
        changeEmailRepository.delete(changeSecurityUserWithSameNewEmail);
    }
}
