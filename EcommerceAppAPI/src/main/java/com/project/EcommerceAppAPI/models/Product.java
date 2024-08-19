package com.project.EcommerceAppAPI.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;

@Entity
public class Product extends AbstractProducts{
    private double price;

    @NotNull(message = "Category is required")
    @ManyToOne
    @JsonManagedReference
    private ProductCategory productCategory;

    @Column(name = "image_path", nullable = false)  // Maps to image_path in the database
    private String imagePath;

    public Product(int price, ProductCategory productCategory) {
        this.price = price;
        this.productCategory = productCategory;
    }

    public Product() {
    }

    public double getPrice() {
        return price;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public ProductCategory getProductCategory() {
        return productCategory;
    }

    public void setProductCategory(ProductCategory productCategory) {
        this.productCategory = productCategory;
    }

    @Override
    public String toString() {
        return "{" +
                "name=" + this.getName() +
                "price=" + this.getPrice() +
                '}';
    }

}
