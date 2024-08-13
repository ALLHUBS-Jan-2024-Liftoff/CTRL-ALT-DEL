package com.project.EcommerceAppAPI.controllers;

public class ChargeRequest {

    private String paymentMethodId;

    // Default constructor (required for deserialization)
    public ChargeRequest() {
    }

    // Parameterized constructor
    public ChargeRequest(String paymentMethodId) {
        this.paymentMethodId = paymentMethodId;
    }

    // Getter for paymentMethodId
    public String getPaymentMethodId() {
        return paymentMethodId;
    }

    // Setter for paymentMethodId
    public void setPaymentMethodId(String paymentMethodId) {
        this.paymentMethodId = paymentMethodId;
    }

    @Override
    public String toString() {
        return "ChargeRequest{" +
                "paymentMethodId='" + paymentMethodId + '\'' +
                '}';
    }
}