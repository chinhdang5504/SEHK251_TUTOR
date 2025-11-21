import { useQuery } from '@tanstack/react-query'
import facultyApi from '@/api/facultyApi'
import { mockFaculty } from '@/mocks/faculty.mock'

export const useFaculty = (useApi = false) => {
  return useQuery({
    queryKey: ['Faculty'], 
    queryFn: async () => {
      if (useApi) {
        const data = await facultyApi.getAllFaculties()
        return data
      }
      return mockFaculty
    },
    staleTime: 1000 * 60 * 5, 
    retry: 1, 
  })
}
