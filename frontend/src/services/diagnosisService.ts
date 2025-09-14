import apiClient from './apiClient';

export interface DiagnosisRequest {
  glucoseLevel: number;
  hbA1c?: number;
  bmi?: number;
  systolicBP?: number;
  diastolicBP?: number;
  age?: number;
  weight?: number;
  height?: number;
  familyHistory?: boolean;
  physicalActivity?: boolean;
  smoking?: boolean;
}

export interface DiagnosisResponse {
  id: number;
  diagnosisResult: string;
  diagnosisDisplayName: string;
  riskScore: number;
  recommendations: string;
  createdAt: string;
}

// Interface cho AI backend
export interface AIBackendRequest {
  HighBP: number;
  HighChol: number;
  CholCheck: number;
  BMI: number;
  Smoker: number;
  Stroke: number;
  HeartDiseaseorAttack: number;
  PhysActivity: number;
  Fruits: number;
  Veggies: number;
  HvyAlcoholConsump: number;
  AnyHealthcare: number;
  NoDocbcCost: number;
  GenHlth: number;
  MentHlth: number;
  PhysHlth: number;
  DiffWalk: number;
  Sex: number;
  Age: number;
  Education: number;
  Income: number;
}

export interface AIBackendResponse {
  prediction: number;
  diagnosisResult: string;
  riskScore: number;
  recommendations: string;
}

export const diagnosisService = {
  // Gọi Java backend để thực hiện chẩn đoán (bao gồm auth và lưu lịch sử)
  async performDiagnosis(payload: DiagnosisRequest): Promise<DiagnosisResponse> {
    const res = await apiClient.post('/diagnosis/perform', payload);
    return res.data;
  },

  // Gọi AI backend trực tiếp để chỉ lấy kết quả chẩn đoán (không lưu lịch sử)
  async getAIDiagnosis(payload: DiagnosisRequest): Promise<AIBackendResponse> {
    // Chuyển đổi dữ liệu từ frontend sang format AI backend
    const aiPayload = convertToAIBackendFormat(payload);
    
    const res = await fetch('http://localhost:8000/predict_diabetes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(aiPayload),
    });
    
    if (!res.ok) {
      throw new Error('AI Backend không phản hồi');
    }
    
    return res.json();
  },

  // Lấy lịch sử từ Java backend
  async getHistory(): Promise<DiagnosisResponse[]> {
    const res = await apiClient.get('/diagnosis/history');
    return res.data;
  },
};

// Hàm chuyển đổi dữ liệu từ frontend sang format AI backend
function convertToAIBackendFormat(request: DiagnosisRequest): AIBackendRequest {
  return {
    HighBP: request.systolicBP && request.systolicBP >= 140 ? 1 : 0,
    HighChol: 0, // Giả định không có dữ liệu cholesterol
    CholCheck: 1,
    BMI: request.bmi || 25.0,
    Smoker: request.smoking ? 1 : 0,
    Stroke: 0, // Giả định không có tiền sử đột quỵ
    HeartDiseaseorAttack: 0, // Giả định không có tiền sử tim mạch
    PhysActivity: request.physicalActivity ? 1 : 0,
    Fruits: 1, // Giả định có ăn trái cây
    Veggies: 1, // Giả định có ăn rau
    HvyAlcoholConsump: 0, // Giả định không uống rượu nhiều
    AnyHealthcare: 1,
    NoDocbcCost: 0,
    GenHlth: 3, // Giả định sức khỏe tổng thể trung bình
    MentHlth: 5, // Giả định sức khỏe tinh thần tốt
    PhysHlth: 3, // Giả định sức khỏe thể chất trung bình
    DiffWalk: 0, // Giả định không khó khăn đi lại
    Sex: 1, // Giả định nam giới
    Age: request.age || 50,
    Education: 4, // Giả định trình độ học vấn trung bình
    Income: 6, // Giả định thu nhập trung bình
  };
}
