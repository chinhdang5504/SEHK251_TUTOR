import type { RegisteredSession, WeekDay } from "@/pages/Student/Dashboard/dashboard.types";

export const mockAllRegisteredSessions: RegisteredSession[] = [
  // Tuần 1
  { id: 1, date: '30/11/2025', time: '7:00', subject: 'Advanced Programming', room: 'H-101', tutor: 'Duong Huy Tuong', actionType: 'cancel' },
  { id: 2, date: '30/11/2025', time: '8:30', subject: 'English 2', room: 'H-101', tutor: 'Lam Duan', actionType: 'cancel' },
  { id: 3, date: '01/12/2025', time: '9:10', subject: 'Network Computer', room: 'H-101', tutor: 'Phung Huu', actionType: 'feedback' },
  { id: 4, date: '02/12/2025', time: '10:30', subject: 'Web', room: 'H-101', tutor: 'Vo Van Tien', actionType: 'cancel' },
  { id: 5, date: '02/12/2025', time: '11:50', subject: 'Calculus 1', room: 'H-101', tutor: 'Do Minh Trung', actionType: 'cancel' },
  { id: 6, date: '03/12/2025', time: '12:00', subject: 'English 2', room: 'H-101', tutor: 'Lai Minh Sam', actionType: 'none' },
  { id: 7, date: '04/12/2025', time: '7:00', subject: 'Physics 1', room: 'H-101', tutor: 'Nguyen Van A', actionType: 'cancel' },
  // Tuần 2
  { id: 8, date: '08/12/2025', time: '9:00', subject: 'Data Structures', room: 'H-102', tutor: 'Tran Van B', actionType: 'cancel' },
];

// Dữ liệu cho Lịch (Appointments) 4 tuần
export const mockAllWeeksData: WeekDay[][] = [
  // Tuần 1 (Page 0)
  [
    { day: 'Mon', date: 30, fullDate: '30/11/2025' },
    { day: 'Tue', date: 1, fullDate: '01/12/2025' },
    { day: 'Wed', date: 2, fullDate: '02/12/2025' },
    { day: 'Thu', date: 3, fullDate: '03/12/2025' },
    { day: 'Fri', date: 4, fullDate: '04/12/2025' },
    { day: 'Sat', date: 5, fullDate: '05/12/2025' },
    { day: 'Sun', date: 6, fullDate: '06/12/2025' },
  ],
  // Tuần 2 (Page 1)
  [
    { day: 'Mon', date: 7, fullDate: '07/12/2025' },
    { day: 'Tue', date: 8, fullDate: '08/12/2025' },
    { day: 'Wed', date: 9, fullDate: '09/12/2025' },
    { day: 'Thu', date: 10, fullDate: '10/12/2025' },
    { day: 'Fri', date: 11, fullDate: '11/12/2025' },
    { day: 'Sat', date: 12, fullDate: '12/12/2025' },
    { day: 'Sun', date: 13, fullDate: '13/12/2025' },
  ],
  // Tuần 3 (Page 2)
  [
    { day: 'Mon', date: 14, fullDate: '14/12/2025' },
    { day: 'Tue', date: 15, fullDate: '15/12/2025' },
    { day: 'Wed', date: 16, fullDate: '16/12/2025' },
    { day: 'Thu', date: 17, fullDate: '17/12/2025' },
    { day: 'Fri', date: 18, fullDate: '18/12/2025' },
    { day: 'Sat', date: 19, fullDate: '19/12/2025' },
    { day: 'Sun', date: 20, fullDate: '20/12/2025' },
  ],
  // Tuần 4 (Page 3)
  [
    { day: 'Mon', date: 21, fullDate: '21/12/2025' },
    { day: 'Tue', date: 22, fullDate: '22/12/2025' },
    { day: 'Wed', date: 23, fullDate: '23/12/2025' },
    { day: 'Thu', date: 24, fullDate: '24/12/2025' },
    { day: 'Fri', date: 25, fullDate: '25/12/2025' },
    { day: 'Sat', date: 26, fullDate: '26/12/2025' },
    { day: 'Sun', date: 27, fullDate: '27/12/2025' },
  ],
];

