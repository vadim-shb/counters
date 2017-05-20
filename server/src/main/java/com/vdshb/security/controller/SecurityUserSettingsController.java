package com.vdshb.security.controller;

import com.vdshb.security.SecurityUserToken;
import com.vdshb.security.domain.response.PublicUser;
import com.vdshb.security.domain.entity.SecurityUser;
import com.vdshb.security.domain.request.UserInfoRequest;
import com.vdshb.security.repository.SecurityUserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;

@RestController
public class SecurityUserSettingsController {

    @Inject
    SecurityUserRepository securityUserRepository;

    @PostMapping("/api/security/current-user")
    public PublicUser changeUserInfo(@RequestBody UserInfoRequest userInfoRequest) {
        SecurityUserToken userToken = (SecurityUserToken) SecurityContextHolder.getContext().getAuthentication();
        SecurityUser user = userToken.getPrincipal();
        user.setName(userInfoRequest.getName());
        user.setLanguage(userInfoRequest.getLanguage());
        securityUserRepository.save(user);
        return new PublicUser(userToken);
    }
}
