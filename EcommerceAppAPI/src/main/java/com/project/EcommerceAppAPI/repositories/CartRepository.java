package com.project.EcommerceAppAPI.repositories;

import com.project.EcommerceAppAPI.models.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {

    // Find a cart by user ID
    Optional<Cart> findByUserId(Long userId);
}
