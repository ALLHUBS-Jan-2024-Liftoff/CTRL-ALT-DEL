package com.project.EcommerceAppAPI.repositories;
import com.project.EcommerceAppAPI.models.ProductCategory;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductCtegory extends CrudRepository<ProductCtegory,Integer> {
}
