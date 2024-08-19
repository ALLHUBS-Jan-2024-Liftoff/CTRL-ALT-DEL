package com.project.EcommerceAppAPI.controllers;

import com.project.EcommerceAppAPI.Services.CartService;
import com.project.EcommerceAppAPI.models.Cart;
import com.project.EcommerceAppAPI.models.dto.CartItemDTO;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.billingportal.Session;
import com.stripe.param.checkout.SessionCreateParams;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

//package com.project.EcommerceAppAPI.controllers;
//
//import com.stripe.Stripe;
//import com.stripe.exception.StripeException;
//import com.stripe.model.checkout.Session;
//import com.stripe.param.checkout.SessionCreateParams;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import javax.annotation.PostConstruct;
//import java.util.HashMap;
//import java.util.Map;
//
//@RestController
//@RequestMapping("/api")
//public class PaymentController {
//
//    @Value("${stripe.secret-key}")
//    private String stripeSecretKey;
//
//    @PostConstruct
//    public void setup() {
//        Stripe.apiKey = stripeSecretKey;
//    }
//
//    @PostMapping("/create-checkout-session")
//    public ResponseEntity<Map<String, String>> createCheckoutSession(@RequestBody Map<String, Object> requestData) {
//        try {
//            String YOUR_DOMAIN = "http://localhost:5173";
//
//            // Ensure amount and name are correctly parsed and available
//            Long amount = Long.valueOf(requestData.get("amount").toString());
//            String name = requestData.get("name").toString();
//
//            // Check if amount and name are valid
//            if (amount == null || amount <= 0 || name == null || name.isEmpty()) {
//                return ResponseEntity.badRequest().body(Map.of("error", "Invalid amount or name"));
//            }
//
//            // Create a new Stripe session
//            SessionCreateParams params = SessionCreateParams.builder()
//                    .setMode(SessionCreateParams.Mode.PAYMENT)
//                    .setSuccessUrl(YOUR_DOMAIN + "/success")
//                    .setCancelUrl(YOUR_DOMAIN + "/cancel")
//                    .addLineItem(
//                            SessionCreateParams.LineItem.builder()
//                                    .setQuantity(1L)
//                                    .setPriceData(
//                                            SessionCreateParams.LineItem.PriceData.builder()
//                                                    .setCurrency("usd")
//                                                    .setUnitAmount(amount) // Amount in cents
//                                                    .setProductData(
//                                                            SessionCreateParams.LineItem.PriceData.ProductData.builder()
//                                                                    .setName(name)
//                                                                    .build())
//                                                    .build())
//                                    .build())
//                    .build();
//
//            Session session = Session.create(params);
//
//            Map<String, String> responseData = new HashMap<>();
//            responseData.put("id", session.getId());
//
//            return ResponseEntity.ok(responseData);
//
//        } catch (StripeException e) {
//            e.printStackTrace();
//            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
//        }
//    }
//}
@RestController
@RequestMapping("/api")
public class PaymentController {

    @Value("${stripe.secret.key}")
    private String stripeSecretKey;

    @Autowired
    private CartService cartService;

    @PostConstruct
    public void setup() {
        Stripe.apiKey = stripeSecretKey;
    }

    @PostMapping("/create-checkout-session")
    public ResponseEntity<Map<String, String>> createCheckoutSession(@RequestParam Long userId) {
        try {
            Cart cart = cartService.getCartByUserId(userId);

            if (cart == null || cart.getItems().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Cart is empty"));
            }

            List<CartItemDTO> cartItemDTOs = convertCartToCartItemDTOs(cart);

            List<SessionCreateParams.LineItem> sessionItems = cartItemDTOs.stream()
                    .map(item ->
                            SessionCreateParams.LineItem.builder()
                                    .setPriceData(
                                            SessionCreateParams.LineItem.PriceData.builder()
                                                    .setCurrency("usd")
                                                    .setProductData(
                                                            SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                    .setName(item.getName())
                                                                    .build())
                                                    .setUnitAmount((long) item.getPrice())
                                                    .build())
                                    .setQuantity((long) item.getQuantity())
                                    .build())
                    .collect(Collectors.toList());

            SessionCreateParams.Builder sessionBuilder = SessionCreateParams.builder()
                    .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                    .setMode(SessionCreateParams.Mode.PAYMENT)
                    .setSuccessUrl("http://localhost:5173/success")
                    .setCancelUrl("http://localhost:5173/cancel");

// Add line items individually
            for (SessionCreateParams.LineItem item : sessionItems) {
                sessionBuilder.addLineItem(item);
            }

            SessionCreateParams params = sessionBuilder.build();
            Session session = Session.create((Map<String, Object>) params);

            return ResponseEntity.ok(Map.of("id", session.getId()));

        } catch (StripeException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to create Stripe checkout session: " + e.getMessage()));
        }
    }

    private List<CartItemDTO> convertCartToCartItemDTOs(Cart cart) {
        return cart.getItems().stream()
                .map(item -> new CartItemDTO(
                        item.getProduct().getName(),
                        (long) (item.getProduct().getPrice() * 100), // Convert to cents
                        item.getQuantity()))
                .collect(Collectors.toList());
    }
}
