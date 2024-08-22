package com.project.EcommerceAppAPI.Services;

import com.project.EcommerceAppAPI.models.Product;
import com.project.EcommerceAppAPI.models.Review;
import com.project.EcommerceAppAPI.models.dto.ReviewDTO;
import com.project.EcommerceAppAPI.repositories.ProductRepository;
import com.project.EcommerceAppAPI.repositories.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private ProductRepository productRepository;

    // get all reviews for a specific product
    public List<Review> getReviewsByProductId(long productId) {
        return reviewRepository.findByProductId(productId);
    }

    // add a new review
    public Review addReview(long productId, ReviewDTO reviewDTO) {
        // fetch product by id
        Optional<Product> optionalProduct = productRepository.findById(productId);
        if (!optionalProduct.isPresent()) {
            throw new IllegalArgumentException("Product not found.");
        }

        Product product = optionalProduct.get();

        Review review = new Review();
        review.setUserId(reviewDTO.getUserId());
        review.setProduct(product);
//        review.setProductId(reviewDTO.getProductId());
        review.setRating(reviewDTO.getRating());
        review.setComment(reviewDTO.getComment());
        // date will be automatically set by database
        return reviewRepository.save(review);
    }

    // update existing review
    public Review updateReview(int reviewId, ReviewDTO reviewDTO) {
        Optional<Review> optionalReview = reviewRepository.findById(reviewId);
        if (optionalReview.isPresent()) {
            Review review = optionalReview.get();
            review.setRating(reviewDTO.getRating());
            review.setComment(reviewDTO.getComment());
            return reviewRepository.save(review);
        } else {
            throw new IllegalArgumentException("Review not found");
        }
    }

    // delete review (by review id)
    public void deleteReview(int reviewId) {
        if (reviewRepository.existsById(reviewId)) {
            reviewRepository.deleteById(reviewId);
        } else {
            throw new IllegalArgumentException("Review not found");
        }
    }

    // get all reviews by a specific user
    public List<Review> getReviewsByUserId(int userId) {
        return reviewRepository.findByUserId(userId);
    }

    // get all reviews with specific rating
    public List<Review> getReviewsByRating(int rating) {
        return reviewRepository.findByRating(rating);
    }

}
