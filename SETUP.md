# Hướng dẫn cài đặt và chạy dự án Diabetes Diagnosis

## Yêu cầu hệ thống
- Java 17+
- Node.js 18+
- XAMPP (MySQL)
- Maven

## Bước 1: Cài đặt Database

1. Khởi động XAMPP và bật MySQL
2. Mở phpMyAdmin (http://localhost/phpmyadmin)
3. Tạo database mới tên `diabetes_diagnosis`
4. Import file `database/schema.sql` để tạo bảng và dữ liệu mẫu

## Bước 2: Cài đặt Backend

1. Mở terminal/command prompt
2. Di chuyển đến thư mục backend:
```bash
cd backend
```

3. Cài đặt dependencies:
```bash
mvn clean install
```

4. Chạy ứng dụng Spring Boot:
```bash
mvn spring-boot:run
```

Backend sẽ chạy tại: http://localhost:8080

## Bước 3: Cài đặt Frontend

1. Mở terminal/command prompt mới
2. Di chuyển đến thư mục frontend:
```bash
cd frontend
```

3. Cài đặt dependencies:
```bash
npm install
```

4. Chạy ứng dụng React:
```bash
npm start
```

Frontend sẽ chạy tại: http://localhost:3000

## Bước 4: Sử dụng ứng dụng

1. Mở trình duyệt và truy cập: http://localhost:3000
2. Đăng ký tài khoản mới hoặc đăng nhập với tài khoản mẫu:
   - Email: nguyenvana@example.com
   - Password: password
3. Sau khi đăng nhập, bạn có thể:
   - Xem Dashboard
   - Thực hiện chẩn đoán bệnh tiểu đường
   - Xem lịch sử chẩn đoán

## Cấu trúc API

### Authentication
- POST /api/auth/register - Đăng ký
- POST /api/auth/login - Đăng nhập

### Diagnosis
- POST /api/diagnosis/perform - Thực hiện chẩn đoán
- GET /api/diagnosis/history - Lấy lịch sử chẩn đoán

## Troubleshooting

### Lỗi kết nối database
- Kiểm tra XAMPP đã khởi động MySQL
- Kiểm tra thông tin kết nối trong `application.properties`

### Lỗi CORS
- Đảm bảo backend đang chạy trên port 8080
- Kiểm tra cấu hình CORS trong SecurityConfig

### Lỗi frontend
- Xóa node_modules và chạy lại `npm install`
- Kiểm tra phiên bản Node.js (cần 18+)

## Tính năng chính

1. **Đăng ký/Đăng nhập**: Hệ thống authentication với JWT
2. **Chẩn đoán bệnh**: Nhập chỉ số sinh học và nhận kết quả chẩn đoán
3. **Lịch sử chẩn đoán**: Xem lại các lần chẩn đoán trước đó
4. **Dashboard**: Hiển thị tổng quan và thống kê
5. **Thuật toán chẩn đoán**: Dựa trên các tiêu chuẩn y tế quốc tế

## Chỉ số sinh học được sử dụng

- Glucose (đường huyết)
- HbA1c (hemoglobin A1c)
- BMI (chỉ số khối cơ thể)
- Huyết áp (systolic/diastolic)
- Tuổi
- Cân nặng/Chiều cao
- Tiền sử gia đình
- Hoạt động thể chất
- Hút thuốc
