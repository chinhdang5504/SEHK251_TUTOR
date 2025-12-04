import { useQuery } from '@tanstack/react-query'
import { mockClasses } from '@/mocks/tutor.info.mock'
import { getMySessions } from '@/api/tutorApi'

export const useTutorDashboard = (page: number, limit: number) => {
  const { data: sessionData, isLoading: isSessionLoading } = useQuery({
    queryKey: ['tutor-sessions', page, limit],
    queryFn: async () => {
      try {
        const res = await getMySessions({ page, limit })
        return {
          data: res.data,
          totalPages: res.totalPages
        }
      } catch (error) {
        console.warn('⚠️ API error, using mock sessions data:', error)
        // Fallback to mock data with pagination
        await new Promise((r) => setTimeout(r, 500))
        const start = (page - 1) * limit
        const end = page * limit
        const paginated = mockClasses.slice(start, end)
        const totalPages = Math.ceil(mockClasses.length / limit)
        return { data: paginated, totalPages }
      }
    },
    placeholderData: (prev) => prev
  })

  return {
    sessions: sessionData?.data || [],
    totalPages: sessionData?.totalPages || 0,
    isLoading: isSessionLoading
  }
}
