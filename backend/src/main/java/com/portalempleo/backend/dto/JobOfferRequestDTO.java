package com.portalempleo.backend.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class JobOfferRequestDTO {
    private String title;
    private String description;
    private String salary;
    private Long categoryId;
    private Long stateId;
    private Long cityId;
    private Long contractId;
    private LocalDateTime publishedAt;
}