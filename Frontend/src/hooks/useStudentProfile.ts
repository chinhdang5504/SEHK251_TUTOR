import { getStudentProfile } from '@/api/studentAPI'
import type { StudentProfileApi } from '@/types/profile'
import { useQuery } from '@tanstack/react-query'

export const useStudentProfile = () => {
  return useQuery<StudentProfileApi>({
    queryKey: ['studentProfile'],
    queryFn: getStudentProfile
  })
}
