package com.project.EcommerceAppAPI.repositories;

import com.project.EcommerceAppAPI.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {
    List<Product> findByNameContainingIgnoreCase(String name);

    // Method to find products by category ID
    List<Product> findByProductCategoryId(Long categoryId);
}