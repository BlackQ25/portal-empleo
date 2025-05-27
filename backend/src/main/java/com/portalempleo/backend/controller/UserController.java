package com.portalempleo.backend.controller;

import com.portalempleo.backend.dto.*;
import com.portalempleo.backend.model.*;
import com.portalempleo.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/me")
    public ResponseEntity<UserProfileDTO> getAuthenticatedUserProfile(Principal principal) {
        UserProfileDTO profileDTO = userService.getAuthenticatedUserProfile(principal);
        return ResponseEntity.ok(profileDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/register-candidate")
    public ResponseEntity<Candidate> registerCandidate(@RequestBody CandidateRegistrationDTO dto) {
        Candidate candidate = userService.registerCandidate(dto);
        return ResponseEntity.ok(candidate);
    }

    @PostMapping("/register-company")
    public ResponseEntity<Company> registerCompany(@RequestBody CompanyRegistrationDTO dto) {
        Company company = userService.registerCompany(dto);
        return ResponseEntity.ok(company);
    }

    @PostMapping("/register-admin")
    public ResponseEntity<Admin> registerAdmin(@RequestBody AdminRegistrationDTO dto) {
        return ResponseEntity.ok(userService.registerAdmin(dto));
    }

    @DeleteMapping("/admin/{userId}")
    public ResponseEntity<Void> deleteAdmin(@PathVariable Long userId) {
        userService.deleteAdminByUserId(userId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/candidate/{userId}")
    public ResponseEntity<Void> deleteCandidate(@PathVariable Long userId) {
        userService.deleteCandidateByUserId(userId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/company/{userId}")
    public ResponseEntity<Void> deleteCompany(@PathVariable Long userId) {
        userService.deleteCompanyByUserId(userId);
        return ResponseEntity.noContent().build();
    }



}
