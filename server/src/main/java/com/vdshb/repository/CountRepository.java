package com.vdshb.repository;

import com.vdshb.domain.Count;
import com.vdshb.util.SoftDeleteCrudRepository;

import java.util.List;

public interface CountRepository extends SoftDeleteCrudRepository<Count, Long> {

    List<Count> findBySpaceId(Long spaceId);
}