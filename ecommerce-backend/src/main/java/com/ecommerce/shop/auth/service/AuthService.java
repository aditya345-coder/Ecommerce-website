package com.ecommerce.shop.auth.service;

import com.ecommerce.shop.auth.dto.JwtAuthenticationResponse;
import com.ecommerce.shop.auth.dto.LoginRequest;
import com.ecommerce.shop.auth.dto.RegisterRequest;
import com.ecommerce.shop.security.JwtTokenProvider;
import com.ecommerce.shop.users.entity.User;
import com.ecommerce.shop.users.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Service class for authentication operations
 * Handles user registration and login
 */
@Service
public class AuthService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    
    /**
     * Register a new user
     * @param registerRequest the registration request
     * @return JWT authentication response
     * @throws RuntimeException if email already exists
     */
    public JwtAuthenticationResponse register(RegisterRequest registerRequest) {
        // Check if user already exists
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("Email already exists!");
        }
        
        // Create new user
        User user = new User();
        user.setEmail(registerRequest.getEmail());
        user.setPasswordHash(passwordEncoder.encode(registerRequest.getPassword()));
        user.setFullName(registerRequest.getFullName());
        user.setRole("USER");
        
        // Save user to database
        User savedUser = userRepository.save(user);
        
        // Generate JWT token
        String token = jwtTokenProvider.generateToken(savedUser.getId(), savedUser.getEmail());
        
        // Return authentication response
        return new JwtAuthenticationResponse(
                token,
                savedUser.getId(),
                savedUser.getEmail(),
                savedUser.getFullName(),
                savedUser.getRole()
        );
    }
    
    /**
     * Login user
     * @param loginRequest the login request
     * @return JWT authentication response
     * @throws RuntimeException if credentials are invalid
     */
    public JwtAuthenticationResponse login(LoginRequest loginRequest) {
        System.out.println("DEBUG: Login attempt for email: " + loginRequest.getEmail());
        
        // Find user by email
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> {
                    System.out.println("DEBUG: User not found for email: " + loginRequest.getEmail());
                    return new RuntimeException("Invalid email or password");
                });
        
        System.out.println("DEBUG: User found: " + user.getEmail() + ", stored hash: " + user.getPasswordHash());
        System.out.println("DEBUG: Input password: " + loginRequest.getPassword());
        
        // Check password
        boolean passwordMatches = passwordEncoder.matches(loginRequest.getPassword(), user.getPasswordHash());
        System.out.println("DEBUG: Password matches: " + passwordMatches);
        
        if (!passwordMatches) {
            System.out.println("DEBUG: Password verification failed");
            throw new RuntimeException("Invalid email or password");
        }
        
        System.out.println("DEBUG: Password verified successfully, generating token");
        
        // Generate JWT token
        String token = jwtTokenProvider.generateToken(user.getId(), user.getEmail());
        System.out.println("DEBUG: Token generated: " + token.substring(0, 20) + "...");
        
        // Return authentication response
        JwtAuthenticationResponse response = new JwtAuthenticationResponse(
                token,
                user.getId(),
                user.getEmail(),
                user.getFullName(),
                user.getRole()
        );
        
        System.out.println("DEBUG: Returning response with accessToken: " + (response.getAccessToken() != null ? "present" : "null"));
        
        return response;
    }
}
