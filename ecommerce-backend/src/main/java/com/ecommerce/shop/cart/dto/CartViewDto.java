package com.ecommerce.shop.cart.dto;

import java.math.BigDecimal;
import java.util.List;

public class CartViewDto {
    private Long cartId;
    private List<CartItemDto> items;
    private BigDecimal total;

    public Long getCartId() { return cartId; }
    public void setCartId(Long cartId) { this.cartId = cartId; }
    public List<CartItemDto> getItems() { return items; }
    public void setItems(List<CartItemDto> items) { this.items = items; }
    public BigDecimal getTotal() { return total; }
    public void setTotal(BigDecimal total) { this.total = total; }
}


