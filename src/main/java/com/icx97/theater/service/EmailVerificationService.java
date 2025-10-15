package com.icx97.theater.service;

import org.springframework.stereotype.Service;
import java.security.SecureRandom;
import java.util.Base64;

@Service
public class EmailVerificationService {

    private static final int TOKEN_LENGTH = 32;
    private final SecureRandom secureRandom = new SecureRandom();

    public String generateVerificationToken() {
        byte[] tokenBytes = new byte[TOKEN_LENGTH];
        secureRandom.nextBytes(tokenBytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(tokenBytes);
    }

    public boolean isValidToken(String token) {
        return token != null && token.length() > 0;
    }
}

