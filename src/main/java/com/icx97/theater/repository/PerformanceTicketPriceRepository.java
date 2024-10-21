package com.icx97.theater.repository;

import com.icx97.theater.model.Performance;
import com.icx97.theater.model.PerformanceTicketPrice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PerformanceTicketPriceRepository extends JpaRepository<PerformanceTicketPrice, Long> {
    List<PerformanceTicketPrice> findByPerformance_PerformanceId(Long performanceId);

}
