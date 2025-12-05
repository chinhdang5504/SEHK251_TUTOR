export interface Student {
    id: string
    fullName: string
    email: string
    avatar: string
    faculty: string
    improvementSubjects: string[]
    phone?: string
    address?: string
    dateOfBirth?: string
    sex?: 'Male' | 'Female' | 'Other'
}

export interface RegisteredStudent {
    id: string
    fullName: string
    email: string
    avatar: string
}
