package com.vdshb.security.repository;

import com.vdshb.security.domain.Role;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RoleRepository extends CrudRepository<Role, Long> {

    @Query("SELECT r FROM Role r WHERE r.securityUser.id = :securityUserId")
    List<Role> findByUser(@Param("securityUserId") Long securityUserId);

}