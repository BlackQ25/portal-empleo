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

    // Obtener todas las ofertas
    @GetMapping
    public List<JobOffer> getAllJobOffers() {
        return jobOfferService.getAllJobOffers();
    }

    // Obtener una oferta por ID
    @GetMapping("/{id}")
    public ResponseEntity<JobOffer> getJobOfferById(@PathVariable Long id) {
        return jobOfferService.getJobOfferById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Obtener por ciudad
    @GetMapping("/by-city/{cityId}")
    public List<JobOffer> getByCity(@PathVariable Long cityId) {
        return jobOfferService.getJobOffersByCity(cityId);
    }

    // Obtener por estado
    @GetMapping("/by-state/{stateId}")
    public List<JobOffer> getByState(@PathVariable Long stateId) {
        return jobOfferService.getJobOffersByState(stateId);
    }

    // Obtener por categoría
    @GetMapping("/by-category/{categoryId}")
    public List<JobOffer> getByCategory(@PathVariable Long categoryId) {
        return jobOfferService.getJobOffersByCategory(categoryId);
    }

    // Obtener por ciudad + estado
    @GetMapping("/by-city-and-state")
    public List<JobOffer> getByCityAndState(@RequestParam Long cityId, @RequestParam Long stateId) {
        return jobOfferService.getByCityAndState(cityId, stateId);
    }

    // Obtener por ciudad + categoría
    @GetMapping("/by-city-and-category")
    public List<JobOffer> getByCityAndCategory(@RequestParam Long cityId, @RequestParam Long categoryId) {
        return jobOfferService.getByCityAndCategory(cityId, categoryId);
    }

    // Obtener por estado + categoría
    @GetMapping("/by-state-and-category")
    public List<JobOffer> getByStateAndCategory(@RequestParam Long stateId, @RequestParam Long categoryId) {
        return jobOfferService.getByStateAndCategory(stateId, categoryId);
    }

    // Obtener por ciudad + estado + categoría
    @GetMapping("/by-city-state-category")
    public List<JobOffer> getByCityStateCategory(@RequestParam Long cityId, @RequestParam Long stateId, @RequestParam Long categoryId) {
        return jobOfferService.getByCityStateCategory(cityId, stateId, categoryId);
    }

    // Crear oferta
    @PostMapping
    public JobOffer createJobOffer(@RequestBody JobOffer jobOffer) {
        return jobOfferService.saveJobOffer(jobOffer);
    }

    // Eliminar oferta
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJobOffer(@PathVariable Long id) {
        jobOfferService.deleteJobOffer(id);
        return ResponseEntity.noContent().build();
    }
}
