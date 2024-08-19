//package com.project.EcommerceAppAPI.controllers;
//import com.project.EcommerceAppAPI.Services.ProductService;
//import com.project.EcommerceAppAPI.models.Product;
//import com.project.EcommerceAppAPI.repositories.ProductRepository;
//import com.project.EcommerceAppAPI.models.ProductCategory;
//import com.project.EcommerceAppAPI.models.dto.ProductDTO;
//import com.project.EcommerceAppAPI.repositories.ProductCategoryRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Optional;
//import java.util.stream.Collectors;
//
//@RestController
//@RequestMapping("/api/product")
//public class ProductController {
//
//    @Autowired
//    private ProductService productService;
//
//    @GetMapping
//    public List<ProductDTO> getAllProducts() {
//        List<Product> products = productService.getAllProducts();
//        return products.stream().map(this::convertToDto).collect(Collectors.toList());
//    }
//
//    @GetMapping("/{id}")
//    public ProductDTO getProductById(@PathVariable Long id) {
//        Product product = productService.getProductById(id);
//        if (product != null) {
//            return convertToDto(product);
//        } else {
//            return null;
//        }
//    }
//
//    private ProductDTO convertToDto(Product product) {
//        ProductDTO productDTO = new ProductDTO();
//        productDTO.setId(product.getId());
//        productDTO.setName(product.getName());
//        productDTO.setDescription(product.getDescription());
//        productDTO.setPrice(product.getPrice());
//        productDTO.setImagePath(product.getImagePath());
//        return productDTO;
//    }
//}
//    @Autowired
//    private ProductRepository productRepository;
//    @Autowired
//    private ProductCategoryRepository productCategoryRepository;

//    @GetMapping
//    public List<ProductDTO> getAllProduct(){
//        List<Product> products = productRepository.findAll();
//        List<ProductDTO> productDTOs = new ArrayList<>();
//        for(Product product : products) {
//            ProductDTO productDTO = new ProductDTO();
//            productDTO.setId(product.getId());
//            productDTO.setName(product.getName());
//            productDTO.setDescription(product.getDescription());
//            productDTO.setPrice(product.getPrice());
//            productDTO.setCategoryId(product.getProductCategory().getId());
//            productDTOs.add(productDTO);
//        }
//        return productDTOs;
//    }
//
//    @PutMapping("/{productID}")
//    public ProductDTO fetchAProduct(@PathVariable Long productID) {
//        Optional<Product> optionalProduct = productRepository.findById(productID);
//        if (optionalProduct.isPresent()){
//            Product product = optionalProduct.orElse(null);
//            return convertToDto(product);
//        } else {
//            return null;
//        }
//    }
//
//    @PostMapping("/new")
//    public ProductDTO createProduct(@RequestBody ProductDTO productDTO){
//        Product product = convertToProduct(productDTO);
//        Product savedProduct =  productRepository.save(product);
//        return convertToDto(savedProduct);
//    }
//
//    @GetMapping("/search")
//    public List<ProductDTO> searchProducts(@RequestParam("name") String name) {
//       List<Product> products = productRepository.findByNameContainingIgnoreCase(name);
//        List<ProductDTO> productDTOs = new ArrayList<>();
//        for(Product product : products) {
//            ProductDTO productDTO = new ProductDTO();
//            productDTO.setId(product.getId());
//            productDTO.setName(product.getName());
//            productDTO.setDescription(product.getDescription());
//            productDTO.setPrice(product.getPrice());
//            productDTO.setCategoryId(product.getProductCategory().getId());
//            System.out.println(productDTO);
//            productDTOs.add(productDTO);
//        }
//        return productDTOs;
//    }
//
//    @PostMapping("/update")
//    public ProductDTO updateProduct(@RequestBody ProductDTO productDTO){
//        Optional<Product> optionalProduct = productRepository.findById(productDTO.getId());
//
//        Product product = optionalProduct.orElse(null);
//        if(product!=null) {
//            product.setName(productDTO.getName());
//            product.setDescription(productDTO.getDescription());
//            product.setPrice(productDTO.getPrice());
//            Optional<ProductCategory> productCategoryOptional = productCategoryRepository.findById(productDTO.getCategoryId());
//            ProductCategory productCategory = productCategoryOptional.orElse(null);
//            product.setProductCategory(productCategory);
//            Product updatedProduct = productRepository.save(product);
//            ProductDTO updatedDTO = convertToDto(updatedProduct);
//            return updatedDTO;
//        } else {
//            return null;
//        }
//    }
//
//    @DeleteMapping("/delete")
//    public void deleteProduct(@RequestParam("productId") Long productId) {
//        productRepository.deleteById(productId);
//    }
//
//    private ProductDTO convertToDto(Product product) {
//        ProductDTO productDTO = new ProductDTO();
//        productDTO.setId(product.getId());
//        productDTO.setName(product.getName());
//        productDTO.setDescription(product.getDescription());
//        productDTO.setPrice(product.getPrice());
//        productDTO.setImagePath(product.getImagePath());
//        return productDTO;
//    }
//
//    private Product convertToProduct(ProductDTO productDTO){
//        Product product = new Product();
//        product.setName(productDTO.getName());
//        product.setDescription(productDTO.getDescription());
//        product.setPrice(productDTO.getPrice());
//        Optional<ProductCategory> productCategoryOptional = productCategoryRepository.findById(productDTO.getCategoryId());
//        ProductCategory productCategory = productCategoryOptional.orElse(null);
//        product.setProductCategory(productCategory);
//        return product;
//    }
//
//}
package com.project.EcommerceAppAPI.controllers;

import com.project.EcommerceAppAPI.Services.ProductService;
import com.project.EcommerceAppAPI.models.Product;
import com.project.EcommerceAppAPI.models.ProductCategory;
import com.project.EcommerceAppAPI.models.dto.ProductDTO;
import com.project.EcommerceAppAPI.repositories.ProductCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private ProductCategoryRepository productCategoryRepository;

    @GetMapping
    public List<ProductDTO> getAllProducts() {
        return productService.getAllProducts()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ProductDTO getProductById(@PathVariable Long id) {
        return productService.getProductById(id)
                .map(this::convertToDto)
                .orElse(null);  // Consider returning ResponseEntity with 404 if not found
    }

    @PostMapping("/new")
    public ProductDTO createProduct(@RequestBody ProductDTO productDTO) {
        Product product = convertToProduct(productDTO);
        return convertToDto(productService.saveProduct(product));
    }

    @PostMapping("/update")
    public ProductDTO updateProduct(@RequestBody ProductDTO productDTO) {
        Optional<Product> optionalProduct = productService.getProductById(productDTO.getId());
        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            product.setName(productDTO.getName());
            product.setDescription(productDTO.getDescription());
            product.setPrice(productDTO.getPrice());
            Optional<ProductCategory> productCategoryOptional = productCategoryRepository.findById(productDTO.getCategoryId());
            productCategoryOptional.ifPresent(product::setProductCategory);
            return convertToDto(productService.saveProduct(product));
        } else {
            return null;  // Consider returning ResponseEntity with 404 if not found
        }
    }

    @DeleteMapping("/delete")
    public void deleteProduct(@RequestParam("productId") Long productId) {
        productService.deleteProductById(productId);
    }

    @GetMapping("/search")
    public List<ProductDTO> searchProducts(@RequestParam("name") String name) {
        return productService.searchProductsByName(name)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private ProductDTO convertToDto(Product product) {
        ProductDTO productDTO = new ProductDTO();
        productDTO.setId(product.getId());
        productDTO.setName(product.getName());
        productDTO.setDescription(product.getDescription());
        productDTO.setPrice(product.getPrice());
        productDTO.setCategoryId(product.getProductCategory().getId());
        productDTO.setImagePath(product.getImagePath());
        return productDTO;
    }

    private Product convertToProduct(ProductDTO productDTO) {
        Product product = new Product();
        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setPrice(productDTO.getPrice());
        Optional<ProductCategory> productCategoryOptional = productCategoryRepository.findById(productDTO.getCategoryId());
        productCategoryOptional.ifPresent(product::setProductCategory);
        product.setImagePath(productDTO.getImagePath());
        return product;
    }
}
