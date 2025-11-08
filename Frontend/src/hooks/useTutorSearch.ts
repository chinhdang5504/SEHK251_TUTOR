import { useQuery } from '@tanstack/react-query'
import tutorApi from '@/api/tutorApi'
import { mockTutors } from '@/mocks/tutor.mock'

export const useTutorSearch = (query: string, useApi = false) => {
  return useQuery({
    queryKey: ['tutorSearch', query], 
    queryFn: async () => {
      if (useApi) {
        const data = await tutorApi.searchTutor(query)
        return data
      }

      // <--- Mock data filtering when API is disabled --->
      const filtered = mockTutors.filter(
        (t) =>
          t.fullName.toLowerCase().includes(query.toLowerCase()) ||
          t.subject.toLowerCase().includes(query.toLowerCase()) ||
          t.faculty.name.toLowerCase().includes(query.toLowerCase())
      )

      // <--- Simulate "not found" or empty results --->
      if (filtered.length === 0) {
        throw new Error('No tutors found')
      }

      return filtered
    },
    enabled: !!query, 
    retry: 1, 
    staleTime: 1000 * 60 * 5, 
  })
}
