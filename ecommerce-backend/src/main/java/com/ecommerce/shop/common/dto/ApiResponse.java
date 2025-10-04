package com.ecommerce.shop.common.dto;

/**
 * Standard API response wrapper
 * Provides consistent response format across all endpoints
 */
public class ApiResponse<T> {
    
    private boolean success;
    private String message;
    private T data;
    private long timestamp;
    
    // Default constructor
    public ApiResponse() {
        this.timestamp = System.currentTimeMillis();
    }
    
    // Constructor with success and message
    public ApiResponse(boolean success, String message) {
        this();
        this.success = success;
        this.message = message;
    }
    
    // Constructor with success, message, and data
    public ApiResponse(boolean success, String message, T data) {
        this(success, message);
        this.data = data;
    }
    
    // Static factory methods for common responses
    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(true, "Success", data);
    }
    
    public static <T> ApiResponse<T> success(String message, T data) {
        return new ApiResponse<>(true, message, data);
    }
    
    public static <T> ApiResponse<T> error(String message) {
        return new ApiResponse<>(false, message);
    }
    
    // Getters and Setters
    public boolean isSuccess() {
        return success;
    }
    
    public void setSuccess(boolean success) {
        this.success = success;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
    
    public T getData() {
        return data;
    }
    
    public void setData(T data) {
        this.data = data;
    }
    
    public long getTimestamp() {
        return timestamp;
    }
    
    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }
}
