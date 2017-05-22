package com.vdshb.security.controller;

import com.vdshb.security.AccessTokenSecurityContextRepository;
import com.vdshb.security.SecurityUserToken;
import com.vdshb.security.domain.entity.ChangeSecurityUserEmail;
import com.vdshb.security.domain.entity.SecurityUser;
import com.vdshb.security.domain.request.ChangePasswordRequest;
import com.vdshb.security.domain.request.UserInfoRequest;
import com.vdshb.security.domain.response.PublicUser;
import com.vdshb.security.repository.ChangeSecurityUserEmailRepository;
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
    private ChangeSecurityUserEmailRepository changeSecurityUserEmailRepository;

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

        ChangeSecurityUserEmail changeSecurityUserEmail = new ChangeSecurityUserEmail();
        changeSecurityUserEmail.setNewEmail(newEmail);
        changeSecurityUserEmail.setCurrentEmailConfirmationToken(RandomStringUtils.randomAlphanumeric(64));
        changeSecurityUserEmail.setNewEmailConfirmationToken(RandomStringUtils.randomAlphanumeric(64));
        changeSecurityUserEmail.setCreationDateTime(Instant.now());
        changeSecurityUserEmail.setCurrentEmailConfirmed(false);
        changeSecurityUserEmail.setNewEmailConfirmed(false);
        changeSecurityUserEmail.setSecurityUser(currentUser);
        changeSecurityUserEmailRepository.save(changeSecurityUserEmail);
        securityEmailService.onEmailChangeSendNewEmailAddressConfirmationMessage(changeSecurityUserEmail);
        securityEmailService.onEmailChangeSendCurrentEmailAddressConfirmationMessage(changeSecurityUserEmail);
        return ResponseEntity.ok(null);
    }

    @GetMapping("/api/security/change-email/confirm-current-email/{emailConfirmationToken}")
    @Transactional
    public ResponseEntity changeEmail_ConfirmCurrentEmail(@PathVariable String emailConfirmationToken) {
        ChangeSecurityUserEmail changeSecurityUserEmail = changeSecurityUserEmailRepository.findByCurrentEmailConfirmationToken(emailConfirmationToken);
        if (changeSecurityUserEmail == null || changeSecurityUserEmail.getCreationDateTime().plusSeconds(emailTokenExpirationTime).isBefore(Instant.now())) {
            return ResponseEntity.status(HttpStatus.FOUND).header("Location", appUrl + "/security/message/change-email__email-confirmation-error").body(null);
        }

        changeSecurityUserEmail.setCurrentEmailConfirmed(true);
        changeSecurityUserEmailRepository.save(changeSecurityUserEmail);
        if (changeSecurityUserEmail.isNewEmailConfirmed()) {
            finishChangeSecurityUserEmail(changeSecurityUserEmail);
            return ResponseEntity.status(HttpStatus.FOUND).header("Location", appUrl + "/security/message/change-email__success").body(null);
        }

        return ResponseEntity.status(HttpStatus.FOUND).header("Location", appUrl + "/security/message/change-email__current-email-confirmation-success").body(null);
    }

    @GetMapping("/api/security/change-email/confirm-new-email/{emailConfirmationToken}")
    @Transactional
    public ResponseEntity changeEmail_ConfirmNewEmail(@PathVariable String emailConfirmationToken) {
        ChangeSecurityUserEmail changeSecurityUserEmail = changeSecurityUserEmailRepository.findByNewEmailConfirmationToken(emailConfirmationToken);
        if (changeSecurityUserEmail == null || changeSecurityUserEmail.getCreationDateTime().plusSeconds(emailTokenExpirationTime).isBefore(Instant.now())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        changeSecurityUserEmail.setNewEmailConfirmed(true);
        changeSecurityUserEmailRepository.save(changeSecurityUserEmail);
        if (changeSecurityUserEmail.isCurrentEmailConfirmed()) {
            finishChangeSecurityUserEmail(changeSecurityUserEmail);
            return ResponseEntity.status(HttpStatus.FOUND).header("Location", appUrl + "/security/message/change-email__success").body(null);
        }

        return ResponseEntity.status(HttpStatus.FOUND).header("Location", appUrl + "/security/message/change-email__new-email-confirmation-success").body(null);
    }

    private void finishChangeSecurityUserEmail(ChangeSecurityUserEmail changeSecurityUserEmail) {
        SecurityUser securityUser = changeSecurityUserEmail.getSecurityUser();
        securityUser.setEmail(changeSecurityUserEmail.getNewEmail());
        securityUserRepository.save(securityUser);
        accessTokenSecurityContextRepository.dropCachedAuthentication(securityUser.getAccessToken());

        List<ChangeSecurityUserEmail> changeSecurityUserWithSameNewEmail = changeSecurityUserEmailRepository.findByNewEmail(changeSecurityUserEmail.getNewEmail());
        changeSecurityUserEmailRepository.delete(changeSecurityUserWithSameNewEmail);
    }
}
