package com.vdshb.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public class UsernamePasswordAuthentication implements Authentication {

    private final UsernamePasswordCredentials credentials;

    public UsernamePasswordAuthentication(UsernamePasswordCredentials credentials) {
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
        throw new IllegalArgumentException("class UsernamePasswordAuthentication can not be used in security context. It is for authentication purposes only [as credentials holder]. Use SecurityUserToken instead.");
    }

    @Override
    public String getName() {
        return null;
    }

}
