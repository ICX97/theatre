package com.icx97.theater.repository;

import com.icx97.theater.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByPerformance_PerformanceId(Long performanceId);
}