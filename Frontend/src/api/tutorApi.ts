import PrivateAxios from '@/lib/privateAxios'
import type { ApiListResponse } from '@/types/responseAPI'
import type { Session } from '@/types/session'

interface GetSessionsParams {
  page: number
  limit: number
  status?: string
}

export const getMySessions = async (params: GetSessionsParams) => {
  const res = await PrivateAxios.get<ApiListResponse<Session>>('/tutor/sessions', { params })
  return res.data.data
}

export const getRegisteredStudents = async (sessionId: string, page = 1, limit = 6) => {
  const res = await PrivateAxios.get(`/tutor/sessions/${sessionId}/students`, {
    params: { page, limit }
  })
  return res.data
}

export const uploadSessionMinutes = async (sessionId: number, file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  const res = await PrivateAxios.post(`/tutor/sessions/${sessionId}/minutes`, formData)
  return res.data
}

export const getSessionDetail = async (sessionId: string) => {
  const res = await PrivateAxios.get(`/tutor/sessions/${sessionId}`)
  return res.data
}
