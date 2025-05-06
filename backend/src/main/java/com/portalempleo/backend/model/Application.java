package com.portalempleo.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "applications")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "candidate_id", nullable = false)
    private Integer candidateId;

    @Column(name = "job_offer_id", nullable = false)
    private Integer jobOfferId;

    @Column(name = "applied_at")
    private LocalDateTime appliedAt;

    @Column(name = "status")
    private String status;

}
