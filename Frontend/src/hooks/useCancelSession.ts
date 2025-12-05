import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cancelRegisteredSession } from '@/api/studentAPI'
import { toast } from 'sonner'

export const useCancelSession = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (sessionId: string) => {
      console.log(`Mock cancel session ${sessionId}`)
      return await cancelRegisteredSession(sessionId)
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['student-sessions'] })
      toast('Đã hủy buổi học thành công!')
    }
  })
}
