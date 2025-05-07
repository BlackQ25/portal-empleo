package com.portalempleo.backend.dto;

import lombok.Data;

@Data
public class CompanyRegistrationDTO {
    private String email;
    private String password;

    // Company-specific fields:
    private String companyName;
    private String companyDescription;
    private String website;
    private String phone;
    private String address;
}
