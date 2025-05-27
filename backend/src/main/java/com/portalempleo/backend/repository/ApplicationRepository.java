package com.portalempleo.backend.repository;

import com.portalempleo.backend.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationRepository extends  JpaRepository<Application, Integer> {
    List<Application> findByCandidateId(Long candidateId);
}
