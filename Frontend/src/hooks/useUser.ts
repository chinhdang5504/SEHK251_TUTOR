// src/hooks/useCurrentUser.ts
import { useQuery } from '@tanstack/react-query'
import { getCurrentUser } from '@/api/userApi'

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser
  })
}
