package com.diabetes.dto;

import com.diabetes.entity.DiagnosisHistory;
import java.time.LocalDateTime;

public class DiagnosisResponse {
    private Long id;
    private String diagnosisResult;
    private String diagnosisDisplayName;
    private Double riskScore;
    private String recommendations;
    private LocalDateTime createdAt;
    
    // Constructors
    public DiagnosisResponse() {}
    
    public DiagnosisResponse(DiagnosisHistory diagnosis) {
        this.id = diagnosis.getId();
        this.diagnosisResult = diagnosis.getDiagnosisResult().name();
        this.diagnosisDisplayName = diagnosis.getDiagnosisResult().getDisplayName();
        this.riskScore = diagnosis.getRiskScore();
        this.recommendations = diagnosis.getRecommendations();
        this.createdAt = diagnosis.getCreatedAt();
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getDiagnosisResult() {
        return diagnosisResult;
    }
    
    public void setDiagnosisResult(String diagnosisResult) {
        this.diagnosisResult = diagnosisResult;
    }
    
    public String getDiagnosisDisplayName() {
        return diagnosisDisplayName;
    }
    
    public void setDiagnosisDisplayName(String diagnosisDisplayName) {
        this.diagnosisDisplayName = diagnosisDisplayName;
    }
    
    public Double getRiskScore() {
        return riskScore;
    }
    
    public void setRiskScore(Double riskScore) {
        this.riskScore = riskScore;
    }
    
    public String getRecommendations() {
        return recommendations;
    }
    
    public void setRecommendations(String recommendations) {
        this.recommendations = recommendations;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
