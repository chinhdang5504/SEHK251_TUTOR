import { useMutation } from '@tanstack/react-query'
import { enrollSession } from '@/api/studentAPI'
import queryClient from '@/lib/queryClient'

export const useEnrollSession = () => {
  const mutation = useMutation({
    mutationFn: (sessionId: string) => enrollSession(sessionId),
    onSuccess: (_) => {
      queryClient.invalidateQueries({ queryKey: ['classes'] })
    },
    onError: (err: any) => {
      console.error('Failed to enroll session', err)
    }
  })

  return mutation
}
