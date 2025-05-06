package com.portalempleo.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "companies")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Company {

    @Id
    private Long userId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "company_name")
    private String companyName;

    @Column(name = "company_description")
    private String companyDescription;

    private String website;

    private String phone;

    private String address;
}
