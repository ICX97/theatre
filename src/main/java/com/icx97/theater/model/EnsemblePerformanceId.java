package com.icx97.theater.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class EnsemblePerformanceId implements Serializable {
    @Column(name = "ensemble_id")
    private Long ensemble_id;
    
    @Column(name = "performance_id")
    private Long performance_id;

    public EnsemblePerformanceId() {}

    public EnsemblePerformanceId(Long ensemble_id, Long performance_id) {
        this.ensemble_id = ensemble_id;
        this.performance_id = performance_id;
    }

    // Getters and setters
    public Long getEnsembleId() {
        return ensemble_id;
    }

    public void setEnsembleId(Long ensembleId) {
        this.ensemble_id = ensembleId;
    }

    public Long getPerformanceId() {
        return performance_id;
    }

    public void setPerformanceId(Long performanceId) {
        this.performance_id = performanceId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        EnsemblePerformanceId that = (EnsemblePerformanceId) o;
        return Objects.equals(ensemble_id, that.ensemble_id) &&
                Objects.equals(performance_id, that.performance_id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(ensemble_id, performance_id);
    }
}
