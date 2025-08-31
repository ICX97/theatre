package com.icx97.theater.controller;

import com.icx97.theater.dto.SeatTypeDTO;
import com.icx97.theater.service.SeatTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/seat-types")
@RequiredArgsConstructor
public class SeatTypeController {
    private final SeatTypeService seatTypeService;

    @GetMapping
    public ResponseEntity<List<SeatTypeDTO>> getAllSeatTypes() {
        return ResponseEntity.ok(seatTypeService.getAllSeatTypes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SeatTypeDTO> getSeatTypeById(@PathVariable Long id) {
        return ResponseEntity.ok(seatTypeService.getSeatTypeById(id));
    }

    @GetMapping("/hall/{hallId}")
    public ResponseEntity<List<SeatTypeDTO>> getSeatTypesByHallId(@PathVariable Long hallId) {
        return ResponseEntity.ok(seatTypeService.getSeatTypesByHallId(hallId));
    }

    @PostMapping
    public ResponseEntity<SeatTypeDTO> createSeatType(@RequestBody SeatTypeDTO seatTypeDTO) {
        return new ResponseEntity<>(seatTypeService.createSeatType(seatTypeDTO), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SeatTypeDTO> updateSeatType(@PathVariable Long id, @RequestBody SeatTypeDTO seatTypeDTO) {
        return ResponseEntity.ok(seatTypeService.updateSeatType(id, seatTypeDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSeatType(@PathVariable Long id) {
        seatTypeService.deleteSeatType(id);
        return ResponseEntity.noContent().build();
    }
}