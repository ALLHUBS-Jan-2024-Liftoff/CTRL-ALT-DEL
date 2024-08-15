package com.project.EcommerceAppAPI.models;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CartItem> items = new ArrayList<>();

    public Cart(Long userId) {
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

    // Method to get a CartItem by its index
    public CartItem getCartItem(int index) {
        if (index >= 0 && index < items.size()) {
            return items.get(index);
        }
        return null;
    }

    // Method to remove a CartItem by its index
    public void removeCartItem(int index) {
        if (index >= 0 && index < items.size()) {
            CartItem cartItem = items.remove(index);
            cartItem.setCart(null); // Break the bidirectional relationship
        }
    }

    // Method to clear all CartItems from the Cart
    public void clearItems() {
        for (CartItem cartItem : items) {
            cartItem.setCart(null); // Break the bidirectional relationship
        }
        items.clear();
    }
}
