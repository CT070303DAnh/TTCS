package com.diabetes.controller;

import com.diabetes.dto.DiagnosisRequest;
import com.diabetes.dto.DiagnosisResponse;
import com.diabetes.service.DiagnosisService;
import com.diabetes.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/diagnosis")
@CrossOrigin(origins = "http://localhost:3000")
public class DiagnosisController {
    
    @Autowired
    private DiagnosisService diagnosisService;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    private final RestTemplate restTemplate = new RestTemplate();
    private final String AI_BACKEND_URL = "http://localhost:8000";
    
    @PostMapping("/perform")
    public ResponseEntity<?> performDiagnosis(@Valid @RequestBody DiagnosisRequest request, 
                                           HttpServletRequest httpRequest) {
        try {
            String token = extractTokenFromRequest(httpRequest);
            Long userId = jwtUtil.getUserIdFromToken(token);
            
            // Gọi AI backend để thực hiện chẩn đoán
            Map<String, Object> aiResponse = callAIBackend(request);
            
            // Lưu kết quả vào database
            DiagnosisResponse response = diagnosisService.saveDiagnosisResult(
                userId, 
                request, 
                aiResponse.get("diagnosisResult").toString(),
                Double.parseDouble(aiResponse.get("riskScore").toString()),
                aiResponse.get("recommendations").toString()
            );
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi: " + e.getMessage());
        }
    }
    
    @GetMapping("/history")
    public ResponseEntity<?> getDiagnosisHistory(HttpServletRequest httpRequest) {
        try {
            String token = extractTokenFromRequest(httpRequest);
            Long userId = jwtUtil.getUserIdFromToken(token);
            
            List<DiagnosisResponse> history = diagnosisService.getDiagnosisHistory(userId);
            return ResponseEntity.ok(history);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi: " + e.getMessage());
        }
    }
    
    private Map<String, Object> callAIBackend(DiagnosisRequest request) {
        try {
            // Chuyển đổi dữ liệu từ Java backend sang format mà AI backend mong đợi
            Map<String, Object> aiRequest = Map.of(
                "HighBP", request.getSystolicBP() != null && request.getSystolicBP() >= 140 ? 1 : 0,
                "HighChol", 0, // Giả định không có dữ liệu cholesterol
                "CholCheck", 1,
                "BMI", request.getBmi() != null ? request.getBmi() : 25.0,
                "Smoker", request.getSmoking() != null && request.getSmoking() ? 1 : 0,
                "Stroke", 0, // Giả định không có tiền sử đột quỵ
                "HeartDiseaseorAttack", 0, // Giả định không có tiền sử tim mạch
                "PhysActivity", request.getPhysicalActivity() != null && request.getPhysicalActivity() ? 1 : 0,
                "Fruits", 1, // Giả định có ăn trái cây
                "Veggies", 1, // Giả định có ăn rau
                "HvyAlcoholConsump", 0, // Giả định không uống rượu nhiều
                "AnyHealthcare", 1,
                "NoDocbcCost", 0,
                "GenHlth", 3, // Giả định sức khỏe tổng thể trung bình
                "MentHlth", 5, // Giả định sức khỏe tinh thần tốt
                "PhysHlth", 3, // Giả định sức khỏe thể chất trung bình
                "DiffWalk", 0, // Giả định không khó khăn đi lại
                "Sex", 1, // Giả định nam giới
                "Age", request.getAge() != null ? request.getAge() : 50,
                "Education", 4, // Giả định trình độ học vấn trung bình
                "Income", 6 // Giả định thu nhập trung bình
            );
            
            // Gọi AI backend
            Map<String, Object> response = restTemplate.postForObject(
                AI_BACKEND_URL + "/predict_diabetes", 
                aiRequest, 
                Map.class
            );
            
            // Trả về kết quả từ AI backend
            return Map.of(
                "diagnosisResult", response.get("diagnosisResult"),
                "riskScore", response.get("riskScore"),
                "recommendations", response.get("recommendations")
            );
            
        } catch (Exception e) {
            throw new RuntimeException("Lỗi khi gọi AI backend: " + e.getMessage());
        }
    }
    
    private String extractTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        throw new RuntimeException("Token không hợp lệ");
    }
}
