package com.vdshb.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import java.util.stream.Collectors;

public class AuthenticatedUserResponse {

    private AuthenticationSession session;
    private PublicUser user;

    public AuthenticatedUserResponse(Authentication authentication) {
        SecurityUser securityUser = (SecurityUser) authentication.getPrincipal();
        session = new AuthenticationSession();
        session.setAccessToken(securityUser.getAccessToken());
        session.setRefreshToken(securityUser.getRefreshToken());
        session.setAccessTokenExpirationTime(securityUser.getAccessTokenExpirationDateTime());
        session.setRefreshTokenExpirationTime(securityUser.getRefreshTokenExpirationDateTime());
        user = new PublicUser();
        user.setFirstName(securityUser.getFirstName());
        user.setLastName(securityUser.getLastName());
        user.setEmail(securityUser.getEmail());
        user.setRoles(authentication.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList())
        );
    }

    public AuthenticationSession getSession() {
        return session;
    }

    public PublicUser getUser() {
        return user;
    }
}
