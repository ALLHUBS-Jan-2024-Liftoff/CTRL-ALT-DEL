package com.project.EcommerceAppAPI.controllers;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class PaymentController {

    @Value("${stripe.secret-key}")
    private String stripeSecretKey;

    @PostConstruct
    public void setup() {
        Stripe.apiKey = stripeSecretKey;
    }

    @PostMapping("/create-checkout-session")
    public ResponseEntity<Map<String, String>> createCheckoutSession(@RequestBody Map<String, Object> requestData) {
        try {
            String YOUR_DOMAIN = "http://localhost:5173";

            // Ensure amount and name are correctly parsed and available
            Long amount = Long.valueOf(requestData.get("amount").toString());
            String name = requestData.get("name").toString();

            // Check if amount and name are valid
            if (amount == null || amount <= 0 || name == null || name.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Invalid amount or name"));
            }

            // Create a new Stripe session
            SessionCreateParams params = SessionCreateParams.builder()
                    .setMode(SessionCreateParams.Mode.PAYMENT)
                    .setSuccessUrl(YOUR_DOMAIN + "/success")
                    .setCancelUrl(YOUR_DOMAIN + "/cancel")
                    .addLineItem(
                            SessionCreateParams.LineItem.builder()
                                    .setQuantity(1L)
                                    .setPriceData(
                                            SessionCreateParams.LineItem.PriceData.builder()
                                                    .setCurrency("usd")
                                                    .setUnitAmount(amount) // Amount in cents
                                                    .setProductData(
                                                            SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                    .setName(name)
                                                                    .build())
                                                    .build())
                                    .build())
                    .build();

            Session session = Session.create(params);

            Map<String, String> responseData = new HashMap<>();
            responseData.put("id", session.getId());

            return ResponseEntity.ok(responseData);

        } catch (StripeException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }
}
