package com.diabetes.dto;

import java.time.LocalDateTime;

public class AuthResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String fullName;
    private String email;
    private LocalDateTime expiresAt;
    
    // Constructors
    public AuthResponse() {}
    
    public AuthResponse(String token, Long id, String fullName, String email, LocalDateTime expiresAt) {
        this.token = token;
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.expiresAt = expiresAt;
    }
    
    // Getters and Setters
    public String getToken() {
        return token;
    }
    
    public void setToken(String token) {
        this.token = token;
    }
    
    public String getType() {
        return type;
    }
    
    public void setType(String type) {
        this.type = type;
    }
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getFullName() {
        return fullName;
    }
    
    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public LocalDateTime getExpiresAt() {
        return expiresAt;
    }
    
    public void setExpiresAt(LocalDateTime expiresAt) {
        this.expiresAt = expiresAt;
    }
}
