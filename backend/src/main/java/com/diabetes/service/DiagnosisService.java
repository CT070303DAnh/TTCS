package com.diabetes.service;

import com.diabetes.entity.DiagnosisHistory;
import com.diabetes.entity.User;
import com.diabetes.repository.DiagnosisHistoryRepository;
import com.diabetes.repository.UserRepository;
import com.diabetes.dto.DiagnosisRequest;
import com.diabetes.dto.DiagnosisResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DiagnosisService {
    
    @Autowired
    private DiagnosisHistoryRepository diagnosisHistoryRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public DiagnosisResponse saveDiagnosisResult(Long userId, DiagnosisRequest request, 
                                               String diagnosisResult, Double riskScore, 
                                               String recommendations) {
        // Tính toán BMI nếu chưa có
        Double bmi = request.getBmi();
        if (bmi == null && request.getWeight() != null && request.getHeight() != null) {
            bmi = calculateBMI(request.getWeight(), request.getHeight());
        }
        
        // Lưu vào database
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        DiagnosisHistory diagnosis = new DiagnosisHistory();
        diagnosis.setUser(user);
        diagnosis.setGlucoseLevel(request.getGlucoseLevel());
        diagnosis.setHbA1c(request.getHbA1c());
        diagnosis.setBmi(bmi);
        diagnosis.setSystolicBP(request.getSystolicBP());
        diagnosis.setDiastolicBP(request.getDiastolicBP());
        diagnosis.setAge(request.getAge());
        diagnosis.setWeight(request.getWeight());
        diagnosis.setHeight(request.getHeight());
        diagnosis.setFamilyHistory(request.getFamilyHistory());
        diagnosis.setPhysicalActivity(request.getPhysicalActivity());
        diagnosis.setSmoking(request.getSmoking());
        diagnosis.setDiagnosisResult(DiagnosisHistory.DiagnosisResult.valueOf(diagnosisResult));
        diagnosis.setRiskScore(riskScore);
        diagnosis.setRecommendations(recommendations);
        
        DiagnosisHistory savedDiagnosis = diagnosisHistoryRepository.save(diagnosis);
        
        return new DiagnosisResponse(savedDiagnosis);
    }
    
    public List<DiagnosisResponse> getDiagnosisHistory(Long userId) {
        List<DiagnosisHistory> history = diagnosisHistoryRepository.findByUserIdOrderByCreatedAtDesc(userId);
        return history.stream()
                .map(DiagnosisResponse::new)
                .collect(Collectors.toList());
    }
    
    private Double calculateBMI(Double weight, Double height) {
        if (weight == null || height == null || height == 0) {
            return null;
        }
        return weight / Math.pow(height / 100, 2);
    }
}
