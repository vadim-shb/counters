package com.vdshb.security.controller;

import com.vdshb.security.SecurityUserToken;
import com.vdshb.security.domain.entity.SecurityUser;
import com.vdshb.security.domain.request.ChangePasswordRequest;
import com.vdshb.security.domain.request.UserInfoRequest;
import com.vdshb.security.domain.response.PublicUser;
import com.vdshb.security.repository.SecurityUserRepository;
import com.vdshb.security.service.SecurityUserService;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;

@RestController
public class SecurityUserSettingsController {

    @Inject
    private SecurityUserService securityUserService;

    @Inject
    private SecurityUserRepository securityUserRepository;

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
}
