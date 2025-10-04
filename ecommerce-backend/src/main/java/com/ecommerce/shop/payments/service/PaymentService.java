package com.ecommerce.shop.payments.service;

import com.ecommerce.shop.orders.entity.Order;
import com.ecommerce.shop.orders.repository.OrderRepository;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {
    private final OrderRepository orderRepository;

    public PaymentService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public String initiatePayment(Long orderId) {
        System.out.println("DEBUG: Initiating payment for order: " + orderId);
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found"));
        System.out.println("DEBUG: Order found: " + order.getId() + ", status: " + order.getStatus());
        order.setStatus("PAID"); // mock success
        orderRepository.save(order);
        System.out.println("DEBUG: Payment processed successfully");
        return "PAYMENT_SUCCESS";
    }
}


