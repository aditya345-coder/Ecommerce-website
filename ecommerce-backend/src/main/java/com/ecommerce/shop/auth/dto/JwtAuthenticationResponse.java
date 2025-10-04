package com.ecommerce.shop.auth.dto;

/**
 * DTO for JWT authentication response
 */
public class JwtAuthenticationResponse {
    
    private String accessToken;
    private String token;
    private String type = "Bearer";
    private Long userId;
    private String email;
    private String fullName;
    private String role;
    
    // Default constructor
    public JwtAuthenticationResponse() {}
    
    // Constructor with token
    public JwtAuthenticationResponse(String token) {
        this.token = token;
        this.accessToken = token;
    }
    
    // Constructor with all fields
    public JwtAuthenticationResponse(String token, Long userId, String email, String fullName, String role) {
        this.token = token;
        this.accessToken = token;
        this.userId = userId;
        this.email = email;
        this.fullName = fullName;
        this.role = role;
    }
    
    // Getters and Setters
    public String getAccessToken() {
        return accessToken;
    }
    
    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
        this.token = accessToken; // Keep both for backward compatibility
    }
    
    public String getToken() {
        return token;
    }
    
    public void setToken(String token) {
        this.token = token;
        this.accessToken = token; // Keep both for backward compatibility
    }
    
    public String getType() {
        return type;
    }
    
    public void setType(String type) {
        this.type = type;
    }
    
    public Long getUserId() {
        return userId;
    }
    
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getFullName() {
        return fullName;
    }
    
    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
    
    public String getRole() {
        return role;
    }
    
    public void setRole(String role) {
        this.role = role;
    }
}
