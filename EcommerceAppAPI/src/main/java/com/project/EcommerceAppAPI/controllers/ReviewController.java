package com.project.EcommerceAppAPI.controllers;

import com.project.EcommerceAppAPI.Services.ReviewService;
import com.project.EcommerceAppAPI.models.Review;
import com.project.EcommerceAppAPI.models.dto.ReviewDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reviews")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    // get all reviews for a specific product
    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Review>> getReviewsByProductId(@PathVariable long productId) {
        List<Review> reviews = reviewService.getReviewsByProductId(productId);
        return ResponseEntity.ok(reviews);
    }

    // get all reviews by a specific user
    public ResponseEntity<List<Review>> getReviewsByUserId(@PathVariable int userId) {
        List<Review> reviews = reviewService.getReviewsByUserId(userId);
        return ResponseEntity.ok(reviews);
    }

    // get all reviews with a specific rating
    public ResponseEntity<List<Review>> getReviewsByRating(@PathVariable int rating) {
        List<Review> reviews = reviewService.getReviewsByRating(rating);
        return ResponseEntity.ok(reviews);
    }

    // add a new review
    @PostMapping("/product/{productId}")
    public ResponseEntity<Review> addReview(@PathVariable long productId, @RequestBody ReviewDTO reviewDTO) {
        Review review = reviewService.addReview(productId, reviewDTO);
        return ResponseEntity.ok(review);
    }

    // update an existing review
    @PutMapping("/{reviewId}")
    public ResponseEntity<Review> updateReview(@PathVariable int reviewId, @RequestBody ReviewDTO reviewDTO) {
        try {
            Review updatedReview = reviewService.updateReview(reviewId, reviewDTO);
            return ResponseEntity.ok(updatedReview);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // delete a review
    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Void> deleteReview(@PathVariable int reviewId) {
        try {
            reviewService.deleteReview(reviewId);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }


}

