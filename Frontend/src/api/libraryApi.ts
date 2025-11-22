import PrivateAxios from '@/lib/privateAxios'

export const getDocuments = async ({ page, limit }: { page: number; limit: number }) => {
  const res = await PrivateAxios.get('/library/documents', {
    params: { page, limit }
  })
  return res.data
}

export const uploadDocument = async (formData: FormData) => {
  const res = await PrivateAxios.post('/library/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return res.data
}

export const downloadDocument = async (id: number) => {
  const res = await PrivateAxios.get(`/library/download/${id}`, {
    responseType: 'blob'
  })
  return res.data
}
