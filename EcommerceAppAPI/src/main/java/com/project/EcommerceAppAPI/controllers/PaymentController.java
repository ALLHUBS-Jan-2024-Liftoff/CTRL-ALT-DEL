//package com.project.EcommerceAppAPI.controllers;
//
//import com.stripe.Stripe;
//import com.stripe.exception.StripeException;
//import com.stripe.model.PaymentIntent;
//import com.stripe.param.PaymentIntentCreateParams;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api")
//public class PaymentController {
//
//    @Value("${stripe.secret-key}")
//    private String stripeSecretKey;
//
//    @PostMapping("/charge")
//    public String charge(@RequestBody ChargeRequest chargeRequest) {
//        Stripe.apiKey = stripeSecretKey;
//
//        try {
//            // Create a PaymentIntent with the specified amount and currency
//            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
//                    .setAmount(1000L) // Amount in cents (e.g., 1000 cents = $10.00)
//                    .setCurrency("usd")
//                    .setPaymentMethod(chargeRequest.getPaymentMethodId())
//                    .setConfirm(true)
//                    .build();
//
//
//            PaymentIntent intent = PaymentIntent.create(params);
//            return ResponseEntity.ok(intent);
//        } catch (StripeException e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
//        }
//        }
//    }
//}
