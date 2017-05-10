package com.vdshb.security.controller;

import com.vdshb.security.domain.*;
import com.vdshb.security.repository.PasswordRecoveryRepository;
import com.vdshb.security.repository.SecurityUserRepository;
import com.vdshb.security.service.SecurityEmailService;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.transaction.Transactional;
import java.time.Instant;
import java.util.List;

@RestController
public class PasswordRecoveryController {

    private Logger log = LoggerFactory.getLogger(PasswordRecoveryController.class);

    @Value("${security.email-password-recovery-token-expiration-time}")
    int emailPasswordRecoveryTokenExpirationTime;

    @Value("${app.url}")
    String appUrl;

    @Inject
    private SecurityUserRepository securityUserRepository;

    @Inject
    private PasswordRecoveryRepository passwordRecoveryRepository;

    @Inject
    private SecurityEmailService securityEmailService;

    @PostMapping("/api/security/recovery-password-by-email")
    @Transactional
    public ResponseEntity signUp(@RequestBody PasswordRecoveryRequest passwordRecoveryRequest) {
        SecurityUser securityUser = securityUserRepository.findByEmail(passwordRecoveryRequest.getEmail().toLowerCase());
        if (securityUser == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        PasswordRecovery passwordRecovery = fulfillPasswordRecovery(passwordRecoveryRequest, securityUser);
        passwordRecoveryRepository.save(passwordRecovery);
        securityEmailService.sendPasswordRecoveryEmail(passwordRecovery);
        return ResponseEntity.ok(null);
    }

    private PasswordRecovery fulfillPasswordRecovery(PasswordRecoveryRequest passwordRecoveryRequest, SecurityUser securityUser) {
        PasswordRecovery result = new PasswordRecovery();
        result.setSecurityUser(securityUser);
        result.setSalt(RandomStringUtils.randomAlphanumeric(6));
        result.setHashedPassword(DigestUtils.sha512Hex(passwordRecoveryRequest.getPassword() + result.getSalt()));
        result.setEmailConfirmationToken(RandomStringUtils.randomAlphanumeric(64));
        result.setCreationDateTime(Instant.now());
        return result;
    }

    @GetMapping("/api/security/password-recovery-confirmation/{emailConfirmationToken}")
    @Transactional
    public ResponseEntity confirmEmail(@PathVariable String emailConfirmationToken) {
        PasswordRecovery passwordRecovery = passwordRecoveryRepository.findByEmailConfirmationToken(emailConfirmationToken);
        if (passwordRecovery == null || passwordRecovery.getCreationDateTime().plusSeconds(emailPasswordRecoveryTokenExpirationTime).isBefore(Instant.now())) {
            return ResponseEntity.status(HttpStatus.FOUND).header("Location", appUrl + "/security/password-recovery-error").body(null);
        }

        SecurityUser securityUser = passwordRecovery.getSecurityUser();
        securityUser.setSalt(passwordRecovery.getSalt());
        securityUser.setHashedPassword(passwordRecovery.getHashedPassword());
        securityUserRepository.save(securityUser);
        List<PasswordRecovery> passwordRecoveriesWithSameSecurityUser = passwordRecoveryRepository.findBySecurityUser(passwordRecovery.getSecurityUser());
        passwordRecoveryRepository.delete(passwordRecoveriesWithSameSecurityUser);

        return ResponseEntity.status(HttpStatus.FOUND).header("Location", appUrl + "/security/password-recovery-success").body(null);
    }
}
