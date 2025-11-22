export interface User {
  username: ''
  token: ''
  refreshToken: ''
  role: 'admin' | 'student' | 'tutor' | 'guest'
  isAuthenticated: boolean
}
