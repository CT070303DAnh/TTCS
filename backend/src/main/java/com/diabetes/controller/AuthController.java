package com.diabetes.controller;

import com.diabetes.dto.LoginRequest;
import com.diabetes.dto.RegisterRequest;
import com.diabetes.dto.AuthResponse;
import com.diabetes.entity.User;
import com.diabetes.repository.UserRepository;
import com.diabetes.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        // Kiểm tra email đã tồn tại
        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body("Email đã được sử dụng");
        }
        
        // Tạo user mới
        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPhoneNumber(request.getPhoneNumber());
        user.setDateOfBirth(request.getDateOfBirth());
        
        if (request.getGender() != null) {
            try {
                user.setGender(User.Gender.valueOf(request.getGender().toUpperCase()));
            } catch (IllegalArgumentException e) {
                // Bỏ qua nếu gender không hợp lệ
            }
        }
        
        User savedUser = userRepository.save(user);
        
        // Tạo JWT token
        String token = jwtUtil.generateToken(savedUser.getEmail(), savedUser.getId());
        LocalDateTime expiresAt = LocalDateTime.now().plusHours(24);
        
        AuthResponse response = new AuthResponse(token, savedUser.getId(), 
                savedUser.getFullName(), savedUser.getEmail(), expiresAt);
        
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        // Tìm user theo email
        User user = userRepository.findByEmail(request.getEmail())
                .orElse(null);
        
        if (user == null || !passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity.badRequest().body("Email hoặc mật khẩu không đúng");
        }
        
        // Tạo JWT token
        String token = jwtUtil.generateToken(user.getEmail(), user.getId());
        LocalDateTime expiresAt = LocalDateTime.now().plusHours(24);
        
        AuthResponse response = new AuthResponse(token, user.getId(), 
                user.getFullName(), user.getEmail(), expiresAt);
        
        return ResponseEntity.ok(response);
    }
}
