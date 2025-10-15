package com.icx97.theater.repository;

import com.icx97.theater.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    Optional<AppUser> findByUsername(String username);
    
    @Query("SELECT u FROM AppUser u WHERE u.user_email = :email")
    Optional<AppUser> findByUser_email(@Param("email") String email);
    
    Optional<AppUser> findByEmailVerificationToken(String token);
}