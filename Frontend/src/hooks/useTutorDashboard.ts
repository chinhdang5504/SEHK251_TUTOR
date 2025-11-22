import { useQuery } from '@tanstack/react-query'
import { mockClasses } from '@/mocks/tutor.info.mock'
import { getMySessions } from '@/api/tutorAPI'

export const useTutorDashboard = (page: number, limit: number, useApi = false) => {
  const { data: sessionData, isLoading: isSessionLoading } = useQuery({
    queryKey: ['tutor-sessions', page, limit],
    queryFn: async () => {
      if (!useApi) {
        await new Promise((r) => setTimeout(r, 500))

        const start = (page - 1) * limit
        const end = page * limit
        const paginated = mockClasses.slice(start, end)
        const totalPages = Math.ceil(mockClasses.length / limit)

        return { data: paginated, totalPages }
      }

      const res = await getMySessions({ page, limit })
      return res
    },
    placeholderData: (prev) => prev
  })

  return {
    sessions: sessionData?.data || [],
    totalPages: sessionData?.totalPages || 0,
    isLoading: isSessionLoading
  }
}
