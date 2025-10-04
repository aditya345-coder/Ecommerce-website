package com.ecommerce.shop.util;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordVerifier {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        
        // Test the existing hash from database
        String existingHash = "$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi";
        
        // Test different passwords
        String[] testPasswords = {"user123", "admin123", "password", "123456", "admin", "user"};
        
        System.out.println("Testing existing hash: " + existingHash);
        System.out.println("=".repeat(60));
        
        for (String password : testPasswords) {
            boolean matches = encoder.matches(password, existingHash);
            System.out.println("Password '" + password + "' matches: " + matches);
        }
        
        System.out.println("\n" + "=".repeat(60));
        System.out.println("Generating new hash for 'user123':");
        String newHash = encoder.encode("user123");
        System.out.println("New hash: " + newHash);
        System.out.println("New hash matches 'user123': " + encoder.matches("user123", newHash));
    }
}
