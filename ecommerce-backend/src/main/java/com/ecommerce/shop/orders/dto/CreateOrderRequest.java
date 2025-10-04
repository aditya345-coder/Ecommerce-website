package com.ecommerce.shop.orders.dto;

import java.util.List;

public class CreateOrderRequest {
    private List<OrderItemRequest> items;
    private AddressDto shippingAddress;
    private AddressDto billingAddress;
    private String paymentMethod;

    // Default constructor
    public CreateOrderRequest() {}

    // Getters and setters
    public List<OrderItemRequest> getItems() {
        return items;
    }

    public void setItems(List<OrderItemRequest> items) {
        this.items = items;
    }

    public AddressDto getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(AddressDto shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public AddressDto getBillingAddress() {
        return billingAddress;
    }

    public void setBillingAddress(AddressDto billingAddress) {
        this.billingAddress = billingAddress;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
}
