package com.vdshb.security;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


@Component
@Qualifier("UsernamePasswordAuthenticationProvider")
public class UsernamePasswordAuthenticationProvider implements AuthenticationProvider {

    private final SecurityUserRepository securityUserRepository;
    private final RoleRepository roleRepository;

    public UsernamePasswordAuthenticationProvider(
            SecurityUserRepository securityUserRepository,
            RoleRepository roleRepository
    ) {
        this.securityUserRepository = securityUserRepository;
        this.roleRepository = roleRepository;
    }

    @Transactional(readOnly = true)
    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        UsernamePasswordAuthentication token = (UsernamePasswordAuthentication) authentication.getCredentials();
        UsernamePasswordCredentials credentials = (UsernamePasswordCredentials) token.getCredentials();
        SecurityUser securityUser = securityUserRepository.findByUsername(credentials.getUsername());
        if (securityUser != null && checkPassword(securityUser, credentials.getPassword())){
            List<Role> roles = roleRepository.findByUser(securityUser.getId());
            List<GrantedAuthority> authorities = roles
                    .stream()
                    .map(role -> new SimpleGrantedAuthority(role.getRole()))
                    .collect(Collectors.toList());
            return new SecurityUserToken(securityUser, authorities);
        }
        return null;
    }

    private boolean checkPassword(SecurityUser securityUser, String password) {
        String saltyPassword = password + securityUser.getSalt();
        String hashedPassword = DigestUtils.sha512Hex(saltyPassword);
        return securityUser.getHashedPassword().equals(hashedPassword);
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.getClass().isAssignableFrom(UsernamePasswordAuthentication.class);
    }
}
