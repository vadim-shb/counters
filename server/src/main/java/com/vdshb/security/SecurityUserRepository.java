package com.vdshb.security;

import org.springframework.data.repository.CrudRepository;

public interface SecurityUserRepository extends CrudRepository<SecurityUser, Long> {

    SecurityUser findByUsername(String username);

    SecurityUser findByAccessToken(String accessToken);
}