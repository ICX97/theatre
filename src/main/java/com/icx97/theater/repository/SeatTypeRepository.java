package com.icx97.theater.repository;

import com.icx97.theater.model.SeatType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SeatTypeRepository extends JpaRepository<SeatType, Long> {
    List<SeatType> findByHall_HallId(Long hallId);
}
