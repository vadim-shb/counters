package com.vdshb.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SecurityUserService {

    @Inject
    private SecurityUserRepository securityUserRepository;

    @Inject
    private RoleRepository roleRepository;

    public SecurityUser findUserByUsername(String username) {
        return securityUserRepository.findByUsername(username);
    }

    public SecurityUser findUserByRefreshToken(String refreshToken) {
        return securityUserRepository.findByRefreshToken(refreshToken);
    }

    public List<GrantedAuthority> findAuthorities(Long securityUserId) {
        List<Role> roles = roleRepository.findByUser(securityUserId);
        return roles
                .stream()
                .map(role -> new SimpleGrantedAuthority(role.getRole()))
                .collect(Collectors.toList());
    }

}
