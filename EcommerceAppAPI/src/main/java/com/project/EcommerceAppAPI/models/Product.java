package com.project.EcommerceAppAPI.models;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;

@Entity
public class Product extends AbstractProducts{

    @NotNull(message = "Category is required")
    @ManyToOne
    private ProductCategory productCategory;

    public Product(ProductCategory productCategory) {
        this.productCategory = productCategory;
    }

    public Product() {
    }

    public ProductCategory getProductCategory() {
        return productCategory;
    }

    public void setProductCategory(ProductCategory productCategory) {
        this.productCategory = productCategory;
    }

    @Override
    public String toString() {
        return "AllProducts{" +
                "productCategory=" + productCategory +
                '}';
    }
}
