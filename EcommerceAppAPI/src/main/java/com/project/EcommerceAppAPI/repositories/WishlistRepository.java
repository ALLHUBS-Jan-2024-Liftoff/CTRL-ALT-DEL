package com.project.EcommerceAppAPI.repositories;

import com.project.EcommerceAppAPI.models.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WishlistRepository extends JpaRepository<Wishlist, Integer> {
    List<Wishlist> findByUserId(int userId);
    Wishlist findByUserIdAndProductId(int userId, Long productId);
}
