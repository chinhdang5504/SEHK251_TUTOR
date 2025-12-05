export type Session = {
  id: string
  title: string
  description: string
  tutorId: string
  tutorName: string
  date: string
  startTime: string
  endTime: string
  room: string
  currentEnrollment: number
  capacity: number
  status: 'Canceled' | 'Completed' | 'Scheduled'
  enrolled?: boolean
}
