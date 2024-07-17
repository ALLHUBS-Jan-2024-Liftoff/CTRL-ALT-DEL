package com.project.EcommerceAppAPI.models;

import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotNull;

@Entity
public class AllProducts extends AbstractProducts{

    @NotNull(message = "Category is required")
    private ProductCategory productCategory;

    public AllProducts(ProductCategory productCategory) {
        this.productCategory = productCategory;
    }

    public AllProducts() {
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
