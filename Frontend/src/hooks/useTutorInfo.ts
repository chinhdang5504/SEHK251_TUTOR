import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import tutorApi from '@/api/tutorApi'
import { mockTutors, mockClasses, mockAvailability } from '@/mocks/tutor.info.mock'
import type { ClassItem } from '@/types/tutor'

export const useTutorInfo = (id?: string, useApi = false) => {
  const queryClient = useQueryClient()
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  // <--- Fetch Tutor Info --->
  const {
    data: tutor,
    isLoading: tutorLoading,
  } = useQuery({
    queryKey: ['tutor', id],
    queryFn: async () => {
      if (!useApi || !id) return mockTutors.find(t => t.id === id)
      const res = await tutorApi.getTutorById(id)
      return res.data
    },
    enabled: !!id,
  })

  // <--- Fetch Classes --->
  const {
    data: classes = [],
    isLoading: classesLoading,
  } = useQuery({
    queryKey: ['classes', id],
    queryFn: async () => {
      if (!useApi || !id) return mockClasses.filter(c => c.id === id)
      const res = await tutorApi.getClassesByTutor(id)
      return res.data
    },
    enabled: !!id,
  })

  // <--- Availability --->
  const {
    data: availability,
    isLoading: availabilityLoading,
  } = useQuery({
    queryKey: ['availability', id, selectedDate],
    queryFn: async () => {
      if (!useApi || !id || !selectedDate) {
        const mock = mockAvailability[selectedDate ?? ''] || { available: false, hours: '' }
        return mock
      }
      const res = await tutorApi.getTutorAvailability(id, selectedDate)
      return res.data
    },
    enabled: !!id && !!selectedDate, 
  })

  const handleDateSelect = (date: string) => {
    setSelectedDate(date)
  }

  // <--- Enroll Class Mutation --->
  const { mutate: enrollClass, isPending: enrolling } = useMutation({
  mutationFn: async (classId: string) => {
    if (!useApi) {
      const updated = classes.map((c: ClassItem) =>
        c.id === classId ? { ...c, status: 'Enrolled' } : c
      )
      queryClient.setQueryData(['classes', id], updated)
      return updated
    }
    const res = await tutorApi.enrollClass(classId)
    return res.data
  },
  onSuccess: (data) => {
    if (useApi && data) {
      queryClient.setQueryData(['classes', id], (oldClasses: ClassItem[] = []) => {
        return oldClasses.map(c =>
          c.id === data.id ? { ...c, status: 'Enrolled' } : c
        )
      })
    }
  },
})


  return {
    tutor,
    tutorLoading,
    classes,
    classesLoading,
    enrolling,
    enrollClass,
    handleDateSelect,
    selectedDate,
    isAvailable: availability?.available ?? null,
    availableHours: availability?.hours ?? '',
    availabilityLoading,
  }
}
