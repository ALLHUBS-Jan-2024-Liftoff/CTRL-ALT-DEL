package com.project.EcommerceAppAPI.Services;

import com.project.EcommerceAppAPI.models.Product;
import com.project.EcommerceAppAPI.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    /**
     * Retrieve all products from the database.
     * @return List of all products.
     */
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    /**
     * Retrieve a product by its ID.
     * @param id The ID of the product.
     * @return An Optional containing the product if found, or empty if not.
     */
    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    /**
     * Save a new or updated product to the database.
     * @param product The product to save.
     * @return The saved product.
     */
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    /**
     * Delete a product by its ID.
     * @param id The ID of the product to delete.
     */
    public void deleteProductById(Long id) {
        productRepository.deleteById(id);
    }

    /**
     * Search for products by name.
     * @param name The name or partial name to search for.
     * @return A list of products matching the search criteria.
     */
    public List<Product> searchProductsByName(String name) {
        return productRepository.findByNameContainingIgnoreCase(name);
    }
}
