package com.vdshb.repository;

import com.vdshb.domain.Space;
import com.vdshb.util.SoftDeleteCrudRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SpaceRepository extends SoftDeleteCrudRepository<Space, Long> {

    @Query("select e from Space e where e.isActive = true and e.userId = ?1")
    List<Space> findByUserId(Long userId);

}