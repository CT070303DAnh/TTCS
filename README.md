# Trang Web Chẩn Đoán Bệnh Tiểu Đường

## Mô tả dự án
Trang web hỗ trợ chẩn đoán bệnh tiểu đường thông qua chỉ số sinh học của người dùng.

## Tính năng chính
- Đăng ký và đăng nhập người dùng
- Nhập chỉ số sinh học (Glucose, HbA1c, BMI, huyết áp, etc.)
- Chẩn đoán bệnh tiểu đường dựa trên thuật toán ML
- Lưu trữ lịch sử chẩn đoán
- Xem lịch sử chẩn đoán và biểu đồ theo dõi
- Dashboard hiển thị kết quả và cảnh báo

## Stack công nghệ
### Backend
- Spring Boot 3.x
- Spring Security + JWT
- Spring Data JPA
- MySQL (XAMPP)

### Frontend
- React.js + TypeScript
- Tailwind CSS
- Chart.js
- Axios

## Cấu trúc dự án
```
diabetes-diagnosis/
├── backend/                 # Spring Boot project
├── frontend/               # React project
└── database/              # SQL scripts
```

## Hướng dẫn cài đặt

### Yêu cầu hệ thống
- Java 17+
- Node.js 18+
- XAMPP (MySQL)
- Maven

### Cài đặt Backend
1. Cài đặt XAMPP và khởi động MySQL
2. Tạo database `diabetes_diagnosis`
3. Chạy script SQL trong thư mục `database/`
4. Cấu hình `application.properties`
5. Chạy Spring Boot application

### Cài đặt Frontend
1. Cài đặt dependencies: `npm install`
2. Cấu hình API endpoint
3. Chạy development server: `npm start`

## API Endpoints
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/login` - Đăng nhập
- `POST /api/diagnosis` - Chẩn đoán bệnh
- `GET /api/history` - Lấy lịch sử chẩn đoán
- `GET /api/profile` - Thông tin người dùng

# AI

## Hướng dẫn setup môi trường
- cd AI
- trong cmd chạy lệnh: python -m venv venv
- để vào môi trường chạy lệnh venv/Scripts/activate

## Hướng dẫn chạy backend
- cd AI
-trong cmd chạy lệnh uvicorn app:app --reload
