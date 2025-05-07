package com.portalempleo.backend.controller;

import com.portalempleo.backend.dto.*;
import com.portalempleo.backend.model.*;
import com.portalempleo.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<UserProfileDTO> getAuthenticatedUserProfile(Principal principal) {
        UserProfileDTO profileDTO = userService.getAuthenticatedUserProfile(principal);
        return ResponseEntity.ok(profileDTO);
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

}
