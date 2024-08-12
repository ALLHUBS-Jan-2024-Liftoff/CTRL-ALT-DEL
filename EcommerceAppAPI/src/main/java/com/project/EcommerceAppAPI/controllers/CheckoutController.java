package com.project.EcommerceAppAPI.controllers;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/api/checkout")
@CrossOrigin(origins = "http://localhost:5173") // Update with the correct origin for your frontend
public class CheckoutController {

    // Set your test secret API key from Stripe
    static {
        Stripe.apiKey = System.getenv("STRIPE_SECRET_KEY"); // Use environment variable for the API key
    }

    @PostMapping("/create-checkout-session")
    public ResponseEntity<String> createCheckoutSession() {
        try {
            SessionCreateParams params = SessionCreateParams.builder()
                    .setMode(SessionCreateParams.Mode.PAYMENT)
                    .setSuccessUrl("http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}")
                    .setCancelUrl("http://localhost:5173/cancel")
                    .addLineItem(
                            SessionCreateParams.LineItem.builder()
                                    .setPriceData(
                                            SessionCreateParams.LineItem.PriceData.builder()
                                                    .setCurrency("usd")
                                                    .setUnitAmount(2000L) // Amount in cents
                                                    .setProductData(
                                                            SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                    .setName("Sample Product")
                                                                    .build()
                                                    )
                                                    .build()
                                    )
                                    .setQuantity(1L)
                                    .build()
                    )
                    .build();

            Session session = Session.create(params);

            // Return the actual session ID as the response
            return ResponseEntity.ok("{\"sessionId\":\"" + session.getId() + "\"}");
        } catch (StripeException e) {
            // Handle errors
            return ResponseEntity.status(500).body("Error creating Stripe session: " + e.getMessage());
        }
    }
}
