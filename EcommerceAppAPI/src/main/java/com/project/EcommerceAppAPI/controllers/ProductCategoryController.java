package com.project.EcommerceAppAPI.controllers;

import com.project.EcommerceAppAPI.models.ProductCategory;
import com.project.EcommerceAppAPI.repositories.ProductCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productCategory")
public class ProductCategoryController {
    @Autowired
    public ProductCategoryRepository productCategoryRepository;

    @GetMapping
    public List<ProductCategory> getAllProductCategory(){
        return productCategoryRepository.findAll();
    }

    @PostMapping("/new")
    public ProductCategory createCategory(@RequestBody ProductCategory productCategory){
        return productCategoryRepository.save(productCategory);
    }

}
