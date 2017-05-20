package com.vdshb.security.domain;

import com.vdshb.security.SecurityUserToken;
import org.springframework.security.core.GrantedAuthority;

import java.util.List;
import java.util.stream.Collectors;

public class PublicUser {
    private String name;
    private String email;
    private Language language;
    private List<String> roles;

    public PublicUser(SecurityUserToken securityUserToken) {
        SecurityUser securityUser = securityUserToken.getPrincipal();
        this.name = securityUser.getName();
        this.email = securityUser.getEmail();
        this.language = securityUser.getLanguage();
        this.roles = securityUserToken.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Language getLanguage() {
        return language;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
}
