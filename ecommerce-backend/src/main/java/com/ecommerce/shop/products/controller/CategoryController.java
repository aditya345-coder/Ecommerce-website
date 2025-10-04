package com.ecommerce.shop.products.controller;

import com.ecommerce.shop.common.dto.ApiResponse;
import com.ecommerce.shop.products.entity.Category;
import com.ecommerce.shop.products.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for category endpoints
 * Handles category-related HTTP requests
 */
@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "*")
public class CategoryController {
    
    @Autowired
    private CategoryService categoryService;
    
    /**
     * Get all categories
     * @return list of all categories
     */
    @GetMapping
    public ResponseEntity<ApiResponse<List<Category>>> getAllCategories() {
        List<Category> categories = categoryService.getAllCategories();
        return ResponseEntity.ok(ApiResponse.success(categories));
    }
    
    /**
     * Get category by ID
     * @param id category ID
     * @return category details
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Category>> getCategoryById(@PathVariable Long id) {
        Category category = categoryService.getCategoryById(id);
        if (category != null) {
            return ResponseEntity.ok(ApiResponse.success(category));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
