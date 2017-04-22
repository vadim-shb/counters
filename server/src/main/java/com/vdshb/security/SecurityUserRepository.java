package com.vdshb.security;

import org.springframework.data.repository.CrudRepository;

public interface SecurityUserRepository extends CrudRepository<SecurityUser, Long> {

    SecurityUser findByUsername(String username);

    //todo: check access-tokens not only in memory
    SecurityUser findByAccessToken(String accessToken);

    SecurityUser findByRefreshToken(String refreshToken);
}