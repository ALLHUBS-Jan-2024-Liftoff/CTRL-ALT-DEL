package com.project.EcommerceAppAPI.repositories;

import com.project.EcommerceAppAPI.models.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {
    User findByUsername(String username);
}
