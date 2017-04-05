package com.vdshb.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.RequestMatcher;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class UsernamePasswordAuthenticationFilter extends AbstractAuthenticationProcessingFilter {

    private static ObjectReader credentialsReader = new ObjectMapper().readerFor(UsernamePasswordCredentials.class);

    public UsernamePasswordAuthenticationFilter(RequestMatcher defaultFilterProcessesUrl) {
        super(defaultFilterProcessesUrl);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException, ServletException {
        final UsernamePasswordCredentials credentials;
        try {
            credentials = credentialsReader.readValue(request.getReader());
        } catch (Exception e) {
            throw new AuthenticationCredentialsNotFoundException("Wrong credentials format. Username and password in JSON format required.", e);
        }
        return new UsernamePasswordAuthentication(credentials);
    }
}
