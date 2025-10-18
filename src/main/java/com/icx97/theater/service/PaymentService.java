package com.icx97.theater.service;

import com.icx97.theater.dto.PaymentRequest;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class PaymentService {

    public Session createCheckoutSession(PaymentRequest paymentRequest) throws StripeException {
        SessionCreateParams params = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("https://your-app.com/success")
                .setCancelUrl("https://theatreproj.netlify.app/")
                .addLineItem(SessionCreateParams.LineItem.builder()
                        .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                .setCurrency(paymentRequest.getCurrency())
                                .setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                        .setName(paymentRequest.getDescription())
                                        .build())
                                .setUnitAmount(paymentRequest.getAmount())
                                .build())
                        .setQuantity(1L)
                        .build())
                .build();

        return Session.create(params);
    }
}