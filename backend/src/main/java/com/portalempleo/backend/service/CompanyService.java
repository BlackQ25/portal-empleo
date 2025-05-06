package com.portalempleo.backend.service;

import com.portalempleo.backend.model.Company;
import com.portalempleo.backend.repository.CompanyRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CompanyService {

    private final CompanyRepository companyRepository;

    public CompanyService(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    public Optional<Company> getCompanyById(Long userId) {
        return companyRepository.findById(userId);
    }

    public Company saveCompany(Company company) {
        return companyRepository.save(company);
    }

    public Company updateCompany(Long userId, Company updatedCompany) {
        return companyRepository.findById(userId)
                .map(company -> {
                    company.setCompanyName(updatedCompany.getCompanyName());
                    company.setCompanyDescription(updatedCompany.getCompanyDescription());
                    company.setWebsite(updatedCompany.getWebsite());
                    company.setPhone(updatedCompany.getPhone());
                    company.setAddress(updatedCompany.getAddress());
                    return companyRepository.save(company);
                })
                .orElseThrow(() -> new IllegalArgumentException("Empresa no encontrada"));
    }

    public void deleteCompany(Long userId) {
        companyRepository.deleteById(userId);
    }
}

