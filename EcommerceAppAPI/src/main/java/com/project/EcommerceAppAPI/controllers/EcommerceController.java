package com.project.EcommerceAppAPI.controllers;


import com.project.EcommerceAppAPI.repositories.EcommerceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ecommerce")
public class EcommerceController {

    @Autowired
    private EcommerceRepository ecommerceRepository;


}
