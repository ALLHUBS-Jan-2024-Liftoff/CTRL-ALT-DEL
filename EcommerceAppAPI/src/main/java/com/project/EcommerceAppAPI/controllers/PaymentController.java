package com.project.EcommerceAppAPI.controllers;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class PaymentController {

    @Value("${stripe.secret-key}")
    private String stripeSecretKey;

    @PostMapping("/charge")
    public ResponseEntity<?> charge(@RequestBody ChargeRequest chargeRequest) {
        Stripe.apiKey = stripeSecretKey;

        try {
            // Create a PaymentIntent with the specified amount and currency
            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                    .setAmount(chargeRequest.getAmount()) // Amount in cents
                    .setCurrency("usd")
                    .setPaymentMethod(chargeRequest.getPaymentMethodId())
                    .setConfirm(true)
                    .build();

            PaymentIntent intent = PaymentIntent.create(params);
            return ResponseEntity.ok(intent);
        } catch (StripeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}