package com.ecommerce.shop.cart.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

/**
 * Request DTO for updating cart item quantity
 */
public class UpdateCartItemRequest {
    
    @NotNull(message = "Quantity is required")
    @Min(value = 1, message = "Quantity must be at least 1")
    private Integer quantity;
    
    // Default constructor
    public UpdateCartItemRequest() {}
    
    // Constructor with parameters
    public UpdateCartItemRequest(Integer quantity) {
        this.quantity = quantity;
    }
    
    // Getters and setters
    public Integer getQuantity() {
        return quantity;
    }
    
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
    
    @Override
    public String toString() {
        return "UpdateCartItemRequest{" +
                "quantity=" + quantity +
                '}';
    }
}
