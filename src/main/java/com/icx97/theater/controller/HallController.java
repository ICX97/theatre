package com.icx97.theater.controller;

import com.icx97.theater.dto.HallDTO;
import com.icx97.theater.service.HallService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/halls")
@RequiredArgsConstructor
public class HallController {
    private static final Logger logger = LoggerFactory.getLogger(HallController.class);
    private final HallService hallService;

    @GetMapping
    public ResponseEntity<List<HallDTO>> getAllHalls() {
        logger.info("Received request to get all halls");
        return ResponseEntity.ok(hallService.getAllHalls());
    }

    @GetMapping("/{id}")
    public ResponseEntity<HallDTO> getHallById(@PathVariable Long id) {
        logger.info("Received request to get hall with id {}", id);
        return ResponseEntity.ok(hallService.getHallById(id));
    }

    @PostMapping
    public ResponseEntity<HallDTO> createHall(@RequestBody HallDTO hallDTO) {
        logger.info("Received request to create hall: {}", hallDTO);
        return ResponseEntity.ok(hallService.createHall(hallDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<HallDTO> updateHall(@PathVariable Long id, @RequestBody HallDTO hallDTO) {
        logger.info("Received request to update hall with id {}", id);
        return ResponseEntity.ok(hallService.updateHall(id, hallDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHall(@PathVariable Long id) {
        logger.info("Received request to delete hall with id {}", id);
        hallService.deleteHall(id);
        return ResponseEntity.noContent().build();
    }
}
