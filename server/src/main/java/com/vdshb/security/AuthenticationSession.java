package com.vdshb.security;

import java.time.Instant;

public class AuthenticationSession {

    private String accessToken;
    private String refreshToken;

    private Instant accessTokenExpirationTime;
    private Instant refreshTokenExpirationTime;

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public Instant getAccessTokenExpirationTime() {
        return accessTokenExpirationTime;
    }

    public void setAccessTokenExpirationTime(Instant accessTokenExpirationTime) {
        this.accessTokenExpirationTime = accessTokenExpirationTime;
    }

    public Instant getRefreshTokenExpirationTime() {
        return refreshTokenExpirationTime;
    }

    public void setRefreshTokenExpirationTime(Instant refreshTokenExpirationTime) {
        this.refreshTokenExpirationTime = refreshTokenExpirationTime;
    }
}