import PrivateAxios from '@/lib/privateAxios'
import type { ApiResponse } from '@/types/responseAPI'
import type { User } from '@/types/user'

export const getCurrentUser = async (): Promise<User> => {
  const response = await PrivateAxios.get<ApiResponse<User>>('/me')
  return response.data.data
}

