package com.icx97.theater.controller;

import com.icx97.theater.config.JwtUtils;
import com.icx97.theater.dto.JwtResDTO;
import com.icx97.theater.dto.LoginReqDTO;
import com.icx97.theater.dto.RegisterReqDTO;
import com.icx97.theater.exception.BadRequestException;
import com.icx97.theater.exception.CustomException;
import com.icx97.theater.model.AppUser;
import com.icx97.theater.model.Role;
import com.icx97.theater.repository.AppUserRepository;
import com.icx97.theater.repository.RoleRepository;
import com.icx97.theater.service.AppUserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final AppUserRepository appUserRepository;
    private final RoleRepository roleRepository;
    private final AppUserService appUserService;

    @PostMapping("/login")
    public ResponseEntity<JwtResDTO> login(@RequestBody LoginReqDTO loginRequest) {
        logger.info("Pocelooooo");
        logger.info("Received login request for username: {}", loginRequest.getUsername());

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateToken(authentication);

            logger.info("User {} logged in successfully", loginRequest.getUsername());
            return ResponseEntity.ok(new JwtResDTO(jwt));
        } catch (BadCredentialsException e) {
            logger.error("Invalid login attempt for username: {}", loginRequest.getUsername());
            throw new BadRequestException("Invalid username or password.");
        } catch (Exception e) {
            logger.error("An error occurred during login: {}", e.getMessage());
            throw new CustomException("An error occurred during login.");
        }
    }

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        logger.info("Received TSEEST request for username: ");
        return ResponseEntity.ok("Test route working!");
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody RegisterReqDTO registerRequest) {
        logger.info("Received registration request for username: {}", registerRequest.getUsername());

        Map<String, String> response = new HashMap<>();

        if (appUserRepository.findByUsername(registerRequest.getUsername()).isPresent()) {
            logger.warn("Registration failed: User already exists for username: {}", registerRequest.getUsername());
            response.put("message", "User already exists!");
            return ResponseEntity.badRequest().body(response);
        }

        AppUser user = new AppUser();
        user.setUsername(registerRequest.getUsername());
        user.setUser_password(new BCryptPasswordEncoder().encode(registerRequest.getUser_password()));
        user.setUser_email(registerRequest.getUser_email());

        Role role = roleRepository.findByRoleName("ROLE_USER");
        if (role == null) {
            logger.error("Registration failed: Role 'User' not found!");
            response.put("message", "Role not found!");
            return ResponseEntity.internalServerError().body(response);
        }
        user.setRole(role);

        appUserService.save(user);
        logger.info("User registered successfully: {}", registerRequest.getUsername());
        response.put("message", "User registered successfully!");
        return ResponseEntity.ok(response);
    }
}