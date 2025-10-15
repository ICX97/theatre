package com.icx97.theater.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Data
@Entity
@Table(name = "ensemble", schema = "theatre")
public class Ensemble {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ensembleId;

    @Column(nullable = false, length = 50)
    private String firstName;

    @Column(nullable = false, length = 50)
    private String lastName;

    @Column(nullable = false)
    private int birthYear;

    @Column(length = 10000)
    private String ensemble_description;

    @OneToMany(mappedBy = "ensemble", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EnsemblePerformance> ensemblePerformances;
}
