import type { Session, Notification, Feedback } from '@/pages/Tutor/Dashboard/mysessions.types';

export const allMySessions: Session[] = [
  { id: 1, date: '30/11/2025', time: '7:00', subject: 'Advanced Programming', room: 'H-101', status: 'Canceled' },
  { id: 2, date: '30/11/2025', time: '8:30', subject: 'Advanced Programming', room: 'H-101', status: 'Completed' },
  { id: 3, date: '30/11/2025', time: '9:10', subject: 'Advanced Programming', room: 'H-101', status: 'Scheduled' },
  { id: 4, date: '30/11/2025', time: '10:30', subject: 'Advanced Programming', room: 'H-101', status: 'Canceled' },
  { id: 5, date: '30/11/2025', time: '11:50', subject: 'Advanced Programming', room: 'H-101', status: 'Completed' },
  { id: 6, date: '30/11/2025', time: '12:00', subject: 'Advanced Programming', room: 'H-101', status: 'Scheduled' },
  { id: 7, date: '01/12/2025', time: '7:00', subject: 'Web Programming', room: 'H-202', status: 'Scheduled' },
  { id: 8, date: '01/12/2025', time: '8:30', subject: 'Web Programming', room: 'H-202', status: 'Scheduled' },
];

export const notifications: Notification[] = [
  { id: 1, text: 'Your session: Advanced Programming is tomorrow at 2 PM.', isReminder: true },
  { id: 2, text: 'A student has submitted feedback for your last session.' },
  { id: 3, text: 'A new public session on Computer Network has been added' },
];

export const feedbacks: Feedback[] = [
  { id: 1, student: 'Nguyễn Văn A', session: 'Web Programming', text: 'Thank you, sir, for your clear explanations and dedicated teaching.' },
  { id: 2, student: 'Nguyễn Thị B', session: 'Entrepreneurship and Innovation', text: 'You always inspire me to learn more and do better.' },
];