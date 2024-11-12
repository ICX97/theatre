package com.icx97.theater.repository;

import com.icx97.theater.model.EnsemblePerformance;
import com.icx97.theater.model.EnsemblePerformanceId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EnsemblePerformanceRepository extends JpaRepository<EnsemblePerformance, EnsemblePerformanceId> {
}
