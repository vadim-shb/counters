package com.vdshb.security;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class AccessTokenAuthenticationProvider implements AuthenticationProvider {

    private final SecurityUserRepository securityUserRepository;
    private final RoleRepository roleRepository;

    public AccessTokenAuthenticationProvider(
            SecurityUserRepository securityUserRepository,
            RoleRepository roleRepository
    ) {
        this.securityUserRepository = securityUserRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        AccessTokenCredentials credentials = (AccessTokenCredentials) authentication.getCredentials();

        SecurityUser securityUser = securityUserRepository.findByAccessToken(credentials.getAccessToken());
        if (securityUser != null){
            List<Role> roles = roleRepository.findByUser(securityUser.getId());
            List<GrantedAuthority> authorities = roles
                    .stream()
                    .map(role -> new SimpleGrantedAuthority(role.getRole()))
                    .collect(Collectors.toList());
            return new SecurityUserToken(securityUser, authorities);
        }

        return null;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.getClass().isAssignableFrom(AccessTokenAuthentication.class);
    }
}
