package com.project.EcommerceAppAPI.models.dto;

public class ChargeRequest {

    private String paymentMethodId;
    private Long amount; // in cents

    public String getPaymentMethodId() {
        return paymentMethodId;
    }

    public void setPaymentMethodId(String paymentMethodId) {
        this.paymentMethodId = paymentMethodId;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }
}