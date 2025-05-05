package com.portalempleo.backend.service;

import com.portalempleo.backend.model.JobOffer;
import org.springframework.stereotype.Service;
import com.portalempleo.backend.repository.JobOfferRepository;
import java.util.*;

@Service
public class JobOfferService {

    private final JobOfferRepository jobOfferRepository;

    public JobOfferService (JobOfferRepository jobOfferRepository){
        this.jobOfferRepository = jobOfferRepository;
    }

    public List <JobOffer> getAllOffers(){
        return jobOfferRepository.findAll();
    }

    public JobOffer saveOffer(JobOffer jobOffer){
        return jobOfferRepository.save(jobOffer);
    }

    public void deleteOfferById(Long id) {
        jobOfferRepository.deleteById(id);
    }

    public JobOffer updateOffer(JobOffer jobOffer) {
        if (jobOfferRepository.existsById(jobOffer.getId())) {
            return jobOfferRepository.save(jobOffer);
        } else {
            throw new NoSuchElementException("Job offer with ID " + jobOffer.getId() + " not found.");
        }
    }

}
