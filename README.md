# 🎓 HCMUT Tutor System

> Hệ thống quản lý gia sư trực tuyến cho Đại học Bách Khoa TP.HCM

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.5-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-19.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 📋 Mục lục

- [Giới thiệu](#-giới-thiệu)
- [Tính năng](#-tính-năng)
- [Công nghệ sử dụng](#-công-nghệ-sử-dụng)
- [Cấu trúc thư mục](#-cấu-trúc-thư-mục)
- [Cài đặt](#-cài-đặt)
- [Sử dụng](#-sử-dụng)
- [API Documentation](#-api-documentation)
- [Đóng góp](#-đóng-góp)
- [Tác giả](#-tác-giả)
- [License](#-license)

## 🎯 Giới thiệu

**HCMUT Tutor System** là hệ thống quản lý gia sư được phát triển như một phần của bài tập lớn môn **Công nghệ Phần mềm (SE251)** tại Đại học Bách Khoa TP.HCM.

Hệ thống cung cấp nền tảng kết nối giữa sinh viên và gia sư, giúp sinh viên dễ dàng tìm kiếm và đăng ký các buổi học phù hợp với nhu cầu của mình.

### 🎯 Mục tiêu dự án

- Tạo nền tảng kết nối sinh viên với gia sư một cách hiệu quả
- Quản lý lịch học, đăng ký buổi học tự động
- Cung cấp thư viện tài liệu học tập
- Hệ thống đánh giá và phản hồi cho gia sư

## ✨ Tính năng

### 👨‍🎓 Dành cho Sinh viên

- ✅ Xem danh sách buổi học công khai
- ✅ Tìm kiếm buổi học theo môn học, gia sư, thời gian
- ✅ Đăng ký/Hủy đăng ký buổi học
- ✅ Quản lý lịch học cá nhân
- ✅ Cập nhật danh sách môn học cần cải thiện
- ✅ Gửi yêu cầu mở lớp mới
- ✅ Đánh giá và phản hồi sau buổi học
- ✅ Truy cập thư viện tài liệu

### 👨‍🏫 Dành cho Gia sư

- ✅ Quản lý profile cá nhân
- ✅ Tạo và quản lý buổi học
- ✅ Xem danh sách sinh viên đăng ký
- ✅ Upload tài liệu học tập
- ✅ Xem đánh giá từ sinh viên

### 🔐 Xác thực

- ✅ Tích hợp SSO (Single Sign-On)
- ✅ JWT Authentication
- ✅ Role-based Access Control (Student, Tutor, Admin)

## 🛠 Công nghệ sử dụng

### Backend

| Công nghệ | Phiên bản | Mô tả |
|-----------|-----------|-------|
| **Java** | 21 | Ngôn ngữ lập trình chính |
| **Spring Boot** | 3.5.5 | Framework backend |
| **Spring Data JPA** | - | ORM và database access |
| **Spring Security** | - | Authentication & Authorization |
| **PostgreSQL** | - | Database chính |
| **Maven** | - | Build tool |
| **Lombok** | - | Giảm boilerplate code |

### Frontend

| Công nghệ | Phiên bản | Mô tả |
|-----------|-----------|-------|
| **React** | 19.2.0 | UI Library |
| **TypeScript** | 5.9.3 | Type-safe JavaScript |
| **Vite** | 7.2.4 | Build tool & dev server |
| **TailwindCSS** | 4.1.17 | Utility-first CSS framework |
| **React Router** | 7.9.6 | Client-side routing |
| **Redux Toolkit** | 2.10.1 | State management |
| **TanStack Query** | 5.90.10 | Server state management |
| **Axios** | 1.13.2 | HTTP client |
| **Lucide React** | 0.554.0 | Icon library |
| **Sonner** | 2.0.7 | Toast notifications |

## 📁 Cấu trúc thư mục

```
SEHK251_Tutor/
├── Backend/                    # Spring Boot Backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/example/
│   │   │   │   ├── config/        # Configuration classes
│   │   │   │   ├── controller/    # REST Controllers
│   │   │   │   ├── model/         # Entity models
│   │   │   │   ├── repository/    # JPA Repositories
│   │   │   │   ├── service/       # Business logic
│   │   │   │   └── dto/           # Data Transfer Objects
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   ├── pom.xml
│   └── .env                    # Environment variables
│
├── Frontend/                   # React Frontend
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   ├── pages/              # Page components
│   │   ├── hooks/              # Custom React hooks
│   │   ├── store/              # Redux store
│   │   ├── services/           # API services
│   │   ├── types/              # TypeScript types
│   │   ├── utils/              # Utility functions
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/
│   ├── swagger-api-spec.yaml   # API specification
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── .env                    # Environment variables
│
├── SE251__ProjectDesc__Tutor_v1.pdf  # Project description
└── README.md
```

## 🚀 Cài đặt

### Yêu cầu hệ thống

- **Java**: JDK 21 hoặc cao hơn
- **Node.js**: v18.0.0 hoặc cao hơn
- **PostgreSQL**: v14.0 hoặc cao hơn
- **Maven**: v3.8.0 hoặc cao hơn
- **npm**: v9.0.0 hoặc cao hơn

### 1. Clone repository

```bash
git clone <repository-url>
cd SEHK251_Tutor
```

### 2. Cài đặt Backend

```bash
cd Backend

# Tạo file .env từ template
cat > .env << EOF
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/tutor_db
SPRING_DATASOURCE_USERNAME=your_username
SPRING_DATASOURCE_PASSWORD=your_password
EOF

# Build project
./mvnw clean install

# Chạy application
./mvnw spring-boot:run
```

Backend sẽ chạy tại: `http://localhost:8080`

### 3. Cài đặt Frontend

```bash
cd Frontend

# Tạo file .env
cat > .env << EOF
VITE_API_BASE_URL=http://localhost:8080/api/v1
EOF

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev
```

Frontend sẽ chạy tại: `http://localhost:5173`

### 4. Cấu hình Database

```sql
-- Tạo database
CREATE DATABASE tutor_db;

-- Kết nối vào database
\c tutor_db

-- Tables sẽ được tự động tạo bởi Spring Boot JPA
```

## 💻 Sử dụng

### Development

#### Backend

```bash
cd Backend

# Chạy với profile development
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev

# Chạy tests
./mvnw test

# Build JAR file
./mvnw clean package
```

#### Frontend

```bash
cd Frontend

# Development server với hot reload
npm run dev

# Build cho production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Format code
npm run prettier:fix
```

### Production

#### Backend

```bash
cd Backend

# Build production JAR
./mvnw clean package -DskipTests

# Chạy JAR file
java -jar target/Tutor_Demo-0.0.1-SNAPSHOT.jar
```

#### Frontend

```bash
cd Frontend

# Build production bundle
npm run build

# Deploy thư mục dist/ lên server
```

## 📚 API Documentation

API documentation được viết theo chuẩn OpenAPI 3.0 và có thể xem tại:

- **Swagger UI**: `http://localhost:8080/swagger-ui.html` (khi backend đang chạy)
- **Swagger Spec**: [`Frontend/swagger-api-spec.yaml`](Frontend/swagger-api-spec.yaml)

### API Endpoints chính

#### Authentication
- `GET /api/v1/me` - Lấy thông tin user hiện tại

#### Student APIs
- `GET /api/v1/api/student/profile` - Lấy profile sinh viên
- `PUT /api/v1/api/student/profile/subjects` - Cập nhật môn học cần cải thiện
- `GET /api/v1/student/sessions` - Lấy danh sách buổi học đã đăng ký
- `POST /api/v1/student/sessions/{sessionId}/cancel` - Hủy đăng ký buổi học
- `POST /api/v1/student/sessions/{sessionId}/feedback` - Gửi feedback
- `POST /api/v1/student/requests` - Yêu cầu mở lớp mới

#### Session APIs
- `GET /api/v1/sessions/public` - Lấy danh sách buổi học công khai
- `GET /api/v1/sessions/search` - Tìm kiếm buổi học
- `POST /api/v1/sessions/{sessionId}/enroll` - Đăng ký buổi học

#### Tutor APIs
- `GET /api/v1/tutor/{tutorId}` - Lấy thông tin gia sư
- `GET /api/v1/tutor/{tutorId}/session` - Lấy danh sách buổi học của gia sư

#### Library APIs
- `GET /api/v1/library/documents` - Lấy danh sách tài liệu
- `POST /api/v1/library/documents/upload` - Upload tài liệu

### Response Format

Tất cả API responses đều tuân theo format chuẩn:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Success",
  "data": { ... },
  "timestamp": "2025-11-23T16:26:31+07:00"
}
```

## 🧪 Testing

### Backend Testing

```bash
cd Backend

# Chạy tất cả tests
./mvnw test

# Chạy test với coverage
./mvnw test jacoco:report

# Chạy integration tests
./mvnw verify
```

### Frontend Testing

```bash
cd Frontend

# Lint checking
npm run lint

# Type checking
npx tsc --noEmit

# Format checking
npm run prettier
```

## 🤝 Đóng góp

Dự án này là bài tập lớn môn học, hiện tại không nhận contributions từ bên ngoài.

### Development Workflow

1. Tạo branch mới từ `develop`
2. Implement feature/fix
3. Test kỹ lưỡng
4. Tạo Pull Request
5. Code review
6. Merge vào `develop`
7. Merge vào `main`

### Coding Standards

#### Backend
- Follow Java Code Conventions
- Sử dụng Lombok để giảm boilerplate
- Viết Javadoc cho public methods

#### Frontend
- Follow Airbnb JavaScript Style Guide
- Sử dụng TypeScript strict mode
- Functional components với hooks
- Prettier để format code

## 👥 Tác giả

**Nhóm sinh viên Công nghệ Phần mềm - HK251**

### 💻 Fullstack Developer
- **Đặng Trần Công Chính** - 2210387 ([chinh.dang5504@hcmut.edu.vn](mailto:chinh.dang5504@hcmut.edu.vn))

### ⚙️ Backend Team
- **Trần Quốc Cường** - 2310405
- **Nguyễn Chu Nguyên Chương** - 2310365
- **Trần Nguyễn Mạnh Cường** - 2210446
- **Nguyễn Tấn Dũng** - 2310561


### 🎨 Frontend Team
- **Trương Nguyễn Gia Bảo** - 2310271
- **Dương Khả Vân** - 2313866
---

**Giảng viên hướng dẫn**: [Tên giảng viên]

**Trường**: Đại học Bách Khoa TP.HCM  
**Khoa**: Khoa Khoa học và Kỹ thuật Máy tính  
**Môn học**: Công nghệ Phần mềm (SE251)  
**Học kỳ**: HK241 - Năm học 2024-2025

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Liên hệ

Nếu có bất kỳ câu hỏi nào, vui lòng liên hệ:

- **Email**: chinh.dang5504@hcmut.edu.vn
- **GitHub Issues**: [Create an issue](../../issues)

---

<div align="center">
  <p>Made with ❤️ by HCMUT Students</p>
  <p>© 2025 HCMUT Tutor System. All rights reserved.</p>
</div>
