package com.project.EcommerceAppAPI.controllers;

import com.project.EcommerceAppAPI.Services.WishlistService;
import com.project.EcommerceAppAPI.models.Wishlist;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

    @Autowired
    private WishlistService wishlistService;

    @GetMapping
    public List<Wishlist> getWishList(HttpSession session) {
        Integer userId = (Integer) session.getAttribute("user");
        if (userId == null) {
            System.out.println("User not logged in, throwing UNAUTHORIZED exception.");
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not logged in.");
        }
        return wishlistService.getWishlistByUser(userId);
    }

    @PostMapping("/add")
    public Wishlist addToWishlist(HttpSession session, @RequestParam Long productId) {
        Integer userId = (Integer) session.getAttribute("user");
        if (userId == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not logged in.");
        }
        return wishlistService.addToWishlist(userId, productId);
    }

    @DeleteMapping("/remove")
    public void removeFromWishlist(HttpSession session, @RequestParam Long productId) {
        Integer userId = (Integer) session.getAttribute("user");
        if (userId == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not logged in.");
        }
        wishlistService.removeFromWishlist(userId, productId);
    }
}
