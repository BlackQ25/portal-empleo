package com.portalempleo.backend.service;

import com.portalempleo.backend.model.*;
import com.portalempleo.backend.repository.*;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ApplicationService {

    private final ApplicationRepository repository;
    private final CandidateRepository candidateRepository;

    public ApplicationService(ApplicationRepository repository, CandidateRepository candidateRepository) {
        this.repository = repository;
        this.candidateRepository = candidateRepository;
    }

    public List<Application> getAllApplications() {
        return repository.findAll();
    }

    public List<Application> findByCandidateId(Long userId) {
        Candidate candidate = candidateRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Candidato no encontrado"));

        return repository.findByCandidateId(candidate.getUserId());
    }

    public Optional<Application> getApplicationById(Integer id) {
        return repository.findById(id);
    }

    public Application saveApplication(Application application) {
        return repository.save(application);
    }

    public void deleteApplication(Integer id) {
        repository.deleteById(id);
    }
}