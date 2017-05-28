package com.vdshb.security.controller;

import com.vdshb.security.domain.request.EmailPasswordCredentials;
import com.vdshb.security.domain.response.AuthenticatedUserResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * This is just a stub. It adds knowledge about this API to swagger.
 * Real logic is in custom AuthenticationProviders, Filters and so on.
 * See com.vdshb.config.SecurityConfig to understand what really happens.
 */
@RestController
public class SecuritySwaggerController {

    @PostMapping("/api/security/sign-in/email-password")
    public AuthenticatedUserResponse signIn(@RequestBody EmailPasswordCredentials credentials) {
        return null;
    }

    @PostMapping("/api/security/refresh-auth-session")
    public AuthenticatedUserResponse refreshAuthSession(@RequestBody String refreshToken) {
        return null;
    }

    @GetMapping("/api/security/sign-out")
    public void signOut() {
    }

}
