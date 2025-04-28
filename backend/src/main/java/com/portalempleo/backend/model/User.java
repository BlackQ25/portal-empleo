package com.portalempleo.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    private String email;

    private String password;

    private int phone;

    @ManyToOne
    @JoinColumn(name = "role_id")  // Foreign Key apuntando a la tabla roles
    private Role role;
}
