package com.vdshb.security.domain.response;

import com.vdshb.security.SecurityUserToken;
import com.vdshb.security.domain.enums.Language;
import com.vdshb.security.domain.entity.SecurityUser;
import org.springframework.security.core.GrantedAuthority;

import java.util.List;
import java.util.stream.Collectors;

public class PublicUser {
    private Long id;
    private String name;
    private String email;
    private Language language;
    private List<String> roles;

    public PublicUser(SecurityUserToken securityUserToken) {
        SecurityUser securityUser = securityUserToken.getPrincipal();
        this.id = securityUser.getId();
        this.name = securityUser.getName();
        this.email = securityUser.getEmail();
        this.language = securityUser.getLanguage();
        this.roles = securityUserToken.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
