package com.portalempleo.backend.repository;

import com.portalempleo.backend.model.JobOffer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobOfferRepository extends JpaRepository <JobOffer, Long>{

}
