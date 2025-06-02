package com.portalempleo.backend.controller;

import com.portalempleo.backend.dto.*;
import com.portalempleo.backend.model.*;
import com.portalempleo.backend.service.UserService;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
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

    @GetMapping("/resume/{filename}")
    public ResponseEntity<Resource> getResumeFile(@PathVariable String filename) {
        try {
            Path file = Paths.get("uploads/resumes").resolve(filename).normalize();
            Resource resource = new UrlResource(file.toUri());

            if (!resource.exists()) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_PDF)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }


    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @PostMapping(value = "/register-candidate", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Candidate> registerCandidate(
            @RequestPart("dto") CandidateRegistrationDTO dto,
            @RequestPart("resumeFile") MultipartFile resumeFile) {
        return ResponseEntity.ok(userService.registerCandidate(dto, resumeFile));
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
