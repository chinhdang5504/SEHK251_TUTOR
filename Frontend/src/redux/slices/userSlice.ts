import type { User } from '@/types/user'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState: User = {
  username: '',
  token: '',
  refreshToken: '',
  role: 'guest',
  isAuthenticated: false
}

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Omit<User, 'isAuthenticated'>>) => {
      state.username = action.payload.username
      state.token = action.payload.token
      state.refreshToken = action.payload.refreshToken
      state.role = action.payload.role
      state.isAuthenticated = true
    },
    logout: (state) => {
      state.username = ''
      state.token = ''
      state.refreshToken = ''
      state.role = 'guest'
      state.isAuthenticated = false
    }
  }
})

export const { login, logout } = UserSlice.actions
export default UserSlice.reducer
