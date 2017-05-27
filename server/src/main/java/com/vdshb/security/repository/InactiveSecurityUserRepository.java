package com.vdshb.security.repository;

import com.vdshb.security.domain.entity.InactiveSecurityUser;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface InactiveSecurityUserRepository extends CrudRepository<InactiveSecurityUser, Long> {

    @Query("select item from InactiveSecurityUser item where item.emailConfirmationToken = :emailConfirmationToken")
    InactiveSecurityUser findByEmailConfirmationToken(@Param("emailConfirmationToken") String emailConfirmationToken);

    //todo: clean table regularly
    List<InactiveSecurityUser> findByEmail(String email);
}