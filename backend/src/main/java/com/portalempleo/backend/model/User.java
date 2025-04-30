package com.portalempleo.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String email;

    private String password;

    private String phone;

    private String address;

    @ManyToOne
    @JoinColumn(name = "role_id")  // Foreign Key apuntando a la tabla roles
    private Role role;
}
