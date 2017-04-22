package com.vdshb.security;

public class AuthenticatedUserResponse {

    private AuthenticationSession session;
    private PublicUser user;

    public AuthenticatedUserResponse(SecurityUser securityUser) {
        session = new AuthenticationSession();
        session.setAccessToken(securityUser.getAccessToken());
        session.setRefreshToken(securityUser.getRefreshToken());
        session.setAccessTokenExpirationTime(securityUser.getAccessTokenExpirationDateTime());
        session.setRefreshTokenExpirationTime(securityUser.getRefreshTokenExpirationDateTime());
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
