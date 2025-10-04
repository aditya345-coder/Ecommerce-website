package com.ecommerce.shop.products.repository;

import com.ecommerce.shop.products.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;

/**
 * Repository interface for Product entity
 * Provides CRUD operations and custom query methods
 */
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    
    /**
     * Find products by category
     * @param categoryId the category ID
     * @param pageable pagination information
     * @return page of products
     */
    Page<Product> findByCategoryId(Long categoryId, Pageable pageable);
    
    /**
     * Search products by name containing the search term
     * @param name the search term
     * @param pageable pagination information
     * @return page of products
     */
    Page<Product> findByNameContainingIgnoreCase(String name, Pageable pageable);
    
    /**
     * Find products within price range
     * @param minPrice minimum price
     * @param maxPrice maximum price
     * @param pageable pagination information
     * @return page of products
     */
    Page<Product> findByPriceBetween(BigDecimal minPrice, BigDecimal maxPrice, Pageable pageable);
    
    /**
     * Find products that are in stock
     * @param pageable pagination information
     * @return page of products
     */
    Page<Product> findByStockGreaterThan(Integer stock, Pageable pageable);
    
    /**
     * Complex search with multiple criteria
     * @param name search term for name
     * @param categoryId category filter
     * @param minPrice minimum price
     * @param maxPrice maximum price
     * @param pageable pagination information
     * @return page of products
     */
    @Query("SELECT p FROM Product p WHERE " +
           "(:name IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%'))) AND " +
           "(:categoryId IS NULL OR p.category.id = :categoryId) AND " +
           "(:minPrice IS NULL OR p.price >= :minPrice) AND " +
           "(:maxPrice IS NULL OR p.price <= :maxPrice)")
    Page<Product> findProductsWithFilters(@Param("name") String name,
                                        @Param("categoryId") Long categoryId,
                                        @Param("minPrice") BigDecimal minPrice,
                                        @Param("maxPrice") BigDecimal maxPrice,
                                        Pageable pageable);
}
