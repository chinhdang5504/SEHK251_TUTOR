import PrivateAxios from '@/lib/privateAxios'

interface GetDocsParams {
  page: number;
  limit: number;
}

const libraryApi = {
  /* <--- 1. Lấy danh sách tài liệu (Có phân trang) ---> */
  async getDocuments(params: GetDocsParams) {
    const { page, limit } = params;
    const res = await PrivateAxios.get('/library/documents', {
      params: { page, limit } 
    })
    return res.data 
  },

  /* <--- 2. Upload tài liệu mới ---> */
  async uploadDocument(data: FormData) {
    const res = await PrivateAxios.post('/library/documents', data)
    return res.data
  },

  /* <--- 3. Download tài liệu ---> */
  async downloadDocument(id: number) {
    const res = await PrivateAxios.get(`/library/documents/${id}/download`, {
      responseType: 'blob' // Quan trọng: Để nhận file nhị phân
    })
    return res.data
  }
}

export default libraryApi