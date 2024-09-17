package com.icx97.theater.repository;


import com.icx97.theater.model.Performance;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PerformanceRepository extends JpaRepository<Performance, Long> {
}