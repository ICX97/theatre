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
import com.icx97.theater.service.EmailService;
import com.icx97.theater.service.EmailVerificationService;
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
    private final EmailService emailService;
    private final EmailVerificationService emailVerificationService;

    @PostMapping("/login")
    public ResponseEntity<JwtResDTO> login(@RequestBody LoginReqDTO loginRequest) {
        try {
            var user = appUserRepository.findByUsername(loginRequest.getUsername());
            if (user.isPresent()) {
                logger.info("User found in database: {}", user.get().getUsername());
                logger.info("Stored password hash: {}", user.get().getUser_password());
                
                // Test password matching
                BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
                boolean matches = encoder.matches(loginRequest.getPassword(), user.get().getUser_password());
                logger.info("Password matches: {}", matches);
            } else {
                logger.info("User NOT found in database");
            }
        } catch (Exception e) {
            logger.error("Error checking user in database: {}", e.getMessage());
        }

        try {
            // Try to find user by username first, then by email
            var userOpt = appUserRepository.findByUsername(loginRequest.getUsername());
            String actualUsername = loginRequest.getUsername();
            
            if (userOpt.isEmpty()) {
                // If not found by username, try to find by email
                userOpt = appUserRepository.findByUser_email(loginRequest.getUsername());
                if (userOpt.isPresent()) {
                    actualUsername = userOpt.get().getUsername();
                    logger.info("User found by email, actual username: {}", actualUsername);
                }
            }
            
            if (userOpt.isEmpty()) {
                logger.warn("Login attempt with non-existent username/email: {}", loginRequest.getUsername());
                throw new BadRequestException("Invalid username/email or password.");
            }

            AppUser user = userOpt.get();
            
            // Check if email is verified
            if (!user.getIsEmailVerified()) {
                logger.warn("Login attempt with unverified email for user: {}", user.getUsername());
                throw new BadRequestException("Please verify your email before logging in. Check your inbox for verification link.");
            }

            // Now try authentication with the actual username
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(actualUsername, loginRequest.getPassword())
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateToken(authentication);

            logger.info("User {} logged in successfully", actualUsername);
            return ResponseEntity.ok(new JwtResDTO(jwt));
        } catch (BadRequestException e) {
            // Re-throw BadRequestException as is
            throw e;
        } catch (BadCredentialsException e) {
            logger.error("Invalid login attempt for username/email: {}", loginRequest.getUsername());
            throw new BadRequestException("Invalid username/email or password.");
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

        if (appUserRepository.findByUser_email(registerRequest.getUser_email()).isPresent()) {
            logger.warn("Registration failed: Email already exists: {}", registerRequest.getUser_email());
            response.put("message", "Email already exists!");
            return ResponseEntity.badRequest().body(response);
        }

        AppUser user = new AppUser();
        user.setUsername(registerRequest.getUsername());
        user.setUser_password(new BCryptPasswordEncoder().encode(registerRequest.getUser_password()));
        user.setUser_email(registerRequest.getUser_email());
        user.setIsEmailVerified(false);
        
        // Generate verification token
        String verificationToken = emailVerificationService.generateVerificationToken();
        user.setEmailVerificationToken(verificationToken);

        Role role = roleRepository.findByRoleName("ROLE_USER");
        if (role == null) {
            logger.error("Registration failed: Role 'User' not found!");
            response.put("message", "Role not found!");
            return ResponseEntity.internalServerError().body(response);
        }
        user.setRole(role);

        appUserService.save(user);
        
        // Send verification email
        try {
            emailService.sendVerificationEmail(user.getUser_email(), user.getUsername(), verificationToken);
            logger.info("Verification email sent to: {}", user.getUser_email());
        } catch (Exception e) {
            logger.error("Failed to send verification email: {}", e.getMessage());
        }
        
        logger.info("User registered successfully: {}", registerRequest.getUsername());
        response.put("message", "Registration successful! Please check your email to verify your account.");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/create-admin")
    public ResponseEntity<Map<String, String>> createAdmin(@RequestBody RegisterReqDTO adminRequest) {
        logger.info("=== CREATING ADMIN USER ===");
        logger.info("Username: {}", adminRequest.getUsername());
        logger.info("Password: {}", adminRequest.getUser_password());
        logger.info("Email: {}", adminRequest.getUser_email());

        Map<String, String> response = new HashMap<>();

        try {
            // Check if username already exists
            if (appUserRepository.findByUsername(adminRequest.getUsername()).isPresent()) {
                logger.warn("Admin creation failed: User already exists for username: {}", adminRequest.getUsername());
                response.put("message", "Username already exists!");
                return ResponseEntity.badRequest().body(response);
            }

            // Create admin user
            AppUser adminUser = new AppUser();
            adminUser.setUsername(adminRequest.getUsername());
            adminUser.setUser_password(new BCryptPasswordEncoder().encode(adminRequest.getUser_password()));
            adminUser.setUser_email(adminRequest.getUser_email());

            // Set role to ADMIN
            Role adminRole = roleRepository.findByRoleName("ROLE_ADMIN");
            if (adminRole == null) {
                logger.error("Admin creation failed: Role 'ROLE_ADMIN' not found!");
                response.put("message", "Admin role not found!");
                return ResponseEntity.internalServerError().body(response);
            }
            adminUser.setRole(adminRole);

            appUserService.save(adminUser);

            logger.info("Admin user {} created successfully", adminRequest.getUsername());
            response.put("message", "Admin user created successfully!");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("An error occurred during admin creation: {}", e.getMessage());
            response.put("message", "An error occurred during admin creation.");
            return ResponseEntity.internalServerError().body(response);
        }
    }

    @PostMapping("/update-admin-password")
    public ResponseEntity<Map<String, String>> updateAdminPassword(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String newPassword = request.get("password");
        
        logger.info("=== UPDATING ADMIN PASSWORD ===");
        logger.info("Username: {}", username);
        logger.info("New Password: {}", newPassword);

        Map<String, String> response = new HashMap<>();

        try {
            var userOpt = appUserRepository.findByUsername(username);
            if (userOpt.isEmpty()) {
                logger.warn("User not found: {}", username);
                response.put("message", "User not found!");
                return ResponseEntity.badRequest().body(response);
            }

            AppUser user = userOpt.get();
            user.setUser_password(new BCryptPasswordEncoder().encode(newPassword));
            appUserService.save(user);

            logger.info("Password updated successfully for user: {}", username);
            response.put("message", "Password updated successfully!");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error updating password: {}", e.getMessage());
            response.put("message", "Error updating password.");
            return ResponseEntity.internalServerError().body(response);
        }
    }

    @GetMapping("/verify-email")
    public ResponseEntity<Map<String, String>> verifyEmail(@RequestParam String token) {
        logger.info("Email verification request for token: {}", token);

        Map<String, String> response = new HashMap<>();

        try {
            var userOpt = appUserRepository.findByEmailVerificationToken(token);
            if (userOpt.isEmpty()) {
                logger.warn("Invalid verification token: {}", token);
                response.put("message", "Invalid verification token!");
                return ResponseEntity.badRequest().body(response);
            }

            AppUser user = userOpt.get();
            if (user.getIsEmailVerified()) {
                logger.info("Email already verified for user: {}", user.getUsername());
                response.put("message", "Email already verified!");
                return ResponseEntity.ok(response);
            }

            user.setIsEmailVerified(true);
            user.setEmailVerificationToken(null); // Clear token after verification
            appUserService.save(user);

            logger.info("Email verified successfully for user: {}", user.getUsername());
            response.put("message", "Email verified successfully! You can now log in.");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error during email verification: {}", e.getMessage());
            response.put("message", "Error during email verification.");
            return ResponseEntity.internalServerError().body(response);
        }
    }
}