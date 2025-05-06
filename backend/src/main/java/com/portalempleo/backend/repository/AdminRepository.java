package com.portalempleo.backend.repository;

import com.portalempleo.backend.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {

}
