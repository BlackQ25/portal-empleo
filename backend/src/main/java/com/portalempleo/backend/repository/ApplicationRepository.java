package com.portalempleo.backend.repository;

import com.portalempleo.backend.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApplicationRepository extends  JpaRepository<Application, Integer> {

}
