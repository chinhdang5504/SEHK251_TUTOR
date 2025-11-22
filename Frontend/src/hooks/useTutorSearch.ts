import { useQuery } from '@tanstack/react-query'
import { mockTutors } from '@/mocks/tutor.mock'
import { searchTutor } from '@/api/studentAPI'
import type { Tutor } from '@/types/tutor'

export const useTutorSearch = (query: string) => {
  return useQuery<Tutor[], Error>({
    queryKey: ['tutorSearch', query],
    queryFn: async () => {
      try {
        const data = await searchTutor(query)
        if (data && data.totalItems > 0) return data
        throw new Error('No tutors found from API')
      } catch (err) {
        const filtered = mockTutors.filter(
          (t) =>
            t.fullName.toLowerCase().includes(query.toLowerCase()) ||
            t.subject.toLowerCase().includes(query.toLowerCase()) ||
            t.faculty.toLowerCase().includes(query.toLowerCase())
        )
        return filtered
      }
    }
  })
}
