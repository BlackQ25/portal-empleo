package com.portalempleo.backend.controller;

import com.portalempleo.backend.model.*;
import com.portalempleo.backend.service.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {
    private final ApplicationService service;

    public ApplicationController(ApplicationService service) {
        this.service = service;
    }

    @GetMapping
    public List<Application> getAllApplications() {
        return service.getAllApplications();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Application> getApplicationById(@PathVariable Integer id) {
        return service.getApplicationById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Application createApplication(@RequestBody Application application) {
        return service.saveApplication(application);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Application> updateApplication(@PathVariable Integer id, @RequestBody Application updatedApplication) {
        return service.getApplicationById(id)
                .map(existing -> {
                    existing.setCandidateId(updatedApplication.getCandidateId());
                    existing.setJobOfferId(updatedApplication.getJobOfferId());
                    existing.setAppliedAt(updatedApplication.getAppliedAt());
                    existing.setStatus(updatedApplication.getStatus());
                    return ResponseEntity.ok(service.saveApplication(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteApplication(@PathVariable Integer id) {
        if (service.getApplicationById(id).isPresent()) {
            service.deleteApplication(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
