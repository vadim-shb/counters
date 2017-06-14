package com.vdshb.controllers;

import com.vdshb.domain.BillingCompany;
import com.vdshb.repository.BillingCompanyRepository;
import org.apache.commons.collections4.IteratorUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.util.Comparator;
import java.util.List;

@RestController
public class BillingCompanyController {

    @Inject
    private BillingCompanyRepository billingCompanyRepository;


    @GetMapping("/api/billing-companies")
    public List<BillingCompany> getBillingCompanies() {
        List<BillingCompany> billingCompanies = IteratorUtils.toList(billingCompanyRepository.findAll().iterator());
        billingCompanies.sort(Comparator.comparing(BillingCompany::getName));
        return billingCompanies;
    }

    @PostMapping("/api/billing-company")
    @PreAuthorize("hasRole('ADMIN')")
    public BillingCompany createBillingCompany(@RequestBody BillingCompany billingCompany) {
        return billingCompanyRepository.save(billingCompany);
    }

    @PutMapping("/api/billing-company/{billingCompanyId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<BillingCompany> updateBillingCompany(@PathVariable Long billingCompanyId, @RequestBody BillingCompany billingCompany) {
        BillingCompany persistedBillingCompany = billingCompanyRepository.findOne(billingCompanyId);
        if (persistedBillingCompany == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        persistedBillingCompany.setBeanPropertiesFromRestUpdate(billingCompany);
        billingCompanyRepository.save(persistedBillingCompany);
        return ResponseEntity.ok(persistedBillingCompany);
    }

    @DeleteMapping("/api/billing-company/{billingCompanyId}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteBillingCompany(@PathVariable Long billingCompanyId) {
        billingCompanyRepository.delete(billingCompanyId);
    }

}
