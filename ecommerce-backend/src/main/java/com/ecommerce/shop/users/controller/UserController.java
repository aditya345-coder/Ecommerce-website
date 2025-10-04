package com.ecommerce.shop.users.controller;

import com.ecommerce.shop.common.dto.ApiResponse;
import com.ecommerce.shop.users.entity.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * User endpoints
 */
@RestController
@RequestMapping("/api/users")
public class UserController {

    /**
     * Returns current authenticated user profile
     */
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<User>> me(@AuthenticationPrincipal User currentUser) {
        if (currentUser == null) {
            return ResponseEntity.status(401).body(ApiResponse.error("Unauthorized"));
        }
        // Avoid returning password hash
        User safe = new User();
        safe.setId(currentUser.getId());
        safe.setEmail(currentUser.getEmail());
        safe.setFullName(currentUser.getFullName());
        safe.setRole(currentUser.getRole());
        return ResponseEntity.ok(ApiResponse.success(safe));
    }
}


