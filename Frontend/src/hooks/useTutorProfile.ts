import { getTutorProfile } from '@/api/tutorApi'
import type { TutorProfileApi } from '@/types/profile'
import { useQuery } from '@tanstack/react-query'

export const useTutorProfile = () => {
    return useQuery<TutorProfileApi>({
        queryKey: ['tutorProfile'],
        queryFn: getTutorProfile
    })
}
