package com.ecommerce.shop.products.service;

import com.ecommerce.shop.products.entity.Category;
import com.ecommerce.shop.products.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service class for category operations
 * Handles business logic for category management
 */
@Service
public class CategoryService {
    
    @Autowired
    private CategoryRepository categoryRepository;
    
    /**
     * Get all categories
     * @return list of all categories sorted by name
     */
    public List<Category> getAllCategories() {
        return categoryRepository.findAllByOrderByNameAsc();
    }
    
    /**
     * Get category by ID
     * @param id category ID
     * @return category entity
     */
    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id).orElse(null);
    }
}
