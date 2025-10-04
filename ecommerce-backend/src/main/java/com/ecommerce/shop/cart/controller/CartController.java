package com.ecommerce.shop.cart.controller;

import com.ecommerce.shop.cart.dto.AddToCartRequest;
import com.ecommerce.shop.cart.dto.CartViewDto;
import com.ecommerce.shop.cart.dto.UpdateCartItemRequest;
import com.ecommerce.shop.cart.service.CartService;
import com.ecommerce.shop.common.dto.ApiResponse;
import com.ecommerce.shop.users.entity.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

/**
 * Cart endpoints for current user
 */
@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<CartViewDto>> getCart(@AuthenticationPrincipal User user) {
        CartViewDto cart = cartService.getCartForUser(user.getId());
        return ResponseEntity.ok(ApiResponse.success(cart));
    }

    @PostMapping("/items")
    public ResponseEntity<ApiResponse<CartViewDto>> addItem(@AuthenticationPrincipal User user,
                                                            @RequestBody AddToCartRequest request) {
        CartViewDto cart = cartService.addItem(user.getId(), request.getProductId(), request.getQuantity());
        return ResponseEntity.ok(ApiResponse.success(cart));
    }

    @PutMapping("/items/{itemId}")
    public ResponseEntity<ApiResponse<CartViewDto>> updateItem(@AuthenticationPrincipal User user,
                                                               @PathVariable Long itemId,
                                                               @RequestBody UpdateCartItemRequest request) {
        CartViewDto cart = cartService.updateQuantity(user.getId(), itemId, request.getQuantity());
        return ResponseEntity.ok(ApiResponse.success(cart));
    }

    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<ApiResponse<CartViewDto>> removeItem(@AuthenticationPrincipal User user,
                                                               @PathVariable Long itemId) {
        CartViewDto cart = cartService.removeItem(user.getId(), itemId);
        return ResponseEntity.ok(ApiResponse.success(cart));
    }
}


