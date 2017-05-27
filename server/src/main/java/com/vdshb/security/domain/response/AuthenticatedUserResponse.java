package com.vdshb.security.domain.response;

import com.vdshb.security.SecurityUserToken;
import com.vdshb.security.domain.entity.SecurityUser;
import org.springframework.security.core.Authentication;

public class AuthenticatedUserResponse {

    private AuthenticationSession session;
    private PublicUser user;

    public AuthenticatedUserResponse(Authentication authentication) {
        SecurityUser securityUser = (SecurityUser) authentication.getPrincipal();
        session = new AuthenticationSession();
        session.setAccessToken(securityUser.getAccessToken());
        session.setRefreshToken(securityUser.getRefreshToken());
        user = new PublicUser((SecurityUserToken) authentication);
    }

    public AuthenticationSession getSession() {
        return session;
    }

    public PublicUser getUser() {
        return user;
    }
}
