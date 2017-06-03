package com.vdshb.repository;

import com.vdshb.domain.ManagementCompany;
import com.vdshb.util.SoftDeleteCrudRepository;

public interface ManagementCompanyRepository extends SoftDeleteCrudRepository<ManagementCompany, Long> {

}