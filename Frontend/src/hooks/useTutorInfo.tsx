import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getClassByTutor, getTutorById } from '@/api/studentAPI'
import { mockClasses, mockTutor } from '@/mocks/tutor.info.mock'

export const useTutorInfo = (id?: string) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  // Fetch tutor profile
  const { data: tutor, isLoading: tutorLoading, isError: tutorError } = useQuery({
    queryKey: ['tutor', id],
    queryFn: async () => {
      if (!id) return mockTutor
      try {
        const res = await getTutorById(id)
        return res.data
      } catch {
        return mockTutor
      }
    },
    enabled: !!id
  })

  // Fetch classes
  const { data: classes, isLoading: classesLoading, isError: classesError } = useQuery({
    queryKey: ['classes', id],
    queryFn: async () => {
      if (!id) return mockClasses
      try {
        const res = await getClassByTutor(id)
        return res
      } catch {
        return mockClasses
      }
    },
    enabled: !!id
  })

  const handleDateSelect = (date: string) => {
    setSelectedDate(date)
  }

  return {
    tutor,
    tutorLoading,
    classes,
    classesLoading,
    handleDateSelect,
    selectedDate,
    tutorError,
    classesError
  }
}
