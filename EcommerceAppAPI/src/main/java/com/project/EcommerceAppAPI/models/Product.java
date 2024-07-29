package com.project.EcommerceAppAPI.models;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;

@Entity
public class Product extends AbstractProducts{
    private int price;

    @NotNull(message = "Category is required")
    @ManyToOne
    private ProductCategory productCategory;

    public Product(int price, ProductCategory productCategory) {
        this.price = price;
        this.productCategory = productCategory;
    }

    public Product() {
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public ProductCategory getProductCategory() {
        return productCategory;
    }

    public void setProductCategory(ProductCategory productCategory) {
        this.productCategory = productCategory;
    }

//    @Override
//    public String toString() {
//        return "AllProducts{" +
////                "productCategory=" + productCategory +
//                '}';
//    }
}