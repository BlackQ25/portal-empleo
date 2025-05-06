package com.portalempleo.backend.service;

import com.portalempleo.backend.model.Admin;
import com.portalempleo.backend.repository.AdminRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public Admin updateAdmin(Long userId, Admin updatedAdmin) {
        return adminRepository.findById(userId)
                .map(admin -> {
                    admin.setName(updatedAdmin.getName());
                    return adminRepository.save(admin);
                })
                .orElseThrow(() -> new IllegalArgumentException("Administrador no encontrado"));
    }

    public void deleteAdmin(Long userId) {
        adminRepository.deleteById(userId);
    }
}
