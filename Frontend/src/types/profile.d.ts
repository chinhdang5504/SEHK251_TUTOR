interface BaseProfileApi {
  id: string
  fullName: string
  email: string
  avatar: string
  phone: string
  address: string
  dateOfBirth: string // format: date
  sex: 'Male' | 'Female' | 'Other'
}

export interface StudentProfileApi extends BaseProfileApi {
  faculty: string
  improvementSubjects: string[]
}

export interface TutorProfileApi extends BaseProfileApi {
  bio: string
  teachingSubjects: string[]
  rating: number
}

export type UserProfileData = StudentProfileApi | TutorProfileApi

export interface Faculty {
  id: string
  name: string
}
