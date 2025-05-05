package com.portalempleo.backend.controller;

import com.portalempleo.backend.model.JobOffer;
import com.portalempleo.backend.service.JobOfferService;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("api/offers")
public class JobOfferController {

    private final JobOfferService jobOfferService;

    public JobOfferController(JobOfferService jobOfferService){
        this.jobOfferService = jobOfferService;

    }

    @GetMapping
    public List<JobOffer> getAllOffers() {
        return jobOfferService.getAllOffers();

    }

    @PostMapping
    public JobOffer saveOffer(@RequestBody JobOffer jobOffer) {
        return jobOfferService.saveOffer(jobOffer);

    }

    @DeleteMapping("/{id}")
    public void deleteOffer(@PathVariable Long id) {
        jobOfferService.deleteOfferById(id);
    }

    @PutMapping("/{id}")
    public JobOffer updateOffer(@PathVariable Long id, @RequestBody JobOffer updatedOffer) {
        updatedOffer.setId(id);
        return jobOfferService.updateOffer(updatedOffer);
    }



}
