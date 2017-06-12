package com.vdshb.repository;

import com.vdshb.domain.Space;
import com.vdshb.util.SoftDeleteCrudRepository;

import java.util.List;

public interface SpaceRepository extends SoftDeleteCrudRepository<Space, Long> {

    //fixme: not load inactive
    List<Space> findByUserId(Long userId);

}