import type { User } from '@/types/user'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState: User = {
  fullName: '',
  username: '',
  token: '',
  role: '',
  isAuthenticated: false
}

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Omit<User, 'isAuthenticated'>>) => {
      state.username = action.payload.username
      state.token = action.payload.token
      state.role = action.payload.role
      state.fullName = action.payload.fullName
      state.isAuthenticated = true
    },
    logout: (state) => {
      state.username = ''
      state.token = ''
      state.role = ''
      state.isAuthenticated = false
    }
  }
})

export const { login, logout } = UserSlice.actions
export default UserSlice.reducer
