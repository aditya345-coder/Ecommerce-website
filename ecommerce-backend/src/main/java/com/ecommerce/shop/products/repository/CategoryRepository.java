package com.ecommerce.shop.products.repository;

import com.ecommerce.shop.products.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for Category entity
 * Provides CRUD operations and custom query methods
 */
@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    
    /**
     * Find all categories ordered by name ascending
     * @return list of categories sorted by name
     */
    List<Category> findAllByOrderByNameAsc();
}
