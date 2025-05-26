package com.portalempleo.backend.service;

import com.portalempleo.backend.model.*;
import com.portalempleo.backend.repository.JobOfferRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class JobOfferService {

    private final JobOfferRepository jobOfferRepository;

    public JobOfferService(JobOfferRepository jobOfferRepository) {
        this.jobOfferRepository = jobOfferRepository;
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

    public JobOffer saveJobOffer(JobOffer jobOffer, User user) {
        return jobOfferRepository.save(jobOffer);
    }

    public void deleteJobOffer(Long id, User user) {
        jobOfferRepository.deleteById(id);
    }
}
