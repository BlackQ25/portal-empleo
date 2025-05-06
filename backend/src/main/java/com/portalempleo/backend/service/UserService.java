package com.portalempleo.backend.service;

import com.portalempleo.backend.model.*;
import com.portalempleo.backend.repository.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final CandidateRepository candidateRepository;
    private final CompanyRepository companyRepository;
    private final AdminRepository adminRepository;

    public UserService(UserRepository userRepository,
                       CandidateRepository candidateRepository,
                       CompanyRepository companyRepository,
                       AdminRepository adminRepository) {
        this.userRepository = userRepository;
        this.candidateRepository = candidateRepository;
        this.companyRepository = companyRepository;
        this.adminRepository = adminRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public User createUser(User user, Object roleData) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }

        // guardar primero en la tabla padre
        User savedUser = userRepository.save(user);

        // segun el rol, se guarda en la tabla hija que corresponde
        switch (user.getRole()) {
            case candidate -> {
                if (roleData instanceof Candidate candidate) {
                    candidate.setUser(savedUser);
                    candidateRepository.save(candidate);
                } else {
                    throw new IllegalArgumentException("Candidate data is missing or invalid");
                }
            }
            case company -> {
                if (roleData instanceof Company company) {
                    company.setUser(savedUser);
                    companyRepository.save(company);
                } else {
                    throw new IllegalArgumentException("Company data is missing or invalid");
                }
            }
            case admin -> {
                if (roleData instanceof Admin admin) {
                    admin.setUser(savedUser);
                    adminRepository.save(admin);
                } else {
                    throw new IllegalArgumentException("Admin data is missing or invalid");
                }
            }
            default -> throw new IllegalArgumentException("Unknown role: " + user.getRole());
        }

        return savedUser;
    }

    public User updateUser(Long id, User updatedUser) {
        return userRepository.findById(id)
                .map(existingUser -> {
                    existingUser.setEmail(updatedUser.getEmail());
                    existingUser.setPassword(updatedUser.getPassword());
                    existingUser.setRole(updatedUser.getRole());
                    return userRepository.save(existingUser);
                })
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new IllegalArgumentException("User not found");
        }
        userRepository.deleteById(id);
    }
}
