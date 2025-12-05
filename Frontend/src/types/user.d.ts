export interface User {
  fullName: string
  username: string
  token: string
  role: 'ADMIN' | 'STUDENT' | 'TUTOR' | ''
  isAuthenticated: boolean
}
