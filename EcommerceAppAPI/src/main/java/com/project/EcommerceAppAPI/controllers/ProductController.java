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
            ProductDTO productDTO = convertToDto(product);
            productDTOs.add(productDTO);
        }
        return productDTOs;
    }

    @PutMapping("/{productID}")
    public ProductDTO fetchAProduct(@PathVariable int productID) {
        Optional<Product> optionalProduct = productRepository.findById(productID);
        if (optionalProduct.isPresent()){
            Product product = optionalProduct.orElse(null);
            return convertToDto(product);
        } else {
            return null;
        }
    }

    @PostMapping("/new")
    public ProductDTO createProduct(@RequestBody ProductDTO productDTO){
        Product product = convertToProduct(productDTO);
        Product savedProduct =  productRepository.save(product);
        ProductDTO savedProductDTO = convertToDto(savedProduct);
        return savedProductDTO;
    }

    @GetMapping("/search")
    public List<Product> searchProducts(@RequestParam("name") String name) {
        System.out.println("name "+ name);
        return productRepository.findByNameContainingIgnoreCase(name);
    }

    @PostMapping("/update")
    public ProductDTO updateProduct(@RequestBody ProductDTO productDTO){
        Optional<Product> optionalProduct = productRepository.findById(productDTO.getId());

        Product product = optionalProduct.orElse(null);
        if(product!=null) {
//            System.out.println("Existing Product Object");
//            System.out.println(product.toString());
            product.setName(productDTO.getName());
            product.setDescription(productDTO.getDescription());
            product.setPrice(productDTO.getPrice());
            Optional<ProductCategory> productCategoryOptional = productCategoryRepository.findById(productDTO.getCategoryId());
            ProductCategory productCategory = productCategoryOptional.orElse(null);
            product.setProductCategory(productCategory);
//            System.out.println("Modified Product Object");
//            System.out.println(product.toString());
            Product updatedProduct = productRepository.save(product);
            ProductDTO updatedDTO = convertToDto(updatedProduct);
            return updatedDTO;
        } else {
            return null;
        }
    }

    @DeleteMapping("/delete")
    public void deleteProduct(@RequestParam("productId") int productId) {
        productRepository.deleteById(productId);
    }

    private ProductDTO convertToDto(Product product){
        ProductDTO productDTO = new ProductDTO();
        productDTO.setId(product.getId());
        productDTO.setName(product.getName());
        productDTO.setDescription(product.getDescription());
        productDTO.setPrice(product.getPrice());
        productDTO.setCategoryId(product.getProductCategory().getId());
        return productDTO;
    }

    private Product convertToProduct(ProductDTO productDTO){
        Product product = new Product();

        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setPrice(productDTO.getPrice());
        Optional<ProductCategory> productCategoryOptional = productCategoryRepository.findById(productDTO.getCategoryId());
        ProductCategory productCategory = productCategoryOptional.orElse(null);
        product.setProductCategory(productCategory);
        return product;
    }
}