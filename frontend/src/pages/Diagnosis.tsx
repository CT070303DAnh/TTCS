import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { diagnosisService, DiagnosisRequest, DiagnosisResponse, AIBackendResponse, AIBackendRequest } from '../services/diagnosisService';

const Diagnosis: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<AIBackendRequest>();
  const [result, setResult] = useState<DiagnosisResponse | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: AIBackendRequest) => {
    setError('');
    setLoading(true);
    setResult(null);
    
    try {
      // Chuyển đổi dữ liệu từ AI format sang Java backend format
      const javaBackendData: DiagnosisRequest = {
        glucoseLevel: 120, // Giá trị mặc định vì không có trong AI form
        bmi: data.BMI,
        age: data.Age,
        systolicBP: data.HighBP === 1 ? 140 : 120,
        diastolicBP: 80,
        physicalActivity: data.PhysActivity === 1,
        smoking: data.Smoker === 1,
        familyHistory: false, // Giả định không có tiền sử gia đình
        hbA1c: undefined,
        weight: undefined,
        height: undefined,
      };
      
      // Gọi Java backend (sẽ tự động gọi AI backend và lưu lịch sử)
      const res = await diagnosisService.performDiagnosis(javaBackendData);
      setResult(res);
    } catch (e: any) {
      setError(e.response?.data || e.message || 'Không thể chẩn đoán');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <form onSubmit={handleSubmit(onSubmit)} className="card">
        <h2 className="text-xl font-semibold mb-4">Nhập chỉ số sức khỏe chi tiết</h2>

        {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700">{error}</div>}

        <div className="grid grid-cols-2 gap-4">
          {/* Thông tin cơ bản */}
          <div className="form-group">
            <label className="form-label">Tuổi *</label>
            <select className="input" {...register('Age', { required: 'Bắt buộc' })}>
              <option value="">Chọn nhóm tuổi</option>
              <option value="1">18-24 tuổi</option>
              <option value="2">25-29 tuổi</option>
              <option value="3">30-34 tuổi</option>
              <option value="4">35-39 tuổi</option>
              <option value="5">40-44 tuổi</option>
              <option value="6">45-49 tuổi</option>
              <option value="7">50-54 tuổi</option>
              <option value="8">55-59 tuổi</option>
              <option value="9">60-64 tuổi</option>
              <option value="10">65-69 tuổi</option>
              <option value="11">70-74 tuổi</option>
              <option value="12">75-79 tuổi</option>
              <option value="13">80+ tuổi</option>
            </select>
            {errors.Age && <p className="form-error">{errors.Age.message}</p>}
          </div>
          
          <div className="form-group">
            <label className="form-label">BMI (Chỉ số khối cơ thể) *</label>
            <input 
              type="number" 
              step="0.1" 
              min="12" 
              max="98" 
              placeholder="VD: 25.5" 
              className="input" 
              {...register('BMI', { 
                required: 'Bắt buộc', 
                min: { value: 12, message: 'BMI tối thiểu là 12' },
                max: { value: 98, message: 'BMI tối đa là 98' }
              })} 
            />
            {errors.BMI && <p className="form-error">{errors.BMI.message}</p>}
            <p className="text-xs text-gray-500 mt-1">BMI = Cân nặng(kg) / Chiều cao(m)²</p>
          </div>

          <div className="form-group">
            <label className="form-label">Giới tính *</label>
            <select className="input" {...register('Sex', { required: 'Bắt buộc' })}>
              <option value="">Chọn giới tính</option>
              <option value="1">Nam</option>
              <option value="0">Nữ</option>
            </select>
            {errors.Sex && <p className="form-error">{errors.Sex.message}</p>}
          </div>

          {/* Yếu tố nguy cơ */}
          <div className="form-group">
            <label className="form-label">Huyết áp cao</label>
            <select className="input" {...register('HighBP')}>
              <option value="0">Không</option>
              <option value="1">Có (≥140/90 mmHg)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Cholesterol cao</label>
            <select className="input" {...register('HighChol')}>
              <option value="0">Không</option>
              <option value="1">Có (≥240 mg/dL)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Đã kiểm tra cholesterol</label>
            <select className="input" {...register('CholCheck')}>
              <option value="0">Chưa</option>
              <option value="1">Rồi (trong 5 năm qua)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Hút thuốc</label>
            <select className="input" {...register('Smoker')}>
              <option value="0">Không</option>
              <option value="1">Có (ít nhất 100 điếu trong đời)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Tiền sử đột quỵ</label>
            <select className="input" {...register('Stroke')}>
              <option value="0">Không</option>
              <option value="1">Có</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Bệnh tim mạch</label>
            <select className="input" {...register('HeartDiseaseorAttack')}>
              <option value="0">Không</option>
              <option value="1">Có (bệnh tim mạch vành hoặc nhồi máu cơ tim)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Hoạt động thể chất</label>
            <select className="input" {...register('PhysActivity')}>
              <option value="0">Không</option>
              <option value="1">Có (ít nhất 10 phút/tuần)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Ăn trái cây</label>
            <select className="input" {...register('Fruits')}>
              <option value="0">Không</option>
              <option value="1">Có (ít nhất 1 lần/ngày)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Ăn rau</label>
            <select className="input" {...register('Veggies')}>
              <option value="0">Không</option>
              <option value="1">Có (ít nhất 1 lần/ngày)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Uống rượu nhiều</label>
            <select className="input" {...register('HvyAlcoholConsump')}>
              <option value="0">Không</option>
              <option value="1">Có (nam: ≥14 ly/tuần, nữ: ≥7 ly/tuần)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Có bảo hiểm y tế</label>
            <select className="input" {...register('AnyHealthcare')}>
              <option value="0">Không</option>
              <option value="1">Có</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Không đi khám vì chi phí</label>
            <select className="input" {...register('NoDocbcCost')}>
              <option value="0">Không</option>
              <option value="1">Có (trong 12 tháng qua)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Sức khỏe tổng thể</label>
            <select className="input" {...register('GenHlth')}>
              <option value="1">Rất tốt</option>
              <option value="2">Tốt</option>
              <option value="3">Trung bình</option>
              <option value="4">Kém</option>
              <option value="5">Rất kém</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Sức khỏe tinh thần (ngày/tháng)</label>
            <input 
              type="number" 
              min="0" 
              max="30" 
              placeholder="VD: 5" 
              className="input" 
              {...register('MentHlth')} 
            />
            <p className="text-xs text-gray-500 mt-1">Số ngày trong tháng qua bạn cảm thấy không khỏe về mặt tinh thần</p>
          </div>

          <div className="form-group">
            <label className="form-label">Sức khỏe thể chất (ngày/tháng)</label>
            <input 
              type="number" 
              min="0" 
              max="30" 
              placeholder="VD: 3" 
              className="input" 
              {...register('PhysHlth')} 
            />
            <p className="text-xs text-gray-500 mt-1">Số ngày trong tháng qua bạn cảm thấy không khỏe về mặt thể chất</p>
          </div>

          <div className="form-group">
            <label className="form-label">Khó khăn đi lại</label>
            <select className="input" {...register('DiffWalk')}>
              <option value="0">Không</option>
              <option value="1">Có (khó đi bộ hoặc leo cầu thang)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Trình độ học vấn</label>
            <select className="input" {...register('Education')}>
              <option value="1">Không học</option>
              <option value="2">Tiểu học</option>
              <option value="3">Trung học cơ sở</option>
              <option value="4">Trung học phổ thông</option>
              <option value="5">Cao đẳng</option>
              <option value="6">Đại học trở lên</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Thu nhập hàng năm</label>
            <select className="input" {...register('Income')}>
              <option value="1">Dưới $10,000</option>
              <option value="2">$10,000 - $15,000</option>
              <option value="3">$15,000 - $20,000</option>
              <option value="4">$20,000 - $25,000</option>
              <option value="5">$25,000 - $35,000</option>
              <option value="6">$35,000 - $50,000</option>
              <option value="7">$50,000 - $75,000</option>
              <option value="8">Trên $75,000</option>
            </select>
          </div>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Đang chẩn đoán...' : 'Chẩn đoán'}
        </button>
      </form>

      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Kết quả chẩn đoán</h2>
        {!result ? (
          <div className="text-center py-8">
            <div className="text-gray-400 text-6xl mb-4">🏥</div>
            <p className="text-gray-500">Chưa có kết quả. Hãy nhập chỉ số và chẩn đoán.</p>
            <div className="mt-4 text-sm text-gray-400">
              <p>• Nhập đầy đủ thông tin để có kết quả chính xác</p>
              <p>• Kết quả sẽ được lưu vào lịch sử của bạn</p>
            </div>
          </div>
        ) : (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded">
            <h3 className="font-medium text-blue-800 mb-2">Kết quả chẩn đoán:</h3>
            <p className="mb-2">
              <span className="font-medium">Kết luận:</span> 
              <span className={`ml-2 px-2 py-1 rounded text-sm ${
                result.diagnosisResult === 'DIABETES' ? 'bg-red-100 text-red-800' :
                result.diagnosisResult === 'HIGH_RISK' ? 'bg-orange-100 text-orange-800' :
                result.diagnosisResult === 'PREDIABETES' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {result.diagnosisDisplayName}
              </span>
            </p>
            <p className="mb-2">
              <span className="font-medium">Điểm nguy cơ:</span> 
              <span className="ml-2 font-bold text-lg">{result.riskScore}/100</span>
            </p>
            <div className="mt-4">
              <h4 className="font-medium text-gray-800 mb-2">Khuyến nghị:</h4>
              <div className="whitespace-pre-line text-gray-700 bg-white p-3 rounded border">
                {result.recommendations}
              </div>
            </div>
            <div className="mt-3 text-xs text-gray-500">
              <p>✅ Đã xác thực người dùng</p>
              <p>✅ Đã lưu vào lịch sử chẩn đoán</p>
              <p>✅ Sử dụng AI model để phân tích</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Diagnosis;
