package com.vdshb.security.repository;

import com.vdshb.security.domain.entity.InactiveSecurityUser;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface InactiveSecurityUserRepository extends CrudRepository<InactiveSecurityUser, Long> {

    @Query("select item from InactiveSecurityUser item where item.emailConfirmationToken = :emailConfirmationToken")
    InactiveSecurityUser findByEmailConfirmationToken(@Param("emailConfirmationToken") String emailConfirmationToken);

    List<InactiveSecurityUser> findByEmail(String email);

    @Query("select item from InactiveSecurityUser item where item.creationDateTime < :beforeDateTime")
    List<InactiveSecurityUser> findCreatedBefore(@Param("beforeDateTime") LocalDateTime beforeDateTime);
}