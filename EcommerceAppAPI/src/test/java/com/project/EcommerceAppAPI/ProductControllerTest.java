package com.project.EcommerceAppAPI.controllers;

import com.project.EcommerceAppAPI.models.Product;
import com.project.EcommerceAppAPI.repositories.ProductRepository;
import com.project.EcommerceAppAPI.models.dto.ProductDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

@SpringBootTest
@AutoConfigureMockMvc
public class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ProductRepository productRepository;

    @Test
    public void testGetAllProducts() throws Exception {
        mockMvc.perform(get("/api/product"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    public void testCreateProduct() throws Exception {
        String newProductJson = "{\"name\": \"Test Product\", \"description\": \"This is a test product.\", \"price\": 19.99, \"categoryId\": 1}";

        MvcResult result = mockMvc.perform(post("/api/product/new")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(newProductJson))
                .andDo(print())
                .andExpect(status().isOk())
                .andReturn();

        String response = result.getResponse().getContentAsString();
        System.out.println("Response: " + response);
    }
}
