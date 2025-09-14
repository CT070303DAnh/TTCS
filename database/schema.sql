-- Tạo database
CREATE DATABASE IF NOT EXISTS diabetes_diagnosis;
USE diabetes_diagnosis;

-- Bảng users
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    date_of_birth VARCHAR(20),
    gender ENUM('MALE', 'FEMALE', 'OTHER'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Bảng diagnosis_history
CREATE TABLE diagnosis_history (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    glucose_level DOUBLE NOT NULL,
    hb_a1c DOUBLE,
    bmi DOUBLE,
    systolic_bp INT,
    diastolic_bp INT,
    age INT,
    weight DOUBLE,
    height DOUBLE,
    family_history BOOLEAN,
    physical_activity BOOLEAN,
    smoking BOOLEAN,
    diagnosis_result ENUM('NORMAL', 'PREDIABETES', 'DIABETES', 'HIGH_RISK'),
    risk_score DOUBLE,
    recommendations TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tạo index để tối ưu hiệu suất
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_diagnosis_user_id ON diagnosis_history(user_id);
CREATE INDEX idx_diagnosis_created_at ON diagnosis_history(created_at);

-- Insert dữ liệu mẫu (tùy chọn)
INSERT INTO users (full_name, email, password, phone_number, date_of_birth, gender) VALUES
('Nguyễn Văn A', 'nguyenvana@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '0123456789', '1990-01-01', 'MALE'),
('Trần Thị B', 'tranthib@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '0987654321', '1985-05-15', 'FEMALE');

-- Insert dữ liệu chẩn đoán mẫu
INSERT INTO diagnosis_history (user_id, glucose_level, hb_a1c, bmi, systolic_bp, diastolic_bp, age, weight, height, family_history, physical_activity, smoking, diagnosis_result, risk_score, recommendations) VALUES
(1, 120.0, 5.8, 25.5, 130, 85, 35, 70.0, 165.0, true, false, false, 'PREDIABETES', 45.0, '• Cần thay đổi lối sống để ngăn ngừa tiểu đường\n• Giảm cân nếu thừa cân\n• Tăng cường hoạt động thể chất\n• Chế độ ăn lành mạnh'),
(1, 95.0, 5.2, 24.0, 120, 80, 35, 68.0, 165.0, true, true, false, 'NORMAL', 25.0, '• Chỉ số bình thường\n• Duy trì lối sống lành mạnh\n• Kiểm tra định kỳ hàng năm'),
(2, 180.0, 6.8, 28.0, 140, 90, 40, 75.0, 160.0, false, false, true, 'DIABETES', 75.0, '• Cần khám bác sĩ ngay để được điều trị\n• Theo dõi đường huyết thường xuyên\n• Tuân thủ chế độ ăn kiêng nghiêm ngặt\n• Tập thể dục đều đặn');
