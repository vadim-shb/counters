package com.vdshb.security;

import java.time.Instant;
import java.time.ZoneOffset;

public class AuthenticatedUserResponse {

    private String accessToken;
    private String refreshToken;

    private Instant accessTokenExpirationTime;
    private Instant refreshTokenExpirationTime;
    private PublicUser user;

    public AuthenticatedUserResponse(SecurityUser securityUser) {
        accessToken = securityUser.getAccessToken();
        refreshToken = securityUser.getRefreshToken();
        accessTokenExpirationTime = securityUser.getAccessTokenExpirationDateTime().toInstant(ZoneOffset.UTC);
        refreshTokenExpirationTime = securityUser.getRefreshTokenExpirationDateTime().toInstant(ZoneOffset.UTC);
        user = new PublicUser();
        user.setFirstName(securityUser.getFirstName());
        user.setLastName(securityUser.getLastName());
        user.setEmail(securityUser.getEmail());
    }

    public String getAccessToken() {
        return accessToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public Instant getAccessTokenExpirationTime() {
        return accessTokenExpirationTime;
    }

    public Instant getRefreshTokenExpirationTime() {
        return refreshTokenExpirationTime;
    }

    public PublicUser getUser() {
        return user;
    }
}
