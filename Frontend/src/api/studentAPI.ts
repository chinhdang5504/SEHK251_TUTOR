import PrivateAxios from '@/lib/privateAxios'
import type { StudentProfileApi } from '@/types/profile'
import type { ApiListResponse } from '@/types/responseAPI'
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

export const getStudentProfile = async (): Promise<StudentProfileApi> => {
  const response = await PrivateAxios.get<StudentProfileApi>('/api/student/profile')
  return response.data
}

export const updateStudentProfile = async (profileData: Partial<StudentProfileApi>) => {
  const response = await PrivateAxios.put('/api/student/profile', profileData)
  return response.data
}

export const updateSubject = async (subjects: string[]) => {
  const response = await PrivateAxios.put('/api/student/profile/subjects', {
    improvementSubjects: subjects
  })
  return response.data
}

export const enrollSession = async (sessionId: string) => {
  const res = await PrivateAxios.post(`/sessions/${sessionId}/enroll`)
  return res.data
}

export const requestClass = async (data: ClassPetitionRequest) => {
  const res = await PrivateAxios.post('/student/requests', data)
  return res.data
}

export const getRegisteredSessions = async (params: GetSessionParams) => {
  const res = await PrivateAxios.get<ApiListResponse<Session>>('/student/sessions', { params })
  return res.data.data
}

export const cancelRegisteredSession = async (sessionId: string) => {
  const res = await PrivateAxios.post(`/student/sessions/${sessionId}/cancel`)
  return res.data
}

export const sendFeedback = async (sessionId: number, data: FeedbackData) => {
  const res = await PrivateAxios.post(`/student/sessions/${sessionId}/feedback`, data)
  return res.data
}

export const searchTutor = async (query: string) => {
  const res = await PrivateAxios.get<ApiListResponse<Tutor>>('/tutors/search', {
    params: { q: query }
  })
  return res.data.data
}

export const getClassByTutor = async (id: string) => {
  const res = await PrivateAxios.get(`/tutor/${id}/session`)
  return res.data
}

export const getTutorById = async (id: string) => {
  const res = await PrivateAxios.get(`/tutor/${id}`)
  return res.data
}

export const getSessions = async (params: GetSessionParams) => {
  const res = await PrivateAxios.get<ApiListResponse<Session>>('/sessions/public', {
    params
  })
  return res.data.data
}

export const searchSessions = async (query: string) => {
  const res = await PrivateAxios.get<ApiListResponse<Session>>('/sessions/search', {
    params: { q: query }
  })
  return res.data.data.data
}
