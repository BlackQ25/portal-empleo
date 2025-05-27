package com.portalempleo.backend.service;

import com.portalempleo.backend.model.*;
import com.portalempleo.backend.repository.*;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AdminService {


    private final AdminRepository adminRepository;

    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    public Optional<Admin> getAdminById(Long userId) {
        return adminRepository.findById(userId);
    }

    public Admin saveAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    public void deleteAdmin(Long id) {
        adminRepository.deleteById(id);
    }



}
