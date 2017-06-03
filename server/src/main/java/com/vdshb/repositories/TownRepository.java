package com.vdshb.repositories;

import com.vdshb.domain.Town;
import org.springframework.data.repository.CrudRepository;

public interface TownRepository extends CrudRepository<Town, Long> {
}