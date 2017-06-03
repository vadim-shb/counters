package com.vdshb.controllers;

import com.vdshb.domain.ManagementCompany;
import com.vdshb.repository.ManagementCompanyRepository;
import org.apache.commons.collections4.IteratorUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.util.Comparator;
import java.util.List;

@RestController
public class ManagementCompanyController {

    @Inject
    private ManagementCompanyRepository managementCompanyRepository;

    //    @GetMapping("/api/management-company/{managementCompanyId}")
//    public ManagementCompany getManagementCompany(@PathVariable Long managementCompanyId) {
//        return managementCompanyRepository.findOne(managementCompanyId);
//    }
//

    @GetMapping("/api/management-companies")
    public List<ManagementCompany> getManagementCompanies() {
        List<ManagementCompany> managementCompanies = IteratorUtils.toList(managementCompanyRepository.findAll().iterator());
        managementCompanies.sort(Comparator.comparing(ManagementCompany::getName));
        return managementCompanies;
    }

    @PostMapping("/api/management-company")
    @PreAuthorize("hasRole('ADMIN')")
    public ManagementCompany createManagementCompany(@RequestBody ManagementCompany managementCompany) {
        return managementCompanyRepository.save(managementCompany);
    }

    @PutMapping("/api/management-company/{managementCompanyId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ManagementCompany> updateManagementCompany(@PathVariable Long managementCompanyId, @RequestBody ManagementCompany managementCompany) {
        ManagementCompany persistedManagementCompany = managementCompanyRepository.findOne(managementCompanyId);
        if (persistedManagementCompany == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        persistedManagementCompany.setName(managementCompany.getName());
        managementCompanyRepository.save(persistedManagementCompany);
        return ResponseEntity.ok(persistedManagementCompany);
    }

    @DeleteMapping("/api/management-company/{managementCompanyId}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteManagementCompany(@PathVariable Long managementCompanyId) {
        managementCompanyRepository.delete(managementCompanyId);
    }

}
