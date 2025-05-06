package com.portalempleo.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserProfileDTO {
    private Long id;
    private String email;
    private String role;
    private Object profile;  // Datos específicos según rol (admin, candidate, company)
}
