package com.icx97.theater.controller;

import com.icx97.theater.dto.SeatDTO;
import com.icx97.theater.service.SeatService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/seats")
@RequiredArgsConstructor
public class SeatController {
    private static final Logger logger = LoggerFactory.getLogger(SeatController.class);
    private final SeatService seatService;

    @GetMapping
    public ResponseEntity<List<SeatDTO>> getAllSeats() {
        logger.info("Received request to get all seats");
        return ResponseEntity.ok(seatService.getAllSeats());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SeatDTO> getSeatById(@PathVariable Long id) {
        logger.info("Received request to get seat with id {}", id);
        return ResponseEntity.ok(seatService.getSeatById(id));
    }

    @GetMapping("/performance/{performanceId}")
    public ResponseEntity<List<SeatDTO>> getSeatsByPerformance(@PathVariable Long performanceId) {
        return ResponseEntity.ok(seatService.getSeatsByPerformance(performanceId));
    }

    @PostMapping
    public ResponseEntity<SeatDTO> createSeat(@RequestBody SeatDTO seatDTO) {
        logger.info("Received request to create seat: {}", seatDTO);
        return ResponseEntity.ok(seatService.createSeat(seatDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SeatDTO> updateSeat(@PathVariable Long id, @RequestBody SeatDTO seatDTO) {
        logger.info("Received request to update seat with id {}", id);
        return ResponseEntity.ok(seatService.updateSeat(id, seatDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSeat(@PathVariable Long id) {
        logger.info("Received request to delete seat with id {}", id);
        seatService.deleteSeat(id);
        return ResponseEntity.noContent().build();
    }
}