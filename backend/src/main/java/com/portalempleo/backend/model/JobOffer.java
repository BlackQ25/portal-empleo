package com.portalempleo.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "job_offers")
@Data
public class JobOffer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;


}
