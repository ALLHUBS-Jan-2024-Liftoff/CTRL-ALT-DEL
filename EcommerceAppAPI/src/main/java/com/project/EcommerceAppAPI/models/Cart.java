package com.project.EcommerceAppAPI.models;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Entity
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CartItem> items = new ArrayList<>();

    public Cart() {} // Default constructor

    public Cart(Long userId) {
        this.userId = userId;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public List<CartItem> getItems() {
        return items;
    }

    public void setItems(List<CartItem> items) {
        this.items = items;
    }

    // Method to add a CartItem to the Cart
    public void addCartItem(CartItem cartItem) {
        items.add(cartItem);
        cartItem.setCart(this); // Ensure the bidirectional relationship is maintained
    }

    // Method to get a CartItem by product ID
    public CartItem getCartItem(Long productId) {
        return items.stream()
                .filter(item -> item.getProduct().getId().equals(productId))
                .findFirst()
                .orElse(null);
    }

    // Method to remove a CartItem by product ID
    public void removeCartItem(Long productId) {
        items.removeIf(item -> item.getProduct().getId().equals(productId));
    }

    // Method to clear all CartItems from the Cart
    public void clearItems() {
        for (CartItem cartItem : items) {
            cartItem.setCart(null); // Break the bidirectional relationship
        }
        items.clear();
    }
}