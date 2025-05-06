package com.portalempleo.backend.service;

import com.portalempleo.backend.model.JobOffer;
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

    public JobOffer saveJobOffer(JobOffer jobOffer) {
        return jobOfferRepository.save(jobOffer);
    }

    public JobOffer updateJobOffer(Long id, JobOffer updatedJobOffer) {
        return jobOfferRepository.findById(id)
                .map(existing -> {
                    existing.setTitle(updatedJobOffer.getTitle());
                    existing.setDescription(updatedJobOffer.getDescription());
                    existing.setSalary(updatedJobOffer.getSalary());
                    existing.setPublishedAt(updatedJobOffer.getPublishedAt());
                    existing.setCompany(updatedJobOffer.getCompany());
                    existing.setLocation(updatedJobOffer.getLocation());
                    existing.setCategory(updatedJobOffer.getCategory());
                    return jobOfferRepository.save(existing);
                })
                .orElseThrow(() -> new IllegalArgumentException("Job offer not found"));
    }

    public void deleteJobOffer(Long id) {
        jobOfferRepository.deleteById(id);
    }
}
