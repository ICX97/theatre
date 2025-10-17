package com.icx97.theater.controller;

import com.icx97.theater.dto.EnsembleDto;
import com.icx97.theater.service.EnsembleService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/ensemble")
@RequiredArgsConstructor
public class EnsembleController {
    private static final Logger logger = LoggerFactory.getLogger(EnsembleController.class);
    private final EnsembleService ensembleService;

    @GetMapping
    public ResponseEntity<List<EnsembleDto>> getAllEnsembles() {
        logger.info("Received request to get all ensemble members");
        return ResponseEntity.ok(ensembleService.getAllEnsembles());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EnsembleDto> getEnsembleById(@PathVariable Long id) {
        logger.info("Received request to get ensemble member with id {}", id);
        return ResponseEntity.ok(ensembleService.getEnsembleById(id));
    }

    @PostMapping
    public ResponseEntity<EnsembleDto> createEnsemble(
            @RequestParam("firstName") String firstName,
            @RequestParam("lastName") String lastName,
            @RequestParam("birthYear") int birthYear,
            @RequestParam("ensemble_description") String ensembleDescription,
            @RequestParam(value = "actorImage", required = false) MultipartFile actorImage
    ) throws IOException {
        logger.info("Received request to create ensemble member: {} {}", firstName, lastName);
        
        EnsembleDto ensembleDto = new EnsembleDto();
        ensembleDto.setFirstName(firstName);
        ensembleDto.setLastName(lastName);
        ensembleDto.setBirthYear(birthYear);
        ensembleDto.setEnsemble_description(ensembleDescription);
        
        if (actorImage != null && !actorImage.isEmpty()) {
            ensembleDto.setActorImage(actorImage.getBytes());
        }
        
        return ResponseEntity.ok(ensembleService.createEnsemble(ensembleDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EnsembleDto> updateEnsemble(@PathVariable Long id, @RequestBody EnsembleDto ensembleDto) {
        logger.info("Received request to update ensemble member with id {}", id);
        return ResponseEntity.ok(ensembleService.updateEnsemble(id, ensembleDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEnsemble(@PathVariable Long id) {
        logger.info("Received request to delete ensemble member with id {}", id);
        ensembleService.deleteEnsemble(id);
        return ResponseEntity.noContent().build();
    }
}