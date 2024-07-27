package com.project.EcommerceAppAPI.StripeAPI;

import com.stripe.Stripe;

public class StripeConfig {
    public static void configure() {
        Stripe.apiKey = System.getenv("STRIPE_SECRET_KEY");
    }
}