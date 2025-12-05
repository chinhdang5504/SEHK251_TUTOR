import type { Tutor } from '@/types/tutor'
import type { Session } from '@/types/session'

export const mockTutor: Tutor = {
  id: 'T1001',
  fullName: 'Nguyen Van A',
  email: 'tutor@example.com',
  avatar: 'https://i.pravatar.cc/150?img=10',
  faculty: 'Computer Science',
  bio: 'Đam mê lập trình và giảng dạy, giúp sinh viên nắm vững tư duy thuật toán.',
  subject: 'Computer Science',
  teachingSubjects: ['Programming', 'Algorithms', 'Data Structures'],
  rating: 4.9
}

export const mockClasses: Session[] = [
  {
    id: '1',
    title: 'Advanced Programming',
    description: 'Learn advanced concepts in programming',
    tutorId: 't1',
    tutorName: 'Duong Huy Tuong',
    date: '2025-11-30',
    startTime: '07:00',
    endTime: '08:30',
    room: 'H-101',
    currentEnrollment: 0,
    maxCapacity: 10,
    status: 'Scheduled',
    enrolled: false
  },
  {
    id: '2',
    title: 'Data Structures',
    description: 'Master common data structures',
    tutorId: 't2',
    tutorName: 'Lam Duan',
    date: '2025-11-30',
    startTime: '08:30',
    endTime: '10:00',
    room: 'H-102',
    currentEnrollment: 10,
    maxCapacity: 10,
    status: 'Scheduled',
    enrolled: false
  },
  {
    id: '3',
    title: 'Algorithms',
    description: 'Design and analyze algorithms',
    tutorId: 't3',
    tutorName: 'Phung Huu',
    date: '2025-11-30',
    startTime: '09:10',
    endTime: '10:40',
    room: 'H-103',
    currentEnrollment: 5,
    maxCapacity: 10,
    status: 'Scheduled',
    enrolled: false
  },
  {
    id: '4',
    title: 'Database Systems',
    description: 'Learn relational databases',
    tutorId: 't4',
    tutorName: 'Vo Van Tien',
    date: '2025-11-30',
    startTime: '10:30',
    endTime: '12:00',
    room: 'H-104',
    currentEnrollment: 10,
    maxCapacity: 10,
    status: 'Scheduled',
    enrolled: false
  },
  {
    id: '5',
    title: 'Software Engineering',
    description: 'Principles of software design',
    tutorId: 't5',
    tutorName: 'Do Minh Trung',
    date: '2025-11-30',
    startTime: '11:50',
    endTime: '13:20',
    room: 'H-105',
    currentEnrollment: 2,
    maxCapacity: 10,
    status: 'Completed',
    enrolled: false
  },
  {
    id: '6',
    title: 'Operating Systems',
    description: 'Understand OS concepts',
    tutorId: 't6',
    tutorName: 'Lai Minh Sam',
    date: '2025-11-30',
    startTime: '13:00',
    endTime: '14:30',
    room: 'H-106',
    currentEnrollment: 10,
    maxCapacity: 10,
    status: 'Canceled',
    enrolled: false
  }
]
