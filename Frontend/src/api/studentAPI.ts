import PrivateAxios from '@/lib/privateAxios'
import type { StudentProfileApi } from '@/types/profile'
import type { ApiListResponse, ApiResponse, PaginatedData } from '@/types/responseAPI'
import type { Session } from '@/types/session'
import type { Tutor } from '@/types/tutor'

interface GetSessionParams {
  page: number
  limit: number
  date?: string
  startDate?: string
  endDate?: string
}

interface FeedbackData {
  rating: number
  comment: string
}

export interface ClassPetitionRequest {
  tutorId: string
  subjectName: string
  desiredDate?: string
  note?: string
}

export const getStudentProfile = async () => {
  const response = await PrivateAxios.get<ApiResponse<StudentProfileApi>>('/student/profile')
  return response.data.data
}

export const updateStudentProfile = async (
  profileData: Partial<StudentProfileApi>
): Promise<ApiResponse<StudentProfileApi>> => {
  const response = await PrivateAxios.put<ApiResponse<StudentProfileApi>>(
    '/student/profile',
    profileData
  )
  return response.data
}

export const updateSubject = async (subjects: string[]): Promise<ApiResponse<{ improvementSubjects: string[] }>> => {
  const response = await PrivateAxios.put<ApiResponse<{ improvementSubjects: string[] }>>(
    '/student/profile/subjects',
    {
      improvementSubjects: subjects
    }
  )
  return response.data
}

export const enrollSession = async (sessionId: string): Promise<ApiResponse<{ message: string }>> => {
  const res = await PrivateAxios.post<ApiResponse<{ message: string }>>(`/sessions/${sessionId}/enroll`)
  return res.data
}

export const requestClass = async (data: ClassPetitionRequest): Promise<ApiResponse<{ message: string }>> => {
  const res = await PrivateAxios.post<ApiResponse<{ message: string }>>('/student/requests', data)
  return res.data
}

export const getRegisteredSessions = async (params: GetSessionParams): Promise<Session[]> => {
  const res = await PrivateAxios.get<ApiListResponse<Session>>('/student/sessions', { params })
  return res.data.data.data
}

export const cancelRegisteredSession = async (sessionId: string): Promise<ApiResponse<{ message: string }>> => {
  const res = await PrivateAxios.post<ApiResponse<{ message: string }>>(`/student/sessions/${sessionId}/cancel`)
  return res.data
}

export const sendFeedback = async (sessionId: number, data: FeedbackData): Promise<ApiResponse<{ message: string }>> => {
  const res = await PrivateAxios.post<ApiResponse<{ message: string }>>(`/student/sessions/${sessionId}/feedback`, data)
  return res.data
}

export const searchTutor = async (query: string): Promise<PaginatedData<Tutor>> => {
  const res = await PrivateAxios.get<ApiListResponse<Tutor>>('/tutors/search', {
    params: { q: query }
  })
  return res.data.data
}

export const getClassByTutor = async (id: string): Promise<Session[]> => {
  const res = await PrivateAxios.get<ApiResponse<Session[]>>(`/tutor/${id}/session`)
  return res.data.data
}

export const getTutorById = async (id: string): Promise<ApiResponse<Tutor>> => {
  const res = await PrivateAxios.get<ApiResponse<Tutor>>(`/tutor/profile/${id}`)
  return res.data
}

export const getSessions = async (params: GetSessionParams): Promise<Session[]> => {
  const res = await PrivateAxios.get<ApiListResponse<Session>>('/sessions/public', {
    params
  })
  return res.data.data.data
}

export const searchSessions = async (query: string): Promise<Session[]> => {
  const res = await PrivateAxios.get<ApiListResponse<Session>>('/session/search', {
    params: { q: query }
  })
  return res.data.data.data
}
