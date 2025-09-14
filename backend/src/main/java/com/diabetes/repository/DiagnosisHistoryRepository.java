package com.diabetes.repository;

import com.diabetes.entity.DiagnosisHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DiagnosisHistoryRepository extends JpaRepository<DiagnosisHistory, Long> {
    
    List<DiagnosisHistory> findByUserIdOrderByCreatedAtDesc(Long userId);
    
    List<DiagnosisHistory> findByUserIdAndDiagnosisResultOrderByCreatedAtDesc(Long userId, DiagnosisHistory.DiagnosisResult result);
}
