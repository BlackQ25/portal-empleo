package com.portalempleo.backend.repository;

import com.portalempleo.backend.model.JobOffer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobOfferRepository extends JpaRepository<JobOffer, Long> {

    List<JobOffer> findByCity_Id(Long cityId);
    List<JobOffer> findByState_Id(Long stateId);
    List<JobOffer> findByCategory_Id(Long categoryId);
    //List<JobOffer> findByCompany_UserId(Long userId);
    List<JobOffer> findByCity_IdAndState_Id(Long cityId, Long stateId);
    List<JobOffer> findByCity_IdAndCategory_Id(Long cityId, Long categoryId);
    List<JobOffer> findByState_IdAndCategory_Id(Long stateId, Long categoryId);
    List<JobOffer> findByCity_IdAndState_IdAndCategory_Id(Long cityId, Long stateId, Long categoryId);

}
