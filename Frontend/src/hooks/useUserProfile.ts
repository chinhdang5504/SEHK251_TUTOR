import userApi from '@/api/userApi'
import { mockUser } from '@/mocks/user.mock'
import { useQuery } from '@tanstack/react-query'

export const useUserProfile = (useApi = false) => {
  return useQuery({
    queryKey: ['userProfile'], 
    queryFn: async () => {
      if (useApi) {
        const data = await userApi.getProfile()
        return data
      }
      return mockUser
    },
    staleTime: 1000 * 60 * 5, 
    retry: 1, 
  })
}
