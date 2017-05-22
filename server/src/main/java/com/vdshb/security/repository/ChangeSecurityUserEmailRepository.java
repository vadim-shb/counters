package com.vdshb.security.repository;

import com.vdshb.security.domain.entity.ChangeSecurityUserEmail;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChangeSecurityUserEmailRepository extends CrudRepository<ChangeSecurityUserEmail, Long> {

    @Query("select c from ChangeSecurityUserEmail c where c.currentEmailConfirmationToken = :emailConfirmationToken")
    ChangeSecurityUserEmail findByCurrentEmailConfirmationToken(@Param("emailConfirmationToken") String emailConfirmationToken);

    @Query("select c from ChangeSecurityUserEmail c where c.newEmailConfirmationToken = :emailConfirmationToken")
    ChangeSecurityUserEmail findByNewEmailConfirmationToken(@Param("emailConfirmationToken") String emailConfirmationToken);

    //todo: clean table regularly
    List<ChangeSecurityUserEmail> findByNewEmail(String email);
}