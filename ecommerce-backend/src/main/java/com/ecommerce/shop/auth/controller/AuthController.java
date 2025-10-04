package com.ecommerce.shop.auth.controller;

import com.ecommerce.shop.auth.dto.JwtAuthenticationResponse;
import com.ecommerce.shop.auth.dto.LoginRequest;
import com.ecommerce.shop.auth.dto.RegisterRequest;
import com.ecommerce.shop.auth.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for authentication endpoints
 * Handles user registration and login
 */
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    
    @Autowired
    private AuthService authService;
    
    /**
     * Register a new user
     * @param registerRequest the registration request
     * @return JWT authentication response
     */
    @PostMapping("/register")
    public ResponseEntity<JwtAuthenticationResponse> register(@Valid @RequestBody RegisterRequest registerRequest) {
        try {
            JwtAuthenticationResponse response = authService.register(registerRequest);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Login user
     * @param loginRequest the login request
     * @return JWT authentication response
     */
    @PostMapping("/login")
    public ResponseEntity<JwtAuthenticationResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            System.out.println("DEBUG: AuthController received login request for: " + loginRequest.getEmail());
            JwtAuthenticationResponse response = authService.login(loginRequest);
            System.out.println("DEBUG: AuthController sending response with accessToken: " + (response.getAccessToken() != null ? "present" : "null"));
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            System.out.println("DEBUG: AuthController caught exception: " + e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
}
