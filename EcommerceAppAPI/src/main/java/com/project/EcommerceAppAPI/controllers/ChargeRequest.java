package com.project.EcommerceAppAPI.controllers;

public class ChargeRequest {

    private Long amount; // Amount in cents
    private String currency; // Currency code (e.g., "usd")
    private String paymentMethodId; // Payment method ID from Stripe

    // Getters and Setters
    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getPaymentMethodId() {
        return paymentMethodId;
    }

    public void setPaymentMethodId(String paymentMethodId) {
        this.paymentMethodId = paymentMethodId;
    }
}