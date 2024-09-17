package com.icx97.theater.repository;

import com.icx97.theater.model.Seat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SeatRepository extends JpaRepository<Seat, Long> {
    List<Seat> findByHall_HallId(Long hallId);
}
