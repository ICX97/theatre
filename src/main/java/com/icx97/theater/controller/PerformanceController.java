package com.icx97.theater.controller;

import com.icx97.theater.dto.PerformanceDTO;
import com.icx97.theater.dto.PerformanceWithPricesDTO;
import com.icx97.theater.service.PerformanceService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/performances")
@RequiredArgsConstructor
public class PerformanceController {
    private static final Logger logger = LoggerFactory.getLogger(PerformanceController.class);
    private final PerformanceService performanceService;

    @GetMapping
    public ResponseEntity<List<PerformanceDTO>> getAllPerformances() {
        logger.info("Received request to get all performances");
        return ResponseEntity.ok(performanceService.getAllPerformances());
    }

    @GetMapping("/with-prices")
    public ResponseEntity<List<PerformanceWithPricesDTO>> getAllPerformancesWithPrices() {
        return ResponseEntity.ok(performanceService.getAllPerformancesWithPrices());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PerformanceDTO> getPerformanceById(@PathVariable Long id) {
        logger.info("Received request to get performance with id {}", id);
        return ResponseEntity.ok(performanceService.getPerformanceById(id));
    }

    @PostMapping
    public ResponseEntity<PerformanceDTO> createPerformance(@RequestBody PerformanceDTO performanceDTO) {
        logger.info("Received request to create performance: {}", performanceDTO);
        return ResponseEntity.ok(performanceService.createPerformance(performanceDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PerformanceDTO> updatePerformance(@PathVariable Long id, @RequestBody PerformanceDTO performanceDTO) {
        logger.info("Received request to update performance with id {}", id);
        return ResponseEntity.ok(performanceService.updatePerformance(id, performanceDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePerformance(@PathVariable Long id) {
        logger.info("Received request to delete performance with id {}", id);
        performanceService.deletePerformance(id);
        return ResponseEntity.noContent().build();
    }
}
