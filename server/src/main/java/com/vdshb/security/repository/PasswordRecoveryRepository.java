package com.vdshb.security.repository;

import com.vdshb.security.domain.entity.PasswordRecovery;
import com.vdshb.security.domain.entity.SecurityUser;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PasswordRecoveryRepository extends CrudRepository<PasswordRecovery, Long> {

    @Query("select r from PasswordRecovery r where r.emailConfirmationToken = :emailConfirmationToken")
    PasswordRecovery findByEmailConfirmationToken(@Param("emailConfirmationToken") String emailConfirmationToken);

    //todo: clean table regularly
    List<PasswordRecovery> findBySecurityUser(SecurityUser securityUser);
}