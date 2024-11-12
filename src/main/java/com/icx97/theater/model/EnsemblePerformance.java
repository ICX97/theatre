package com.icx97.theater.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "ensemble_performance")
public class EnsemblePerformance {

    @EmbeddedId  // Use @EmbeddedId to embed the composite key
    private EnsemblePerformanceId id;

    @ManyToOne
    @JoinColumn(name = "ensemble_id", insertable = false, updatable = false)
    private Ensemble ensemble;

    @ManyToOne
    @JoinColumn(name = "performance_id", insertable = false, updatable = false)
    private Performance performance;
}
