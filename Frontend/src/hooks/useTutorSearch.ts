import { useQuery } from '@tanstack/react-query'
import { searchTutor } from '@/api/studentAPI'
import type { Tutor } from '@/types/tutor'

export const useTutorSearch = (query: string) => {
  return useQuery<Tutor[], Error>({
    queryKey: ['tutorSearch', query],
    queryFn: async () => {
      const data = await searchTutor(query)
      if (data && data.totalItems > 0) return data.data
    }
  })
}
