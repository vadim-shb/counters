package com.vdshb.repositories;

import com.vdshb.domain.Resume;
import org.springframework.data.repository.CrudRepository;

public interface ResumeRepository extends CrudRepository<Resume, Long> {
}