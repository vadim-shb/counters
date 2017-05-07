package com.vdshb.security;

import com.vdshb.security.domain.EmailPasswordCredentials;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public class EmailPasswordAuthentication implements Authentication {

    private final EmailPasswordCredentials credentials;

    public EmailPasswordAuthentication(EmailPasswordCredentials credentials) {
        this.credentials = credentials;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public Object getCredentials() {
        return credentials;
    }

    @Override
    public Object getDetails() {
        return null;
    }

    @Override
    public Object getPrincipal() {
        return null;
    }

    @Override
    public boolean isAuthenticated() {
        return false;
    }

    @Override
    public void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException {
        throw new IllegalArgumentException("class EmailPasswordAuthentication can not be used in security context. It is for authentication purposes only [as credentials holder]. Use SecurityUserToken instead.");
    }

    @Override
    public String getName() {
        return null;
    }

}
