package com.icx97.theater.controller;

import com.icx97.theater.dto.PerformanceTicketPriceDTO;
import com.icx97.theater.service.PerformanceTicketPriceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/performance-ticket-prices")
@RequiredArgsConstructor
public class PerformanceTicketPriceController {
    private final PerformanceTicketPriceService performanceTicketPriceService;

    @GetMapping
    public ResponseEntity<List<PerformanceTicketPriceDTO>> getAllPerformanceTicketPrices() {
        return ResponseEntity.ok(performanceTicketPriceService.getAllPerformanceTicketPrices());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PerformanceTicketPriceDTO> getPerformanceTicketPriceById(@PathVariable Long id) {
        return ResponseEntity.ok(performanceTicketPriceService.getPerformanceTicketPriceById(id));
    }

    @PostMapping
    public ResponseEntity<PerformanceTicketPriceDTO> createPerformanceTicketPrice(@RequestBody PerformanceTicketPriceDTO performanceTicketPriceDTO) {
        return new ResponseEntity<>(performanceTicketPriceService.createPerformanceTicketPrice(performanceTicketPriceDTO), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PerformanceTicketPriceDTO> updatePerformanceTicketPrice(@PathVariable Long id, @RequestBody PerformanceTicketPriceDTO performanceTicketPriceDTO) {
        return ResponseEntity.ok(performanceTicketPriceService.updatePerformanceTicketPrice(id, performanceTicketPriceDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePerformanceTicketPrice(@PathVariable Long id) {
        performanceTicketPriceService.deletePerformanceTicketPrice(id);
        return ResponseEntity.noContent().build();
    }
}