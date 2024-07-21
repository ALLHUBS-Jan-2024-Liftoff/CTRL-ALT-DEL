package com.project.EcommerceAppAPI.repositories;
import org.springframework.data.repository.CrudRepository;
import com.project.EcommerceAppAPI.models.ProductCategory;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductCategoryRepository extends CrudRepository<ProductCategory,Integer> {
}
