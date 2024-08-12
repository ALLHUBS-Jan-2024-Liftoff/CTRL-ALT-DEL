package com.project.EcommerceAppAPI.models;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.ArrayList;
import java.util.List;

@Entity
public class ProductCategory extends AbstractProducts{
    @OneToMany(mappedBy = "productCategory")
    @JsonBackReference
    private List<Product> products = new ArrayList<>();

    public ProductCategory(List<Product> products) {
        this.products = products;
    }

    public ProductCategory() {
    }

//    public ProductCategory(int id, String name, String description) {
//        this.setId(id);
//        this.setName(name);
//        this.setDescription(description);
//    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }

}
