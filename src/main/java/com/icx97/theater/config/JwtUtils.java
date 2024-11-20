package com.icx97.theater.config;

import com.icx97.theater.model.AppUser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtils {
    @Value("${jwt.secret}")
    private String secretKey;
    private long expirationTime = 86400000; // 1 dan u milisekundama

    public String generateToken(Authentication authentication) {
        String userId = null;
        if (authentication.getPrincipal() instanceof AppUser ) {
            userId = String.valueOf(((AppUser ) authentication.getPrincipal()).getUserId());
            System.out.println("User  ID: " + userId);
        }
        String role = authentication.getAuthorities().stream()
                .findFirst()
                .map(GrantedAuthority::getAuthority)
                .orElse("ROLE_USER");


        return Jwts.builder()
                .setSubject(authentication.getName())
                .claim("userId", userId)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }
}