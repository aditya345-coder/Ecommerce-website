package com.ecommerce.shop.orders.service;

import com.ecommerce.shop.cart.entity.Cart;
import com.ecommerce.shop.cart.entity.CartItem;
import com.ecommerce.shop.cart.repository.CartRepository;
import com.ecommerce.shop.orders.dto.CreateOrderRequest;
import com.ecommerce.shop.orders.entity.Order;
import com.ecommerce.shop.orders.entity.OrderItem;
import com.ecommerce.shop.orders.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;

    public OrderService(OrderRepository orderRepository, CartRepository cartRepository) {
        this.orderRepository = orderRepository;
        this.cartRepository = cartRepository;
    }

    public Order createOrderFromCart(Long userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("Cart not found"));

        Order order = new Order();
        order.setUserId(userId);
        order.setStatus("PENDING");

        // Map items
        order.setItems(cart.getItems().stream().map(ci -> {
            OrderItem oi = new OrderItem();
            oi.setOrder(order);
            oi.setProductId(ci.getProduct().getId());
            oi.setQuantity(ci.getQuantity());
            oi.setUnitPrice(ci.getUnitPrice());
            return oi;
        }).collect(Collectors.toList()));

        BigDecimal total = order.getItems().stream()
                .map(oi -> oi.getUnitPrice().multiply(BigDecimal.valueOf(oi.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        order.setTotalAmount(total);

        Order saved = orderRepository.save(order);

        // Clear cart after order creation
        cart.getItems().clear();
        cartRepository.save(cart);
        return saved;
    }

    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public Order getOrderByIdAndUserId(Long orderId, Long userId) {
        return orderRepository.findByIdAndUserId(orderId, userId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found"));
    }

    public Order createOrderFromRequest(Long userId, CreateOrderRequest request) {
        System.out.println("DEBUG: Creating order for user: " + userId);
        System.out.println("DEBUG: Request items count: " + request.getItems().size());
        
        Order order = new Order();
        order.setUserId(userId);
        order.setStatus("PENDING");
        order.setPaymentMethod(request.getPaymentMethod());
        
        // Convert address DTOs to JSON strings for storage
        try {
            if (request.getShippingAddress() != null) {
                order.setShippingAddress(convertAddressToJson(request.getShippingAddress()));
            }
            if (request.getBillingAddress() != null) {
                order.setBillingAddress(convertAddressToJson(request.getBillingAddress()));
            }
        } catch (Exception e) {
            System.out.println("WARNING: Failed to convert addresses to JSON: " + e.getMessage());
        }

        // Map items from request
        order.setItems(request.getItems().stream().map(itemRequest -> {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProductId(itemRequest.getProductId());
            orderItem.setQuantity(itemRequest.getQuantity());
            orderItem.setUnitPrice(itemRequest.getUnitPrice());
            return orderItem;
        }).collect(Collectors.toList()));

        // Calculate total
        BigDecimal total = order.getItems().stream()
                .map(oi -> oi.getUnitPrice().multiply(BigDecimal.valueOf(oi.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        order.setTotalAmount(total);
        
        System.out.println("DEBUG: Order total: " + total);

        // Save order
        Order saved = orderRepository.save(order);
        System.out.println("DEBUG: Order saved with ID: " + saved.getId());

        // Clear cart after order creation
        Cart cart = cartRepository.findByUserId(userId).orElse(null);
        if (cart != null) {
            System.out.println("DEBUG: Clearing cart for user: " + userId);
            cart.getItems().clear();
            cartRepository.save(cart);
        }

        return saved;
    }
    
    private String convertAddressToJson(com.ecommerce.shop.orders.dto.AddressDto address) {
        return String.format("{\"street\":\"%s\",\"city\":\"%s\",\"state\":\"%s\",\"zipCode\":\"%s\",\"country\":\"%s\"}",
                address.getStreet(), address.getCity(), address.getState(), 
                address.getZipCode(), address.getCountry());
    }
}


