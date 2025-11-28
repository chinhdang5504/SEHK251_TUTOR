import type { Session } from '@/types/session'

export const mockRegisteredSessions: Session[] = [
  // Week -1
  {
    id: 'S001',
    title: 'Advanced Calculus Review',
    description: 'Deep dive into calculus fundamentals and techniques.',
    tutorId: 'T001',
    tutorName: 'Nguyen Minh Tri',
    date: '2025-11-15',
    startTime: '08:00',
    endTime: '10:00',
    room: 'H-201',
    currentEnrollment: 18,
    maxCapacity: 30,
    status: 'Scheduled'
  },
  {
    id: 'S002',
    title: 'Physics 1 - Mechanics',
    description: 'Newton laws, motions, and basic forces.',
    tutorId: 'T002',
    tutorName: 'Tran Hoai Lam',
    date: '2025-11-16',
    startTime: '13:00',
    endTime: '15:00',
    room: 'Online (Zoom)',
    currentEnrollment: 25,
    maxCapacity: 30,
    status: 'Scheduled'
  },

  // Week 0 (current week)
  {
    id: 'S003',
    title: 'Discrete Math',
    description: 'Logic, sets, relations, and functions.',
    tutorId: 'T003',
    tutorName: 'Vo Gia Bao',
    date: '2025-11-20',
    startTime: '09:00',
    endTime: '11:00',
    room: 'H-305',
    currentEnrollment: 22,
    maxCapacity: 30,
    status: 'Scheduled'
  },
  {
    id: 'S004',
    title: 'English Communication',
    description: 'Speaking practice with activities.',
    tutorId: 'T004',
    tutorName: 'Huynh Khanh',
    date: '2025-11-22',
    startTime: '10:00',
    endTime: '12:00',
    room: 'Online (Zoom)',
    currentEnrollment: 14,
    maxCapacity: 30,
    status: 'Scheduled'
  },
  {
    id: 'S005',
    title: 'Web Programming Basics',
    description: 'HTML, CSS, intro to JS.',
    tutorId: 'T005',
    tutorName: 'Pham Huu Nhat',
    date: '2025-11-23',
    startTime: '15:00',
    endTime: '17:00',
    room: 'H-102',
    currentEnrollment: 28,
    maxCapacity: 30,
    status: 'Scheduled'
  },

  // Week +1
  {
    id: 'S006',
    title: 'Data Structures - Linked List',
    description: 'Learn and code linked lists in C++.',
    tutorId: 'T006',
    tutorName: 'Hoang Thanh Tung',
    date: '2025-11-25',
    startTime: '08:00',
    endTime: '10:00',
    room: 'H-101',
    currentEnrollment: 20,
    maxCapacity: 30,
    status: 'Scheduled'
  },
  {
    id: 'S007',
    title: 'Operating System Introduction',
    description: 'Processes, threads, memory.',
    tutorId: 'T007',
    tutorName: 'Nguyen Van Huy',
    date: '2025-11-27',
    startTime: '13:00',
    endTime: '15:00',
    room: 'Online (Zoom)',
    currentEnrollment: 10,
    maxCapacity: 30,
    status: 'Scheduled'
  },

  // Week +2
  {
    id: 'S008',
    title: 'Database Design',
    description: 'ERD, normalization, SQL queries',
    tutorId: 'T008',
    tutorName: 'Dao Minh Quan',
    date: '2025-12-02',
    startTime: '09:00',
    endTime: '11:00',
    room: 'H-401',
    currentEnrollment: 16,
    maxCapacity: 30,
    status: 'Scheduled'
  },
  {
    id: 'S009',
    title: 'Computer Networks - Layer 1-3',
    description: 'Network basics, TCP/IP model.',
    tutorId: 'T009',
    tutorName: 'Phan Ngoc Long',
    date: '2025-12-03',
    startTime: '14:00',
    endTime: '16:00',
    room: 'H-105',
    currentEnrollment: 19,
    maxCapacity: 25,
    status: 'Scheduled'
  },

  // Week +3
  {
    id: 'S010',
    title: 'C Programming - Pointer Mastery',
    description: 'Pointer, memory address, malloc.',
    tutorId: 'T010',
    tutorName: 'Le Hoang Phuc',
    date: '2025-12-08',
    startTime: '08:00',
    endTime: '10:00',
    room: 'H-203',
    currentEnrollment: 26,
    maxCapacity: 30,
    status: 'Scheduled'
  },
  {
    id: 'S011',
    title: 'Java OOP',
    description: 'Inheritance, polymorphism, encapsulation.',
    tutorId: 'T011',
    tutorName: 'Bui Thanh',
    date: '2025-12-10',
    startTime: '09:30',
    endTime: '11:30',
    room: 'Online (MS Teams)',
    currentEnrollment: 18,
    maxCapacity: 25,
    status: 'Scheduled'
  },

  // Week +4
  {
    id: 'S012',
    title: 'Mobile Dev - Flutter Intro',
    description: 'Layout, state management basics.',
    tutorId: 'T012',
    tutorName: 'Nguyen Thu Ngan',
    date: '2025-12-15',
    startTime: '13:00',
    endTime: '15:00',
    room: 'H-202',
    currentEnrollment: 12,
    maxCapacity: 20,
    status: 'Scheduled'
  },
  {
    id: 'S013',
    title: 'Algorithm Practice',
    description: 'Greedy, DP, and recursion.',
    tutorId: 'T013',
    tutorName: 'Vo Huu Dat',
    date: '2025-12-17',
    startTime: '15:00',
    endTime: '17:00',
    room: 'Online (Zoom)',
    currentEnrollment: 30,
    maxCapacity: 30,
    status: 'Scheduled'
  }
]
