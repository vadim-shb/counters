package com.vdshb.security;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RoleRepository extends CrudRepository<Role, Long> {

    @Query("SELECT role FROM Role r WHERE r.securityUser = :securityUserId")
    List<Role> findByUser(@Param("securityUserId") Long securityUserId);

}