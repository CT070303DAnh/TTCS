package com.diabetes.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Table(name = "diagnosis_history")
public class DiagnosisHistory {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @NotNull(message = "Chỉ số glucose không được để trống")
    @Column(name = "glucose_level")
    private Double glucoseLevel;
    
    @Column(name = "hb_a1c")
    private Double hbA1c;
    
    @Column(name = "bmi")
    private Double bmi;
    
    @Column(name = "systolic_bp")
    private Integer systolicBP;
    
    @Column(name = "diastolic_bp")
    private Integer diastolicBP;
    
    @Column(name = "age")
    private Integer age;
    
    @Column(name = "weight")
    private Double weight;
    
    @Column(name = "height")
    private Double height;
    
    @Column(name = "family_history")
    private Boolean familyHistory;
    
    @Column(name = "physical_activity")
    private Boolean physicalActivity;
    
    @Column(name = "smoking")
    private Boolean smoking;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "diagnosis_result")
    private DiagnosisResult diagnosisResult;
    
    @Column(name = "risk_score")
    private Double riskScore;
    
    @Column(name = "recommendations", columnDefinition = "TEXT")
    private String recommendations;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
    
    // Constructors
    public DiagnosisHistory() {}
    
    public DiagnosisHistory(User user, Double glucoseLevel, Double hbA1c, Double bmi, 
                          Integer systolicBP, Integer diastolicBP, Integer age, 
                          Double weight, Double height, Boolean familyHistory, 
                          Boolean physicalActivity, Boolean smoking) {
        this.user = user;
        this.glucoseLevel = glucoseLevel;
        this.hbA1c = hbA1c;
        this.bmi = bmi;
        this.systolicBP = systolicBP;
        this.diastolicBP = diastolicBP;
        this.age = age;
        this.weight = weight;
        this.height = height;
        this.familyHistory = familyHistory;
        this.physicalActivity = physicalActivity;
        this.smoking = smoking;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public User getUser() {
        return user;
    }
    
    public void setUser(User user) {
        this.user = user;
    }
    
    public Double getGlucoseLevel() {
        return glucoseLevel;
    }
    
    public void setGlucoseLevel(Double glucoseLevel) {
        this.glucoseLevel = glucoseLevel;
    }
    
    public Double getHbA1c() {
        return hbA1c;
    }
    
    public void setHbA1c(Double hbA1c) {
        this.hbA1c = hbA1c;
    }
    
    public Double getBmi() {
        return bmi;
    }
    
    public void setBmi(Double bmi) {
        this.bmi = bmi;
    }
    
    public Integer getSystolicBP() {
        return systolicBP;
    }
    
    public void setSystolicBP(Integer systolicBP) {
        this.systolicBP = systolicBP;
    }
    
    public Integer getDiastolicBP() {
        return diastolicBP;
    }
    
    public void setDiastolicBP(Integer diastolicBP) {
        this.diastolicBP = diastolicBP;
    }
    
    public Integer getAge() {
        return age;
    }
    
    public void setAge(Integer age) {
        this.age = age;
    }
    
    public Double getWeight() {
        return weight;
    }
    
    public void setWeight(Double weight) {
        this.weight = weight;
    }
    
    public Double getHeight() {
        return height;
    }
    
    public void setHeight(Double height) {
        this.height = height;
    }
    
    public Boolean getFamilyHistory() {
        return familyHistory;
    }
    
    public void setFamilyHistory(Boolean familyHistory) {
        this.familyHistory = familyHistory;
    }
    
    public Boolean getPhysicalActivity() {
        return physicalActivity;
    }
    
    public void setPhysicalActivity(Boolean physicalActivity) {
        this.physicalActivity = physicalActivity;
    }
    
    public Boolean getSmoking() {
        return smoking;
    }
    
    public void setSmoking(Boolean smoking) {
        this.smoking = smoking;
    }
    
    public DiagnosisResult getDiagnosisResult() {
        return diagnosisResult;
    }
    
    public void setDiagnosisResult(DiagnosisResult diagnosisResult) {
        this.diagnosisResult = diagnosisResult;
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
    
    public enum DiagnosisResult {
        NORMAL("Bình thường"),
        PREDIABETES("Tiền tiểu đường"),
        DIABETES("Tiểu đường"),
        HIGH_RISK("Nguy cơ cao");
        
        private final String displayName;
        
        DiagnosisResult(String displayName) {
            this.displayName = displayName;
        }
        
        public String getDisplayName() {
            return displayName;
        }
    }
}
