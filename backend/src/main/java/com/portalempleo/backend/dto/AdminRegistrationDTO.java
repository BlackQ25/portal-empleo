package com.portalempleo.backend.dto;

import lombok.Data;

@Data
public class AdminRegistrationDTO {
    //Tabla user
    private String email;
    private String password;

    //Tabla admin
    private String name;
}