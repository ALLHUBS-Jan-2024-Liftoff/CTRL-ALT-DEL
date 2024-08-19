package com.project.EcommerceAppAPI.models.dto;

public class CartItemDTO {
    private String name;
    private long price; // Price in cents
    private int quantity;

    // Constructors, getters, and setters
    public CartItemDTO(String name, long price, int quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getPrice() {
        return price;
    }

    public void setPrice(long price) {
        this.price = price;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}