package com.project.EcommerceAppAPI.repositories;


import com.project.EcommerceAppAPI.models.EcommerceModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EcommerceRepository extends JpaRepository<EcommerceModel, Long> {
}
