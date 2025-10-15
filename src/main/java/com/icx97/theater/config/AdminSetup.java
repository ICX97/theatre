package com.icx97.theater.config;

import com.icx97.theater.model.AppUser;
import com.icx97.theater.model.Role;
import com.icx97.theater.repository.AppUserRepository;
import com.icx97.theater.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AdminSetup implements CommandLineRunner {
    
    private static final Logger logger = LoggerFactory.getLogger(AdminSetup.class);
    private final RoleRepository roleRepository;
    private final AppUserRepository appUserRepository;

    @Override
    public void run(String... args) throws Exception {
        setupRoles();
        setupAdminUser();
    }

    private void setupRoles() {
        try {
            if (roleRepository.findByRoleName("ROLE_USER") == null) {
                Role userRole = new Role();
                userRole.setRoleName("ROLE_USER");
                roleRepository.save(userRole);
                logger.info("Created ROLE_USER");
            } else {
                logger.info("ROLE_USER already exists");
            }
        } catch (Exception e) {
            logger.warn("Error checking/creating ROLE_USER: {}", e.getMessage());
        }

        try {
            if (roleRepository.findByRoleName("ROLE_ADMIN") == null) {
                Role adminRole = new Role();
                adminRole.setRoleName("ROLE_ADMIN");
                roleRepository.save(adminRole);
                logger.info("Created ROLE_ADMIN");
            } else {
                logger.info("ROLE_ADMIN already exists");
            }
        } catch (Exception e) {
            logger.warn("Error checking/creating ROLE_ADMIN: {}", e.getMessage());
        }
    }

    private void setupAdminUser() {
        try {
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            
            if (appUserRepository.findByUsername("admin").isEmpty()) {
                String adminPassword = "admin";
                String adminPasswordHash = passwordEncoder.encode(adminPassword);
                
                logger.info("=== ADMIN USER SETUP ===");
                logger.info("Username: admin");
                logger.info("Password: {}", adminPassword);
                logger.info("Password Hash: {}", adminPasswordHash);
                
                AppUser admin = new AppUser();
                admin.setUsername("admin");
                admin.setUser_password(adminPasswordHash);
                admin.setUser_email("admin@theater.com");
                
                Role adminRole = roleRepository.findByRoleName("ROLE_ADMIN");
                if (adminRole != null) {
                    admin.setRole(adminRole);
                    appUserRepository.save(admin);
                    logger.info("Created admin user with username: admin, password: admin");
                } else {
                    logger.error("ROLE_ADMIN not found! Cannot create admin user.");
                }
            } else {
                logger.info("Admin user already exists");
            }
        } catch (Exception e) {
            logger.warn("Error creating admin user: {}", e.getMessage());
        }

        try {
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            
            if (appUserRepository.findByUsername("user").isEmpty()) {
                String userPassword = "user";
                String userPasswordHash = passwordEncoder.encode(userPassword);
                
                logger.info("=== TEST USER SETUP ===");
                logger.info("Username: user");
                logger.info("Password: {}", userPassword);
                logger.info("Password Hash: {}", userPasswordHash);
                
                AppUser user = new AppUser();
                user.setUsername("user");
                user.setUser_password(userPasswordHash);
                user.setUser_email("user@theater.com");
                
                Role userRole = roleRepository.findByRoleName("ROLE_USER");
                if (userRole != null) {
                    user.setRole(userRole);
                    appUserRepository.save(user);
                    logger.info("Created test user with username: user, password: user");
                } else {
                    logger.error("ROLE_USER not found! Cannot create test user.");
                }
            } else {
                logger.info("Test user already exists");
            }
        } catch (Exception e) {
            logger.warn("Error creating test user: {}", e.getMessage());
        }
    }
}
