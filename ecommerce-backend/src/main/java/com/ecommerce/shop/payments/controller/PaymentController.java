package com.ecommerce.shop.payments.controller;

import com.ecommerce.shop.common.dto.ApiResponse;
import com.ecommerce.shop.payments.service.PaymentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/initiate")
    public ResponseEntity<ApiResponse<String>> initiate(@RequestParam Long orderId) {
        String status = paymentService.initiatePayment(orderId);
        return ResponseEntity.ok(ApiResponse.success("Payment processed", status));
    }
}


