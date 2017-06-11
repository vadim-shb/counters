package com.vdshb.repository;

import com.vdshb.domain.Count;
import com.vdshb.util.SoftDeleteCrudRepository;

public interface CountRepository extends SoftDeleteCrudRepository<Count, Long> {

}