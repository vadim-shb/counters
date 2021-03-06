package com.vdshb.security.repository;

import com.vdshb.security.domain.entity.ChangeEmail;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface ChangeEmailRepository extends CrudRepository<ChangeEmail, Long> {

    @Query("select item from ChangeEmail item where item.currentEmailConfirmationToken = :emailConfirmationToken")
    ChangeEmail findByCurrentEmailConfirmationToken(@Param("emailConfirmationToken") String emailConfirmationToken);

    @Query("select item from ChangeEmail item where item.newEmailConfirmationToken = :emailConfirmationToken")
    ChangeEmail findByNewEmailConfirmationToken(@Param("emailConfirmationToken") String emailConfirmationToken);

    List<ChangeEmail> findByNewEmail(String email);

    @Query("select item from ChangeEmail item where item.creationDateTime < :beforeDateTime")
    List<ChangeEmail> findCreatedBefore(@Param("beforeDateTime") LocalDateTime beforeDateTime);
}