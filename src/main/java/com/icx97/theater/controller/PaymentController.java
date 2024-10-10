package com.icx97.theater.controller;

import com.icx97.theater.dto.PaymentRequest;
import com.icx97.theater.service.PaymentService;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/create-checkout-session")
    public ResponseEntity<Map<String, String>> createCheckoutSession(@RequestBody PaymentRequest paymentRequest) throws StripeException {
        Session session = paymentService.createCheckoutSession(paymentRequest);

        Map<String, String> response = new HashMap<>();
        response.put("sessionId", session.getId());
        return ResponseEntity.ok(response);
    }
}