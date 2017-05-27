package com.vdshb.security.repository;

import com.vdshb.security.domain.entity.SecurityUser;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;

public interface SecurityUserRepository extends CrudRepository<SecurityUser, Long> {

    SecurityUser findByEmail(String email);

    SecurityUser findByRefreshToken(String refreshToken);

    @Modifying
    @Transactional
    @Query("update SecurityUser item set item.accessToken = null, item.refreshToken = null, item.accessTokenExpirationDateTime = null, item.refreshTokenExpirationDateTime = null where item.id = :securityUserId")
    void dropAuthTokens(@Param("securityUserId") Long securityUserId);
}