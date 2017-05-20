package com.vdshb.security.repository;

import com.vdshb.security.domain.entity.InactiveSecurityUser;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface InactiveSecurityUserRepository extends CrudRepository<InactiveSecurityUser, Long> {

    @Query("select u from InactiveSecurityUser u where u.emailConfirmationToken = :emailConfirmationToken")
    InactiveSecurityUser findByEmailConfirmationToken(@Param("emailConfirmationToken") String emailConfirmationToken);

    //todo: clean table regularly
    List<InactiveSecurityUser> findByEmail(String email);
}