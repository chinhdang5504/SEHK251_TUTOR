export interface User {
  fullName: ''
  username: ''
  token: ''
  refreshToken: ''
  role: 'admin' | 'student' | 'tutor' | ''
  isAuthenticated: boolean
}
