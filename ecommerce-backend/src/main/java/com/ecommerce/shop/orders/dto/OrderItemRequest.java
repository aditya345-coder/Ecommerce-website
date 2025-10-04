package com.ecommerce.shop.orders.dto;

import java.math.BigDecimal;

public class OrderItemRequest {
    private Long productId;
    private Integer quantity;
    private BigDecimal unitPrice;

    // Default constructor
    public OrderItemRequest() {}

    // Getters and setters
    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }
}
