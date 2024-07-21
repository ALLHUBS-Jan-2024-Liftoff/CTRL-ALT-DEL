package com.project.EcommerceAppAPI.models;


import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
public class ProductCategory extends AbstractProducts{

    @NotBlank
    @Size(min=3,max=25, message="Category Name must be 3-25 characters long")
    private String category;

    public ProductCategory(String category) {
        this.category = category;
    }

    public ProductCategory() {
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }


}
