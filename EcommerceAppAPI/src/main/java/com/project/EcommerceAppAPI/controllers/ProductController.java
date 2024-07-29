package com.project.EcommerceAppAPI.controllers;

import com.project.EcommerceAppAPI.models.Product;
import com.project.EcommerceAppAPI.repositories.ProductRepository;
import com.project.EcommerceAppAPI.models.ProductCategory;
import com.project.EcommerceAppAPI.models.dto.ProductDTO;
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
    public List<ProductDTO> getAllProduct(){
        List<Product> products = productRepository.findAll();
        List<ProductDTO> productDTOs = new ArrayList<>();
        for(Product product : products) {
            ProductDTO productDTO = new ProductDTO();
            productDTO.setName(product.getName());
            productDTO.setDescription(product.getDescription());
            productDTO.setPrice(product.getPrice());
            productDTO.setCategoryId(product.getProductCategory().getId());
            productDTOs.add(productDTO);
        }
        return productDTOs;
    }

    @PostMapping("/new")
    public ProductDTO createProduct(@RequestBody ProductDTO productDTO){
        Product product = new Product();
        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setPrice(productDTO.getPrice());
        Optional<ProductCategory> productCategoryOptional = productCategoryRepository.findById(productDTO.getCategoryId());
        ProductCategory productCategory = productCategoryOptional.get();
        product.setProductCategory(productCategory);

        Product savedProduct =  productRepository.save(product);
        ProductDTO savedProductDTO = new ProductDTO();
        savedProductDTO.setName(savedProduct.getName());
        savedProductDTO.setDescription(savedProduct.getDescription());
        savedProductDTO.setPrice(savedProduct.getPrice());
        savedProductDTO.setCategoryId(savedProduct.getProductCategory().getId());
        return savedProductDTO;
    }
}
