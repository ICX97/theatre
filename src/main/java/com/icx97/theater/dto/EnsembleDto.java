package com.icx97.theater.dto;

import lombok.Data;

@Data
public class EnsembleDto {
    private Long ensembleId;
    private String firstName;
    private String lastName;
    private int birthYear;
    private String ensemble_description;
    private String actorImage; // Base64 string za frontend
}

