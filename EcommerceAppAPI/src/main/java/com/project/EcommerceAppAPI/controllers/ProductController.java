package com.project.EcommerceAppAPI.controllers;

import com.project.EcommerceAppAPI.models.Product;
import com.project.EcommerceAppAPI.repositories.ProductRepository;
import com.project.EcommerceAppAPI.repositories.ProductCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/product")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductCategoryRepository productCategoryRepository;

    @GetMapping
    public List<Product> getAllProduct(){
        return productRepository.findAll();
    }

    @PostMapping("/new")
    public Product createProduct(@RequestBody Product product){
        return productRepository.save(product);
    }
}
