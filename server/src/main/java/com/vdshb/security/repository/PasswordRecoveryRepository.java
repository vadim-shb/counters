package com.vdshb.security.repository;

import com.vdshb.security.domain.entity.PasswordRecovery;
import com.vdshb.security.domain.entity.SecurityUser;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface PasswordRecoveryRepository extends CrudRepository<PasswordRecovery, Long> {

    @Query("select item from PasswordRecovery item where item.emailConfirmationToken = :emailConfirmationToken")
    PasswordRecovery findByEmailConfirmationToken(@Param("emailConfirmationToken") String emailConfirmationToken);

    List<PasswordRecovery> findBySecurityUser(SecurityUser securityUser);

    @Query("select item from PasswordRecovery item where item.creationDateTime < :beforeDateTime")
    List<PasswordRecovery> findCreatedBefore(@Param("beforeDateTime") LocalDateTime beforeDateTime);
}