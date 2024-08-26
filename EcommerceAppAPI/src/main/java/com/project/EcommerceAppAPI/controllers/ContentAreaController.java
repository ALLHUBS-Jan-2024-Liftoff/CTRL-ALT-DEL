package com.project.EcommerceAppAPI.controllers;

import com.project.EcommerceAppAPI.models.Product;
import com.project.EcommerceAppAPI.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/product")
public class ContentAreaController {

    @Autowired
    private ProductRepository productRepository;

    // Existing methods...

    // New endpoint to fetch 3 random products
    @GetMapping("/featured")
    public List<Product> getFeaturedProducts() {
        List<Product> allProducts = productRepository.findAll();
        Collections.shuffle(allProducts); // Shuffle the product list
        return allProducts.stream().limit(3).collect(Collectors.toList()); // Limit to 3
    }
}
