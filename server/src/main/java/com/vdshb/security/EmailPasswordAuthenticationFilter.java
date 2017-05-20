package com.vdshb.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.vdshb.security.domain.request.EmailPasswordCredentials;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.RequestMatcher;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


public class EmailPasswordAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private static ObjectReader credentialsReader = new ObjectMapper().readerFor(EmailPasswordCredentials.class);

    public EmailPasswordAuthenticationFilter(RequestMatcher defaultFilterProcessesUrl, AuthenticationManager authenticationManager) {
        super();
        setRequiresAuthenticationRequestMatcher(defaultFilterProcessesUrl);
        setAuthenticationManager(authenticationManager);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        final EmailPasswordCredentials credentials;
        try {
            credentials = credentialsReader.readValue(request.getReader());
        } catch (Exception e) {
            throw new AuthenticationCredentialsNotFoundException("Wrong credentials format. Username and password in JSON format required.", e);
        }
        return this.getAuthenticationManager().authenticate(new EmailPasswordAuthentication(credentials));
    }
}
