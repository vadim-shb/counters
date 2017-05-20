package com.vdshb.security.controller;

import com.vdshb.security.domain.*;
import com.vdshb.security.repository.InactiveSecurityUserRepository;
import com.vdshb.security.repository.RoleRepository;
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
    private RoleRepository roleRepository;

    @Inject
    private SecurityEmailService securityEmailService;

    @PostMapping("/api/security/sign-up")
    @Transactional
    public ResponseEntity signUp(@RequestBody UserInfoRequest userInfoRequest) {
        SecurityUser securityUser = securityUserRepository.findByEmail(userInfoRequest.getEmail().toLowerCase());
        if (securityUser != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }

        InactiveSecurityUser inactiveSecurityUser = fulfillInactiveSecurityUser(userInfoRequest);
        inactiveSecurityUserRepository.save(inactiveSecurityUser);
        securityEmailService.sendEmailAddressConfirmationEmail(inactiveSecurityUser);
        return ResponseEntity.ok(null);
    }

    private InactiveSecurityUser fulfillInactiveSecurityUser(UserInfoRequest userInfoRequest) {
        InactiveSecurityUser result = new InactiveSecurityUser();
        result.setEmail(userInfoRequest.getEmail().toLowerCase());
        result.setName(userInfoRequest.getName());
        result.setLanguage(userInfoRequest.getLanguage());
        result.setSalt(RandomStringUtils.randomAlphanumeric(6));
        result.setHashedPassword(DigestUtils.sha512Hex(userInfoRequest.getPassword() + result.getSalt()));
        result.setEmailConfirmationToken(RandomStringUtils.randomAlphanumeric(64));
        result.setCreationDateTime(Instant.now());
        return result;
    }

    @GetMapping("/api/security/confirm-user-email/{emailConfirmationToken}")
    @Transactional
    public ResponseEntity confirmEmail(@PathVariable String emailConfirmationToken) {
        InactiveSecurityUser inactiveSecurityUser = inactiveSecurityUserRepository.findByEmailConfirmationToken(emailConfirmationToken);
        if (inactiveSecurityUser == null || inactiveSecurityUser.getCreationDateTime().plusSeconds(emailTokenExpirationTime).isBefore(Instant.now())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        SecurityUser securityUser = securityUserRepository.save(fulfillSecurityUser(inactiveSecurityUser));
        Role role = new Role();
        role.setSecurityUser(securityUser);
        role.setRole(SecurityRole.USER);
        roleRepository.save(role);
        List<InactiveSecurityUser> securityUsersWithSameId = inactiveSecurityUserRepository.findByEmail(inactiveSecurityUser.getEmail());
        inactiveSecurityUserRepository.delete(securityUsersWithSameId);

        return ResponseEntity.status(HttpStatus.FOUND).header("Location", appUrl + "/security/message/email-confirmation-success").body(null);
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
