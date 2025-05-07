package com.portalempleo.backend.dto;

import lombok.Data;

@Data
public class CandidateRegistrationDTO {
    private String email;
    private String password;

    // Candidate-specific fields:
    private String name;
    private String phone;
    private String address;
    private String resume;
    private String skills;
    private String experience;
    private String birthDate;
}
