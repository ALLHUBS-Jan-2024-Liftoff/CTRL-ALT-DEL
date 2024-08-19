package com.project.EcommerceAppAPI.repositories;

import com.project.EcommerceAppAPI.models.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {
    List<Review> findByProductId(long productId);

    List<Review> findByUserId(int userId);

    List<Review> findByRating(int rating);
}
