package com.vdshb.security.service;


import com.vdshb.security.repository.SecurityUserRepository;
import com.vdshb.security.domain.SecurityUser;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.time.Instant;
import java.util.UUID;

@Service
public class SecurityTokensService {

    @Value("${security.access-token-expiration-time}")
    Long accessTokenExpirationTime;

    @Value("${security.refresh-token-expiration-time}")
    Long refreshTokenExpirationTime;

    @Inject
    private SecurityUserRepository securityUserRepository;

    public void renewTokens(SecurityUser securityUser) {
        String newAccessToken = UUID.randomUUID().toString();
        String newRefreshToken = UUID.randomUUID().toString();
        Instant now = Instant.now();
        Instant accessTokenExpirationDateTime = now.plusSeconds(accessTokenExpirationTime);
        Instant refreshTokenExpirationDateTime = now.plusSeconds(refreshTokenExpirationTime);

        securityUser.setAccessToken(newAccessToken);
        securityUser.setRefreshToken(newRefreshToken);
        securityUser.setAccessTokenExpirationDateTime(accessTokenExpirationDateTime);
        securityUser.setRefreshTokenExpirationDateTime(refreshTokenExpirationDateTime);

        securityUserRepository.save(securityUser);
    }
}
