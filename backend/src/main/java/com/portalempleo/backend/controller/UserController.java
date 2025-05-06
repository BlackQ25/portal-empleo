package com.portalempleo.backend.controller;

import com.portalempleo.backend.dto.UserProfileDTO;
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
}
