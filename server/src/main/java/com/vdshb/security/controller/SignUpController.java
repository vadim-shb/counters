package com.vdshb.security.controller;

import com.vdshb.security.domain.InactiveSecurityUser;
import com.vdshb.security.domain.SecurityUser;
import com.vdshb.security.domain.SignUpRequest;
import com.vdshb.security.repository.InactiveSecurityUserRepository;
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
public class SignUpController {

    private Logger log = LoggerFactory.getLogger(SignUpController.class);

    @Value("${security.email-confirmation-token-expiration-time}")
    int emailTokenExpirationTime;

    @Value("${app.url}")
    String appUrl;

    @Inject
    private InactiveSecurityUserRepository inactiveSecurityUserRepository;

    @Inject
    private SecurityUserRepository securityUserRepository;

    @Inject
    private SecurityEmailService securityEmailService;

    @PostMapping("/api/security/sign-up")
    @Transactional
    public ResponseEntity signUp(@RequestBody SignUpRequest signUpRequest) throws InterruptedException {
        SecurityUser securityUser = securityUserRepository.findByEmail(signUpRequest.getEmail().toLowerCase());
        if (securityUser != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }

        InactiveSecurityUser inactiveSecurityUser = fulfillInactiveSecurityUser(signUpRequest);
        inactiveSecurityUserRepository.save(inactiveSecurityUser);
        securityEmailService.sendEmailConfirmation(inactiveSecurityUser);
        return ResponseEntity.ok(null);
    }

    private InactiveSecurityUser fulfillInactiveSecurityUser(SignUpRequest signUpRequest) {
        InactiveSecurityUser result = new InactiveSecurityUser();
        result.setEmail(signUpRequest.getEmail().toLowerCase());
        result.setName(signUpRequest.getName());
        result.setLanguage(signUpRequest.getLanguage());
        result.setSalt(RandomStringUtils.randomAlphanumeric(6));
        result.setHashedPassword(DigestUtils.sha512Hex(signUpRequest.getPassword() + result.getSalt()));
        result.setEmailConfirmationToken(RandomStringUtils.randomAlphanumeric(64));
        result.setCreationDateTime(Instant.now());
        return result;
    }

    @GetMapping("/api/security/confirm-email/{emailConfirmationToken}")
    @Transactional
    public ResponseEntity confirmEmail(@PathVariable String emailConfirmationToken) {
        InactiveSecurityUser inactiveSecurityUser = inactiveSecurityUserRepository.findByEmailConfirmationToken(emailConfirmationToken);
        if (inactiveSecurityUser == null || inactiveSecurityUser.getCreationDateTime().plusSeconds(emailTokenExpirationTime).isBefore(Instant.now())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        SecurityUser securityUser = fulfillSecurityUser(inactiveSecurityUser);
        securityUserRepository.save(securityUser);
        List<InactiveSecurityUser> securityUsersWithSameId = inactiveSecurityUserRepository.findByEmail(inactiveSecurityUser.getEmail());
        inactiveSecurityUserRepository.delete(securityUsersWithSameId);

        return ResponseEntity.status(HttpStatus.FOUND).header("Location", appUrl + "/security/confirm-email").body(null);
    }

    private SecurityUser fulfillSecurityUser(InactiveSecurityUser inactiveSecurityUser) {
        SecurityUser result = new SecurityUser();
        result.setEmail(inactiveSecurityUser.getEmail());
        result.setName(inactiveSecurityUser.getName());
        result.setLanguage(inactiveSecurityUser.getLanguage());
        result.setSalt(inactiveSecurityUser.getSalt());
        result.setHashedPassword(inactiveSecurityUser.getHashedPassword());
        return result;
    }
}
