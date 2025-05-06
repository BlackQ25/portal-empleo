package com.portalempleo.backend.service;

import com.portalempleo.backend.dto.UserProfileDTO;
import com.portalempleo.backend.model.*;
import com.portalempleo.backend.repository.*;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.Map;

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

    public UserProfileDTO getAuthenticatedUserProfile(Principal principal) {
        String email = principal.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Object profileData;

        switch (user.getRole()) {
            case "candidate" -> {
                Candidate candidate = candidateRepository.findById(user.getId())
                        .orElseThrow(() -> new RuntimeException("Candidate profile not found"));
                profileData = Map.of(
                        "name", candidate.getName(),
                        "phone", candidate.getPhone(),
                        "address", candidate.getAddress(),
                        "resume", candidate.getResume(),
                        "skills", candidate.getSkills(),
                        "experience", candidate.getExperience(),
                        "birthDate", candidate.getBirthDate()
                );
            }
            case "company" -> {
                Company company = companyRepository.findById(user.getId())
                        .orElseThrow(() -> new RuntimeException("Company profile not found"));
                profileData = Map.of(
                        "companyName", company.getCompanyName(),
                        "companyDescription", company.getCompanyDescription(),
                        "website", company.getWebsite(),
                        "phone", company.getPhone(),
                        "address", company.getAddress()
                );
            }
            case "admin" -> {
                Admin admin = adminRepository.findById(user.getId())
                        .orElseThrow(() -> new RuntimeException("Admin profile not found"));
                profileData = Map.of(
                        "name", admin.getName()
                );
            }
            default -> throw new RuntimeException("Unknown role: " + user.getRole());
        }

        return new UserProfileDTO(user.getId(), user.getEmail(), user.getRole(), profileData);
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado con ID: " + id));
    }
}
