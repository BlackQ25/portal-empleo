package com.portalempleo.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "admins")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Admin {

    @Id
    private Long userId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;

    private String name;

}
