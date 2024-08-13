package com.project.EcommerceAppAPI.controllers;

import com.project.EcommerceAppAPI.models.ProductCategory;
import com.project.EcommerceAppAPI.repositories.ProductCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/productCategory")
public class ProductCategoryController {
    @Autowired
    public ProductCategoryRepository productCategoryRepository;

    @GetMapping
    public List<ProductCategory> getAllProductCategory(){
        return productCategoryRepository.findAll();
    }

    @PostMapping("/new")
    public ProductCategory createCategory(@RequestBody ProductCategory productCategory){
        return productCategoryRepository.save(productCategory);
    }

    @PutMapping("/{categoryID}")
    public ProductCategory fetchCategory(@PathVariable int categoryID) {
        Optional<ProductCategory> optionalCategory = productCategoryRepository.findById(categoryID);
        if (optionalCategory.isPresent()){
            return optionalCategory.orElse(null);
        } else {
            return null;
        }
    }

    @PostMapping("/delete")
    public void deleteCategory (@RequestParam int categoryId) {
        productCategoryRepository.deleteById(categoryId);
    }


    @PostMapping("/update")
    public ProductCategory updateProductCategory(@RequestBody ProductCategory productCategory){
        Optional<ProductCategory> optionalCategory = productCategoryRepository.findById(productCategory.getId());

        ProductCategory productCategoryDb = optionalCategory.orElse(null);
        if(productCategoryDb!=null) {
            productCategoryDb.setName(productCategory.getName());
            productCategoryDb.setDescription(productCategory.getDescription());
            return productCategoryRepository.save(productCategoryDb);
        } else {
            return null;
        }
    }


}
