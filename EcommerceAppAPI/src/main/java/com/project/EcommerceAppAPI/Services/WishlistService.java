package com.project.EcommerceAppAPI.Services;

import com.project.EcommerceAppAPI.models.User;
import com.project.EcommerceAppAPI.models.Product;
import com.project.EcommerceAppAPI.models.Wishlist;
import com.project.EcommerceAppAPI.repositories.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
public class WishlistService {

    @Autowired
    private WishlistRepository wishlistRepository;

    public List<Wishlist> getWishlistByUser(int userId) {
        return wishlistRepository.findByUserId(userId);
    }

    public Wishlist addToWishlist(int userId, Long productId) {
        Wishlist wishlist = new Wishlist();

        // Create User and Product objects and set their IDs directly
        User user = new User();
        user.setId(userId);

        Product product = new Product();
        product.setId((long) productId.intValue()); // Assuming `id` in Product is int, converting from Long

        wishlist.setUser(user);
        wishlist.setProduct(product);
        wishlist.setQuantity(wishlist.getQuantity() + 1);
        wishlist.setCreatedAt(new Timestamp(System.currentTimeMillis()));

        return wishlistRepository.save(wishlist);
    }

    public void removeFromWishlist(int userId, Long productId) {
        Wishlist wishlist = wishlistRepository.findByUserIdAndProductId(userId, (long) productId.intValue());
        if (wishlist != null) {
            wishlistRepository.delete(wishlist);
        }
    }
}
