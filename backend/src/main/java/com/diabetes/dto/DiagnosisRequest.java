package com.diabetes.dto;

import jakarta.validation.constraints.NotNull;

public class DiagnosisRequest {
    
    @NotNull(message = "Chỉ số glucose không được để trống")
    private Double glucoseLevel;
    
    private Double hbA1c;
    private Double bmi;
    private Integer systolicBP;
    private Integer diastolicBP;
    private Integer age;
    private Double weight;
    private Double height;
    private Boolean familyHistory;
    private Boolean physicalActivity;
    private Boolean smoking;
    
    // Constructors
    public DiagnosisRequest() {}
    
    // Getters and Setters
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
}
