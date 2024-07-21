package com.project.EcommerceAppAPI.controllers;

import com.project.EcommerceAppAPI.repositories.ProductRepository;
import com.project.EcommerceAppAPI.repositories.ProductCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("products")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductCategoryRepository productCategoryRepository;



}
