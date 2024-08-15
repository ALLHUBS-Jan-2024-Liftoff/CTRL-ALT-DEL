package com.project.EcommerceAppAPI.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import com.project.EcommerceAppAPI.models.ProductCategory;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductCategoryRepository extends JpaRepository<ProductCategory,Long> {
}
