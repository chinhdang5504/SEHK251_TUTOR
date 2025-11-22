// src/pages/Tutor/sessiondetail.types.ts

// Định nghĩa trạng thái điểm danh của sinh viên
export type StudentStatus = 'Absent' | 'Attended' | string;

// Định nghĩa thông tin một sinh viên trong danh sách
export type Student = {
  id: number;
  name: string;
  status: StudentStatus;
};

// Định nghĩa cấu trúc thông tin buổi học (dựa trên code cũ của bạn)
export type SessionDetailInfo = {
  day: string | number;
  monthYear: string;
  subject: string;
  tutor: string;
  time: string;
  room: string;
  studentCount: number;
  status: string;
};