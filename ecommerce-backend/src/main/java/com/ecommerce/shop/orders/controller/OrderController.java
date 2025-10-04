package com.ecommerce.shop.orders.controller;

import com.ecommerce.shop.common.dto.ApiResponse;
import com.ecommerce.shop.orders.dto.CreateOrderRequest;
import com.ecommerce.shop.orders.entity.Order;
import com.ecommerce.shop.orders.service.OrderService;
import com.ecommerce.shop.users.entity.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Order>>> getUserOrders(@AuthenticationPrincipal User user) {
        List<Order> orders = orderService.getOrdersByUserId(user.getId());
        return ResponseEntity.ok(ApiResponse.success("Orders retrieved", orders));
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<ApiResponse<Order>> getOrderById(@AuthenticationPrincipal User user, @PathVariable Long orderId) {
        Order order = orderService.getOrderByIdAndUserId(orderId, user.getId());
        return ResponseEntity.ok(ApiResponse.success("Order retrieved", order));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Order>> createOrder(@AuthenticationPrincipal User user, @RequestBody CreateOrderRequest request) {
        System.out.println("DEBUG: OrderController - Creating order for user: " + user.getId());
        Order order = orderService.createOrderFromRequest(user.getId(), request);
        System.out.println("DEBUG: OrderController - Order created with ID: " + order.getId());
        ApiResponse<Order> response = ApiResponse.success("Order created", order);
        System.out.println("DEBUG: OrderController - Sending response: " + response);
        return ResponseEntity.ok(response);
    }
}


