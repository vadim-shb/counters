package com.vdshb.security.domain.enums;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.HashMap;
import java.util.Map;

public enum SecurityRole {
    ADMIN, USER;

    private static Map<SecurityRole, SimpleGrantedAuthority> grantedAuthorities = new HashMap<>();

    static {
        for (SecurityRole role : SecurityRole.values()) {
            grantedAuthorities.put(role, new SimpleGrantedAuthority(role.name()));
        }
    }

    public SimpleGrantedAuthority getGrantedAuthority() {
        return grantedAuthorities.get(this);
    }
}
