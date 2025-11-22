// src/pages/Tutor/mysessions.types.ts

// Định nghĩa trạng thái của buổi học
export type SessionStatus = 'Canceled' | 'Completed' | 'Scheduled' | string;

// Định nghĩa thông tin một buổi học
export type Session = {
  id: number;
  date: string;
  time: string;
  subject: string;
  room: string;
  status: SessionStatus;
};

// Định nghĩa thông báo
export type Notification = {
  id: number;
  text: string;
  isReminder?: boolean; // Có phải là nhắc nhở quan trọng không
};

// Định nghĩa phản hồi từ học viên
export type Feedback = {
  id: number;
  student: string; // Tên học viên
  session: string; // Tên buổi học
  text: string;    // Nội dung phản hồi
};