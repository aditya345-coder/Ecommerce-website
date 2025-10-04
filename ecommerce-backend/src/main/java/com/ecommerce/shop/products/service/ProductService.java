package com.ecommerce.shop.products.service;

import com.ecommerce.shop.products.dto.ProductDto;
import com.ecommerce.shop.products.entity.Category;
import com.ecommerce.shop.products.entity.Product;
import com.ecommerce.shop.products.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service class for product operations
 * Handles business logic for product management
 */
@Service
public class ProductService {
    
    @Autowired
    private ProductRepository productRepository;
    
    /**
     * Get all products with pagination
     * @param page page number (0-based)
     * @param size page size
     * @param sortBy field to sort by
     * @param sortDir sort direction (asc/desc)
     * @return page of products
     */
    public Page<ProductDto> getAllProducts(int page, int size, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase("desc") ? 
                   Sort.by(sortBy).descending() : 
                   Sort.by(sortBy).ascending();
        
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Product> products = productRepository.findAll(pageable);
        
        return products.map(this::convertToDto);
    }
    
    /**
     * Get product by ID
     * @param id product ID
     * @return product DTO
     */
    public ProductDto getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        return convertToDto(product);
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
     * @return page of filtered products
     */
    public Page<ProductDto> searchProducts(String name, Long categoryId, 
                                         BigDecimal minPrice, BigDecimal maxPrice,
                                         int page, int size, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase("desc") ? 
                   Sort.by(sortBy).descending() : 
                   Sort.by(sortBy).ascending();
        
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Product> products = productRepository.findProductsWithFilters(
                name, categoryId, minPrice, maxPrice, pageable);
        
        return products.map(this::convertToDto);
    }
    
    /**
     * Get products by category
     * @param categoryId category ID
     * @param page page number
     * @param size page size
     * @return page of products
     */
    public Page<ProductDto> getProductsByCategory(Long categoryId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> products = productRepository.findByCategoryId(categoryId, pageable);
        return products.map(this::convertToDto);
    }
    
    /**
     * Convert Product entity to ProductDto
     * @param product the product entity
     * @return product DTO
     */
    private ProductDto convertToDto(Product product) {
        ProductDto dto = new ProductDto();
        dto.setId(product.getId());
        dto.setSku(product.getSku());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        dto.setStock(product.getStock());
        dto.setImageUrl(product.getImageUrl());
        
        if (product.getCategory() != null) {
            dto.setCategoryId(product.getCategory().getId());
            dto.setCategoryName(product.getCategory().getName());
        }
        
        return dto;
    }
}
