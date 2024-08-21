package com.project.EcommerceAppAPI.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;

@Entity
public class Product extends AbstractProducts{
    private double price;
    private String imagePath;

    @NotNull(message = "Category is required")
    @ManyToOne
    @JsonBackReference
    private ProductCategory productCategory;

    public Product(double price, String imagePath, ProductCategory productCategory) {
        this.price = price;
        this.imagePath = imagePath;
        this.productCategory = productCategory;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public Product() {
    }

    public double getPrice() {
        return price;
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
