package com.icx97.theater.controller;

import com.icx97.theater.dto.AppUserDTO;
import com.icx97.theater.service.AppUserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class AppUserController {
    private static final Logger logger = LoggerFactory.getLogger(AppUserController.class);
    private final AppUserService appUserService;

    @GetMapping
    public ResponseEntity<List<AppUserDTO>> getAllUsers() {
        logger.info("Received request to get all users");
        return ResponseEntity.ok(appUserService.getAllUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AppUserDTO> getUserById(@PathVariable Long id) {
        logger.info("Received request to get user with id {}", id);
        return ResponseEntity.ok(appUserService.getUserById(id));
    }

    @PostMapping
    public ResponseEntity<AppUserDTO> createUser(@RequestBody AppUserDTO appUserDTO) {
        logger.info("Received request to create user: {}", appUserDTO);
        return ResponseEntity.ok(appUserService.createUser(appUserDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AppUserDTO> updateUser(@PathVariable Long id, @RequestBody AppUserDTO appUserDTO) {
        logger.info("Received request to update user with id {}", id);
        return ResponseEntity.ok(appUserService.updateUser(id, appUserDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        logger.info("Received request to delete user with id {}", id);
        appUserService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}