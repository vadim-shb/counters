package com.vdshb.security.service;

import com.vdshb.security.repository.RoleRepository;
import com.vdshb.security.repository.SecurityUserRepository;
import com.vdshb.security.domain.Role;
import com.vdshb.security.domain.SecurityUser;
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

    public SecurityUser findUserByEmail(String email) {
        return securityUserRepository.findByEmail(email);
    }

    public SecurityUser findUserByRefreshToken(String refreshToken) {
        return securityUserRepository.findByRefreshToken(refreshToken);
    }

    public List<GrantedAuthority> findAuthorities(Long securityUserId) {
        List<Role> roles = roleRepository.findByUser(securityUserId);
        return roles
                .stream()
                .map(role -> new SimpleGrantedAuthority(role.getRole().name()))
                .collect(Collectors.toList());
    }

}
