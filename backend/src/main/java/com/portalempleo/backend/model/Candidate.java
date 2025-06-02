package com.portalempleo.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "candidates")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Candidate {

    @Id
    private Long userId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;

    private String name;

    private String phone;

    private String address;

    @Column(name = "resume_path")
    private String resumePath;

    private String skills;
    private String experience;

    @Column(name = "fecha_nacimiento")
    private String birthDate;
}
