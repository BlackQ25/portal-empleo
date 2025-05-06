package com.portalempleo.backend.controller;

import com.portalempleo.backend.model.JobOffer;
import com.portalempleo.backend.service.JobOfferService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/job-offers")
public class JobOfferController {

    private final JobOfferService jobOfferService;

    public JobOfferController(JobOfferService jobOfferService) {
        this.jobOfferService = jobOfferService;
    }

    @GetMapping
    public List<JobOffer> getAllJobOffers() {
        return jobOfferService.getAllJobOffers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobOffer> getJobOfferById(@PathVariable Long id) {
        return jobOfferService.getJobOfferById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public JobOffer createJobOffer(@RequestBody JobOffer jobOffer) {
        return jobOfferService.saveJobOffer(jobOffer);
    }

    @PutMapping("/{id}")
    public JobOffer updateJobOffer(@PathVariable Long id, @RequestBody JobOffer jobOffer) {
        return jobOfferService.updateJobOffer(id, jobOffer);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJobOffer(@PathVariable Long id) {
        jobOfferService.deleteJobOffer(id);
        return ResponseEntity.noContent().build();
    }
}
