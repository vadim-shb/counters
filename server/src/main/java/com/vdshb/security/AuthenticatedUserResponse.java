package com.vdshb.security;

import java.time.ZoneOffset;

public class AuthenticatedUserResponse {

    private AuthenticationSession session;
    private PublicUser user;

    public AuthenticatedUserResponse(SecurityUser securityUser) {
        session = new AuthenticationSession();
        session.setAccessToken(securityUser.getAccessToken());
        session.setRefreshToken(securityUser.getRefreshToken());
        session.setAccessTokenExpirationTime(securityUser.getAccessTokenExpirationDateTime().toInstant(ZoneOffset.UTC));
        session.setRefreshTokenExpirationTime(securityUser.getRefreshTokenExpirationDateTime().toInstant(ZoneOffset.UTC));
        user = new PublicUser();
        user.setFirstName(securityUser.getFirstName());
        user.setLastName(securityUser.getLastName());
        user.setEmail(securityUser.getEmail());
    }

    public AuthenticationSession getSession() {
        return session;
    }

    public PublicUser getUser() {
        return user;
    }
}
