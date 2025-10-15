package com.icx97.theater.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "ensemble_performance")
public class EnsemblePerformance {

    @EmbeddedId
    private EnsemblePerformanceId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("ensemble_id")
    @JoinColumn(name = "ensemble_id")
    private Ensemble ensemble;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("performance_id")
    @JoinColumn(name = "performance_id")
    private Performance performance;
}
