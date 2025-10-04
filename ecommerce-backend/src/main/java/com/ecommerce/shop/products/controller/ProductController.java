package com.ecommerce.shop.products.controller;

import com.ecommerce.shop.common.dto.ApiResponse;
import com.ecommerce.shop.products.dto.ProductDto;
import com.ecommerce.shop.products.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

/**
 * REST controller for product endpoints
 * Handles product-related HTTP requests
 */
@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {
    
    @Autowired
    private ProductService productService;
    
    /**
     * Get all products with pagination and sorting
     * @param page page number (default: 0)
     * @param size page size (default: 10)
     * @param sortBy field to sort by (default: name)
     * @param sortDir sort direction (default: asc)
     * @return page of products
     */
    @GetMapping
    public ResponseEntity<ApiResponse<Page<ProductDto>>> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "name") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {
        
        Page<ProductDto> products = productService.getAllProducts(page, size, sortBy, sortDir);
        return ResponseEntity.ok(ApiResponse.success(products));
    }
    
    /**
     * Get product by ID
     * @param id product ID
     * @return product details
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductDto>> getProductById(@PathVariable Long id) {
        try {
            ProductDto product = productService.getProductById(id);
            return ResponseEntity.ok(ApiResponse.success(product));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * Search products with filters
     * @param name search term
     * @param categoryId category filter
     * @param minPrice minimum price
     * @param maxPrice maximum price
     * @param page page number
     * @param size page size
     * @param sortBy sort field
     * @param sortDir sort direction
     * @return filtered products
     */
    @GetMapping("/search")
    public ResponseEntity<ApiResponse<Page<ProductDto>>> searchProducts(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "name") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {
        
        Page<ProductDto> products = productService.searchProducts(
                name, categoryId, minPrice, maxPrice, page, size, sortBy, sortDir);
        return ResponseEntity.ok(ApiResponse.success(products));
    }
    
    /**
     * Get products by category
     * @param categoryId category ID
     * @param page page number
     * @param size page size
     * @return products in category
     */
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<ApiResponse<Page<ProductDto>>> getProductsByCategory(
            @PathVariable Long categoryId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Page<ProductDto> products = productService.getProductsByCategory(categoryId, page, size);
        return ResponseEntity.ok(ApiResponse.success(products));
    }
}
