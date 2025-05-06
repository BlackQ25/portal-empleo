package com.portalempleo.backend.service;

import com.portalempleo.backend.model.*;
import com.portalempleo.backend.repository.*;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ApplicationService {

    private final ApplicationRepository repository;

    public ApplicationService(ApplicationRepository repository) {
        this.repository = repository;
    }

    public List<Application> getAllApplications() {
        return repository.findAll();
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