package com.portalempleo.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "job_offers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobOffer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private Long salary;

    @Column(name = "published_at")
    private LocalDateTime publishedAt;

    @ManyToOne
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @ManyToOne
    @JoinColumn(name = "location_id", nullable = false)
    private Location location;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
}
