package com.icx97.theater.repository;

import com.icx97.theater.model.PerformanceTicketPrice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PerformanceTicketPriceRepository extends JpaRepository<PerformanceTicketPrice, Long> {
}