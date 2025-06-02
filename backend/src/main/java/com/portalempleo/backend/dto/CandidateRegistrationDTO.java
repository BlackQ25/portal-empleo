package com.portalempleo.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CandidateRegistrationDTO {
    private String email;
    private String password;

    private String name;
    private String phone;
    private String address;
    private String skills;
    private String experience;
    private String birthDate;

}

