package com.vdshb.security.repository;

import com.vdshb.security.domain.entity.Role;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RoleRepository extends CrudRepository<Role, Long> {

    @Query("SELECT item FROM Role item WHERE item.securityUser.id = :securityUserId")
    List<Role> findByUser(@Param("securityUserId") Long securityUserId);

}