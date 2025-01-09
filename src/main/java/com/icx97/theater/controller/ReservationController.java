package com.icx97.theater.controller;

import com.icx97.theater.dto.ReservationDTO;
import com.icx97.theater.dto.ResevationListSeatsDTO;
import com.icx97.theater.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
public class ReservationController {
    private static final Logger logger = LoggerFactory.getLogger(ReservationController.class);
    private final ReservationService reservationService;

    @GetMapping
    public ResponseEntity<List<ReservationDTO>> getAllReservations() {
        logger.info("Received request to get all reservations");
        return ResponseEntity.ok(reservationService.getAllReservations());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReservationDTO> getReservationById(@PathVariable Long id) {
        logger.info("Received request to get reservation with id {}", id);
        return ResponseEntity.ok(reservationService.getReservationById(id));
    }

    @GetMapping("/performance/{performanceId}")
    public ResponseEntity<ResevationListSeatsDTO> getCombinedReservationsByPerformanceId(@PathVariable Long performanceId) {
        logger.info("Received request to get combined reservations for performance with id {}", performanceId);

        ResevationListSeatsDTO combinedReservation = reservationService.getCombinedReservationsByPerformanceId(performanceId);
        if (combinedReservation.getSeatIds() == null || combinedReservation.getSeatIds().isEmpty()) {
            return ResponseEntity.noContent().build(); // 204 No Content ako nema rezervacija
        }
        return ResponseEntity.ok(combinedReservation);
    }

    @PostMapping
    public ResponseEntity<List<ReservationDTO>> createReservation(@RequestBody ResevationListSeatsDTO reservationDTO) {
        logger.info("Received request to create reservations: {}", reservationDTO);
        List<ReservationDTO> createdReservations = reservationService.createReservation(reservationDTO);
        return ResponseEntity.ok(createdReservations);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReservationDTO> updateReservation(@PathVariable Long id, @RequestBody ReservationDTO reservationDTO) {
        logger.info("Received request to update reservation with id {}", id);
        return ResponseEntity.ok(reservationService.updateReservation(id, reservationDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReservation(@PathVariable Long id) {
        logger.info("Received request to delete reservation with id {}", id);
        reservationService.deleteReservation(id);
        return ResponseEntity.noContent().build();
    }
}