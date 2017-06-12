package com.vdshb.security;

import com.vdshb.security.domain.entity.SecurityUser;
import com.vdshb.security.domain.enums.SecurityRole;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;

public class SecurityUserToken implements Authentication {

    private SecurityUser user;
    private boolean isAuthenticated;
    private final Collection<GrantedAuthority> authorities;

    public SecurityUserToken(SecurityUser user, Collection<? extends GrantedAuthority> authorities) {
        this.user = user;
        setAuthenticated(true);

        if (authorities == null) {
            this.authorities = AuthorityUtils.NO_AUTHORITIES;
            return;
        }

        for (GrantedAuthority a : authorities) {
            if (a == null) {
                throw new IllegalArgumentException("Authorities collection cannot contain any null elements");
            }
        }
        ArrayList<GrantedAuthority> temp = new ArrayList<GrantedAuthority>(authorities.size());
        temp.addAll(authorities);
        this.authorities = Collections.unmodifiableList(temp);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public Object getCredentials() {
        return null;
    }

    @Override
    public Object getDetails() {
        return null;
    }

    @Override
    public SecurityUser getPrincipal() {
        return user;
    }

    @Override
    public boolean isAuthenticated() {
        return isAuthenticated && user.getAccessTokenExpirationDateTime().isAfter(Instant.now());
    }

    @Override
    public void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException {
        this.isAuthenticated = isAuthenticated;
    }

    @Override
    public String getName() {
        return null;
    }

    public boolean hasRole(SecurityRole role) {
        return authorities.contains(role.getGrantedAuthority());
    }
}
