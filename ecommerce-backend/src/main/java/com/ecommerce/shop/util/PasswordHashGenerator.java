package com.ecommerce.shop.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordHashGenerator {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        
        // Generate hash for user123 (the correct password)
        String password = "user123";
        String hash = encoder.encode(password);
        
        System.out.println("Password: " + password);
        System.out.println("Generated hash: " + hash);
        System.out.println("Verification: " + encoder.matches(password, hash));
        
        // Test the existing hash to see what password it was for
        String existingHash = "$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi";
        System.out.println("\nExisting hash: " + existingHash);
        
        // Test common passwords
        String[] testPasswords = {"admin123", "password", "123456", "admin", "user", "test"};
        for (String testPassword : testPasswords) {
            boolean matches = encoder.matches(testPassword, existingHash);
            System.out.println("'" + testPassword + "' matches existing hash: " + matches);
        }
    }
}