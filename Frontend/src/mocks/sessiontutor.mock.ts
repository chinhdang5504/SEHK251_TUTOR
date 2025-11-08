import type { Student } from '@/pages/Tutor/sessiondetail';

export const sessionDetails = {
  day: '30',
  monthYear: 'DECEMBER, 2025',
  subject: 'ADVANCED PROGRAMMING',
  tutor: 'DINH THUAN LE',
  time: '12:00 - 14:00',
  room: 'H-101',
  studentCount: 100,
  status: 'SCHEDULED',
};

export const registeredStudents: Student[] = [
  { id: 1, name: 'Nguyen Van A', status: 'Absent' },
  { id: 2, name: 'Nguyen Van A', status: 'Attended' },
  { id: 3, name: 'Nguyen Van A', status: 'Absent' },
  { id: 4, name: 'Nguyen Van A', status: 'Attended' },
  { id: 5, name: 'Nguyen Van A', status: 'Absent' },
  { id: 6, name: 'Nguyen Van A', status: 'Attended' },
  { id: 7, name: 'Nguyen Van B', status: 'Attended' },
];