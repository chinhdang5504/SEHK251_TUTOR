import PrivateAxios from '@/lib/privateAxios'
import type { ApiListResponse, ApiResponse } from '@/types/responseAPI'
import type { Session } from '@/types/session'
import type { RegisteredStudent } from '@/types/student'
import type { TutorProfileApi } from '@/types/profile'

interface GetSessionsParams {
  page: number
  limit: number
  status?: string
}

export const getMySessions = async (params: GetSessionsParams) => {
  const res = await PrivateAxios.get<ApiListResponse<Session>>('/tutor/sessions', { params })
  return res.data.data
}

export const getRegisteredStudents = async (
  sessionId: string,
  page = 1,
  limit = 6
): Promise<ApiListResponse<RegisteredStudent>> => {
  const res = await PrivateAxios.get<ApiListResponse<RegisteredStudent>>(
    `/tutor/sessions/${sessionId}/students`,
    {
      params: { page, limit }
    }
  )
  return res.data
}

export const uploadSessionMinutes = async (sessionId: number, file: File): Promise<ApiResponse<{ fileUrl: string }>> => {
  const formData = new FormData()
  formData.append('file', file)
  const res = await PrivateAxios.post<ApiResponse<{ fileUrl: string }>>(
    `/tutor/sessions/${sessionId}/minutes`,
    formData
  )
  return res.data
}

export const getSessionDetail = async (sessionId: string): Promise<ApiResponse<Session>> => {
  const res = await PrivateAxios.get<ApiResponse<Session>>(`/tutor/sessions/${sessionId}`)
  return res.data
}

export const getTutorProfile = async (): Promise<TutorProfileApi> => {
  const response = await PrivateAxios.get<ApiResponse<TutorProfileApi>>('/tutor/profile')
  return response.data.data
}

export const updateTutorSubjects = async (subjects: string[]): Promise<TutorProfileApi> => {
  const response = await PrivateAxios.put<TutorProfileApi>('/tutor/profile/subjects', {
    teachingSubjects: subjects
  })
  return response.data
}

export interface CreateSessionData {
  title: string
  description: string
  date: string
  startTime: string
  endTime: string
  room: string
  capacity: number
}

export const createSession = async (data: CreateSessionData): Promise<ApiResponse<Session>> => {
  const res = await PrivateAxios.post<ApiResponse<Session>>('/tutor/sessions', data)
  return res.data
}
