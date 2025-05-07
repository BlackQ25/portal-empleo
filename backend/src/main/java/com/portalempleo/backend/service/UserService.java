package com.portalempleo.backend.service;

import com.portalempleo.backend.dto.*;
import com.portalempleo.backend.model.*;
import com.portalempleo.backend.repository.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.util.Map;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final CandidateRepository candidateRepository;
    private final CompanyRepository companyRepository;
    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       CandidateRepository candidateRepository,
                       CompanyRepository companyRepository,
                       AdminRepository adminRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.candidateRepository = candidateRepository;
        this.companyRepository = companyRepository;
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
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

    public LoginResponse login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // ✅ Por ahora solo compara texto plano
        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid password");
        }

        return new LoginResponse(user.getId(), user.getEmail(), user.getRole());
    }

    @Transactional
    public Candidate registerCandidate(CandidateRegistrationDTO dto) {
        // Comprobar si ya existe el email de la cuenta que se quiere crear
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Email already in use");
        }

        // Crear User
        User user = new User();
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setRole("candidate");
        User savedUser = userRepository.save(user);

        // Crear Candidate
        Candidate candidate = new Candidate();
        candidate.setUser(savedUser);
        candidate.setUserId(savedUser.getId());
        candidate.setName(dto.getName());
        candidate.setPhone(dto.getPhone());
        candidate.setAddress(dto.getAddress());
        candidate.setResume(dto.getResume());
        candidate.setSkills(dto.getSkills());
        candidate.setExperience(dto.getExperience());
        candidate.setBirthDate(dto.getBirthDate());

        return candidateRepository.save(candidate);
    }

    @Transactional
    public Company registerCompany(CompanyRegistrationDTO dto) {
        // Comprobar si ya existe el email de la cuenta que se quiere crear
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Email already in use");
        }

        // Crear User
        User user = new User();
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setRole("company");
        User savedUser = userRepository.save(user);

        // Crear Company
        Company company = new Company();
        company.setUser(savedUser);
        company.setUserId(savedUser.getId());
        company.setCompanyName(dto.getCompanyName());
        company.setCompanyDescription(dto.getCompanyDescription());
        company.setWebsite(dto.getWebsite());
        company.setPhone(dto.getPhone());
        company.setAddress(dto.getAddress());

        return companyRepository.save(company);
    }



}
