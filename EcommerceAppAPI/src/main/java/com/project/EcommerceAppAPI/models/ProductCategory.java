package com.project.EcommerceAppAPI.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;

import java.util.ArrayList;
import java.util.List;

@Entity
public class ProductCategory extends AbstractProducts{
    @OneToMany(mappedBy = "productCategory")
    @JsonManagedReference
    private List<Product> products = new ArrayList<>();

    public ProductCategory(List<Product> products) {
        this.products = products;
    }
    public ProductCategory() {
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }
}
