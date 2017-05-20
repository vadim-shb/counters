package com.vdshb.security;

import com.vdshb.security.domain.request.RefreshTokenCredentials;
import com.vdshb.security.domain.entity.SecurityUser;
import com.vdshb.security.repository.SecurityUserRepository;
import com.vdshb.security.service.SecurityTokensService;
import com.vdshb.security.service.SecurityUserService;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import javax.inject.Inject;
import java.time.Instant;
import java.util.List;

@Component
public class RefreshTokenAuthenticationProvider implements AuthenticationProvider {

    @Inject
    private SecurityUserService securityUserService;

    @Inject
    private SecurityTokensService securityTokensService;

    @Inject
    private SecurityUserRepository securityUserRepository;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        RefreshTokenCredentials credentials = (RefreshTokenCredentials) authentication.getCredentials();

        SecurityUser securityUser = securityUserRepository.findByRefreshToken(credentials.getRefreshToken());
        if (securityUser != null && securityUser.getRefreshTokenExpirationDateTime().isAfter(Instant.now())){
            List<GrantedAuthority> authorities = securityUserService.findAuthorities(securityUser.getId());
            securityTokensService.renewTokens(securityUser);
            return new SecurityUserToken(securityUser, authorities);
        }

        return null;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.isAssignableFrom(RefreshTokenAuthentication.class);
    }
}
