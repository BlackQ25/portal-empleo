package com.portalempleo.backend.controller;

import com.portalempleo.backend.model.*;
import com.portalempleo.backend.service.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/job-offer")
public class JobOfferController {

    private final JobOfferService jobOfferService;
    private final UserService userService;

    public JobOfferController(JobOfferService jobOfferService, UserService userService) {
        this.jobOfferService = jobOfferService;
        this.userService = userService;
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

    @GetMapping("/by-city/{cityId}")
    public List<JobOffer> getByCity(@PathVariable Long cityId) {
        return jobOfferService.getJobOffersByCity(cityId);
    }

    @GetMapping("/by-state/{stateId}")
    public List<JobOffer> getByState(@PathVariable Long stateId) {
        return jobOfferService.getJobOffersByState(stateId);
    }

    @GetMapping("/by-category/{categoryId}")
    public List<JobOffer> getByCategory(@PathVariable Long categoryId) {
        return jobOfferService.getJobOffersByCategory(categoryId);
    }

    @PostMapping
    public JobOffer createJobOffer(@RequestBody JobOffer jobOffer, @RequestParam Long userId) {
        User user = userService.getUserById(userId);
        return jobOfferService.saveJobOffer(jobOffer, user);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJobOffer(@PathVariable Long id, @RequestParam Long userId) {
        User user = userService.getUserById(userId);
        jobOfferService.deleteJobOffer(id, user);
        return ResponseEntity.noContent().build();
    }
}
