// src/pages/Student/dashboard.types.ts

export type RegisteredSession = {
  id: number;
  date: string;
  time: string;
  subject: string;
  room: string;
  tutor: string;
  actionType: 'cancel' | 'feedback' | 'none';
};

export type WeekDay = {
  day: string;
  date: number;
  fullDate: string;
};