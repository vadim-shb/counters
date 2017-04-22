package com.vdshb.security;

import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.RequestMatcher;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class RefreshTokenAuthenticationFilter extends AbstractAuthenticationProcessingFilter {

    public RefreshTokenAuthenticationFilter(RequestMatcher defaultFilterProcessesUrl, AuthenticationManager authenticationManager) {
        super(defaultFilterProcessesUrl);
        setAuthenticationManager(authenticationManager);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException, ServletException {
        String refreshToken = request.getReader().readLine();
        if (refreshToken == null) {
            throw new AuthenticationCredentialsNotFoundException("Refresh token not found");
        }

        RefreshTokenCredentials refreshTokenCredentials = new RefreshTokenCredentials();
        refreshTokenCredentials.setRefreshToken(refreshToken);
        return this.getAuthenticationManager().authenticate(new RefreshTokenAuthentication(refreshTokenCredentials));
    }
}
