package com.vdshb.security.service;

import com.vdshb.security.domain.entity.Role;
import com.vdshb.security.repository.RoleRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SecurityUserService {

    @Inject
    private RoleRepository roleRepository;

    public List<GrantedAuthority> findAuthorities(Long securityUserId) {
        List<Role> roles = roleRepository.findByUser(securityUserId);
        return roles
                .stream()
                .map(role -> new SimpleGrantedAuthority(role.getRole().name()))
                .collect(Collectors.toList());
    }

}
