package com.portalempleo.backend.controller;

import com.portalempleo.backend.model.Company;
import com.portalempleo.backend.service.CompanyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/companies")
public class CompanyController {

    private final CompanyService companyService;

    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @GetMapping
    public List<Company> getAllCompanies() {
        return companyService.getAllCompanies();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Company> getCompanyById(@PathVariable Long id) {
        return companyService.getCompanyById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Company createCompany(@RequestBody Company company) {
        return companyService.saveCompany(company);
    }

    @PutMapping("/{id}")
    public Company updateCompany(@PathVariable Long id, @RequestBody Company company) {
        return companyService.updateCompany(id, company);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCompany(@PathVariable Long id) {
        companyService.deleteCompany(id);
        return ResponseEntity.noContent().build();
    }
}
