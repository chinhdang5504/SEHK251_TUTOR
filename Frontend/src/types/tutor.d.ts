export interface Tutor {
  id: string
  fullName: string
  email: string
  phone: string
  address: string
  avatar: string | null
  bio: string
  teachingSubjects: string[]
  sex: 'Male' | 'Female' | 'Other'
  rating: number
  dateOfBirth: string
}
