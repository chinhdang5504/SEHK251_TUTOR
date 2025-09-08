export interface User {
  username: ''
  token: ''
  refreshToken: ''
  role: 'admin' | 'student' | 'instructor' | 'guest'
  isAuthenticated: boolean
}
