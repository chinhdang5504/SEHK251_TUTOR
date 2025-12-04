import PrivateAxios from '@/lib/privateAxios'
import type { ApiListResponse, ApiResponse } from '@/types/responseAPI'
import type { Document } from '@/types/library'

export const getDocuments = async ({
  page,
  limit
}: {
  page: number
  limit: number
}): Promise<ApiListResponse<Document>> => {
  const res = await PrivateAxios.get<ApiListResponse<Document>>('/library/documents', {
    params: { page, limit }
  })
  return res.data
}

export const uploadDocument = async (formData: FormData): Promise<ApiResponse<Document>> => {
  const res = await PrivateAxios.post<ApiResponse<Document>>('/library/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return res.data
}

export const downloadDocument = async (id: number): Promise<Blob> => {
  const res = await PrivateAxios.get<Blob>(`/library/download/${id}`, {
    responseType: 'blob'
  })
  return res.data
}

