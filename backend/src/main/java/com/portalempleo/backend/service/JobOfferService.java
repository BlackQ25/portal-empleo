package com.portalempleo.backend.service;

import com.portalempleo.backend.model.*;
import com.portalempleo.backend.repository.*;
import com.portalempleo.backend.dto.*;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Service
public class JobOfferService {

    private final JobOfferRepository jobOfferRepository;

    private final CompanyRepository companyRepository;
    private final CategoryRepository categoryRepository;
    private final CityRepository cityRepository;
    private final StateRepository stateRepository;
    private final ContractRepository contractRepository;

    private final UserService userService;

    public JobOfferService(JobOfferRepository jobOfferRepository, CompanyRepository companyRepository,
            CategoryRepository categoryRepository, CategoryRepository categoryRepository1,
            CityRepository cityRepository, StateRepository stateRepository, ContractRepository contractRepository,
            UserService userService) {
        this.jobOfferRepository = jobOfferRepository;
        this.companyRepository = companyRepository;
        this.categoryRepository = categoryRepository1;
        this.cityRepository = cityRepository;
        this.stateRepository = stateRepository;
        this.contractRepository = contractRepository;
        this.userService = userService;
    }

    public List<JobOffer> getAllJobOffers() {
        return jobOfferRepository.findAll();
    }

    public Optional<JobOffer> getJobOfferById(Long id) {
        return jobOfferRepository.findById(id);
    }

    public List<JobOffer> getJobOffersByCity(Long cityId) {
        return jobOfferRepository.findByCity_Id(cityId);
    }

    public List<JobOffer> getJobOffersByState(Long stateId) {
        return jobOfferRepository.findByState_Id(stateId);
    }

    public List<JobOffer> getJobOffersByCategory(Long categoryId) {
        return jobOfferRepository.findByCategory_Id(categoryId);
    }

    public JobOffer createJobOffer(JobOfferRequestDTO dto, Long userId) {
        User user = userService.getUserById(userId);

        Company company = companyRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Empresa no encontrada"));

        JobOffer offer = new JobOffer();
        offer.setTitle(dto.getTitle());
        offer.setDescription(dto.getDescription());
        offer.setSalary(dto.getSalary());
        offer.setPublishedAt(Timestamp.valueOf(dto.getPublishedAt()));
        offer.setCompany(company);
        offer.setCategory(categoryRepository.findById(dto.getCategoryId()).orElseThrow());
        offer.setCity(cityRepository.findById(dto.getCityId()).orElseThrow());
        offer.setState(stateRepository.findById(dto.getStateId()).orElseThrow());
        offer.setContract(contractRepository.findById(dto.getContractId()).orElse(null));

        return jobOfferRepository.save(offer);
    }

    public JobOffer updateJobOffer(Long id, JobOfferRequestDTO dto, User user) {
        JobOffer offer = jobOfferRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Oferta no encontrada"));

        if (!offer.getCompany().getUser().getId().equals(user.getId())) {
            throw new RuntimeException("No autorizado para modificar esta oferta");
        }

        offer.setTitle(dto.getTitle());
        offer.setDescription(dto.getDescription());
        offer.setSalary(dto.getSalary());
        offer.setPublishedAt(Timestamp.valueOf(dto.getPublishedAt())); // ← del DTO

        offer.setCategory(categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada")));

        offer.setCity(cityRepository.findById(dto.getCityId())
                .orElseThrow(() -> new RuntimeException("Ciudad no encontrada")));

        offer.setState(stateRepository.findById(dto.getStateId())
                .orElseThrow(() -> new RuntimeException("Región no encontrada")));

        if (dto.getContractId() != null) {
            offer.setContract(contractRepository.findById(dto.getContractId())
                    .orElseThrow(() -> new RuntimeException("Contrato no encontrado")));
        } else {
            offer.setContract(null);
        }

        return jobOfferRepository.save(offer);
    }
    
    public void deleteJobOffer(Long id, User user) {
        jobOfferRepository.deleteById(id);
    }
}
