import { useQuery, useMutation } from '@tanstack/react-query'
import { sessionDetails, registeredStudents } from '@/mocks/sessiontutor.mock'
import { getRegisteredStudents, getSessionDetail, uploadSessionMinutes } from '@/api/tutorApi'
import { toast } from 'sonner'

export const useSessionDetail = (sessionId: string, page: number, limit: number) => {
  const { data: sessionInfo, isLoading: isInfoLoading } = useQuery({
    queryKey: ['session-detail', sessionId],
    queryFn: async () => {
      try {
        const response = await getSessionDetail(sessionId)
        return response.data
      } catch (error) {
        console.warn('⚠️ API error, using mock session details:', error)
        return sessionDetails
      }
    }
  })

  const { data: studentsData, isLoading: isStudentsLoading } = useQuery({
    queryKey: ['session-students', sessionId, page, limit],
    queryFn: async () => {
      try {
        const response = await getRegisteredStudents(sessionId, page, limit)
        return {
          data: response.data.data,
          totalPages: response.data.totalPages
        }
      } catch (error) {
        console.warn('⚠️ API error, using mock students data:', error)
        // Fallback to mock data with pagination
        await new Promise((r) => setTimeout(r, 500))
        const start = (page - 1) * limit
        const end = page * limit
        const paginated = registeredStudents.slice(start, end)
        const totalPages = Math.ceil(registeredStudents.length / limit)
        return { data: paginated, totalPages }
      }
    },
    placeholderData: (prev) => prev
  })

  const { mutate: uploadReport, isPending: isUploading } = useMutation({
    mutationFn: async (file: File) => {
      return await uploadSessionMinutes(Number(sessionId), file)
    },
    onSuccess: () => {
      toast.success('Session minutes uploaded successfully!')
    },
    onError: () => {
      toast.error('Failed to upload session minutes')
    }
  })

  return {
    sessionInfo: sessionInfo || null,
    students: studentsData?.data || [],
    totalPages: studentsData?.totalPages || 0,
    isLoading: isInfoLoading || isStudentsLoading,
    isUploading,
    uploadReport
  }
}
