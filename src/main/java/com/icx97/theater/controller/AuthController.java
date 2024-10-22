package com.icx97.theater.controller;

import com.icx97.theater.dto.AppUserDTO;
import com.icx97.theater.service.AppUserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final JwtUtils jwtUtils; 
    private final RoleRepository roleRepository;

    public AuthController(AuthenticationManager authenticationManager, UserDetailsService userDetailsService, JwtUtils jwtUtils,RoleRepository roleRepository) {
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtUtils = jwtUtils;
        this.roleRepository = roleRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateToken(authentication);

        return ResponseEntity.ok(new JwtResponse(jwt));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        // Proveri da li korisnik već postoji
        if (userDetailsService.loadUserByUsername(registerRequest.getUsername()) != null) {
            return ResponseEntity.badRequest().body("User already exists!");
        }

        // Kreiraj novog korisnika
        AppUser user = new AppUser();
        user.setUsername(registerRequest.getUsername());
        user.setPassword(new BCryptPasswordEncoder().encode(registerRequest.getPassword())); // Šifruj lozinku
        user.setEmail(registerRequest.getEmail());

        // Postavi ulogu (npr. ROLE_USER)
        Role role = roleRepository.findByRoleName("USER"); // Promeni ovde ako želiš drugačiju logiku
        if (role != null) {
            user.setRole(role); // Dodeli ulogu korisniku
        }

        user.setRole(role);

        // Spremi korisnika u bazu (implementiraj u UserService)
        userDetailsService.save(user); // Ova metoda treba biti implementirana

        return ResponseEntity.ok("User registered successfully!");
    }
}