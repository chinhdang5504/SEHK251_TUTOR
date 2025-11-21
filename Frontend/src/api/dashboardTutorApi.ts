import PrivateAxios from '@/lib/privateAxios'

interface GetSessionsParams {
  page: number;
  limit: number;
  status?: string; 
}

const tutorApi = {
  /* <--- 1. Lấy danh sách lịch dạy (My Sessions) ---> */
  async getMySessions(params: GetSessionsParams) {
    const res = await PrivateAxios.get('/tutor/sessions', { params })
    return res.data 
  },

  /* <--- 2. Lấy danh sách thông báo (Notifications) ---> */
  // Hiển thị ở cột bên phải
  async getNotifications() {
    const res = await PrivateAxios.get('/tutor/notifications')
    return res.data
  },

  /* <--- 3. Lấy danh sách phản hồi (Recent Feedback) ---> */
  // Hiển thị ở cột bên phải
  async getRecentFeedbacks() {
    // Có thể thêm ?limit=5 để lấy 5 cái mới nhất
    const res = await PrivateAxios.get('/tutor/feedbacks?limit=5')
    return res.data
  },

  /* <--- 4. Upload Biên bản buổi dạy (Minutes) ---> */
  // Dùng khi Tutor vào trang chi tiết và upload file báo cáo
  async uploadSessionMinutes(sessionId: number, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    const res = await PrivateAxios.post(`/tutor/sessions/${sessionId}/minutes`, formData)
    return res.data
  },
  
  /* <--- 5. Lấy chi tiết một buổi học (Session Info) ---> */
  async getSessionDetail(sessionId: string) {
    const res = await PrivateAxios.get(`/tutor/sessions/${sessionId}`)
    return res.data
  },

  /* <--- 6. Lấy danh sách sinh viên của buổi học ---> */
  async getRegisteredStudents(sessionId: string, page = 1, limit = 6) {
    const res = await PrivateAxios.get(`/tutor/sessions/${sessionId}/students`, {
      params: { page, limit }
    })
    return res.data
  },

  /* <--- 7. Gửi Feedback cho sinh viên (Nút Feedback trong bảng) ---> */
  async sendStudentFeedback(sessionId: string, studentId: number, content: string) {
    const res = await PrivateAxios.post(`/tutor/sessions/${sessionId}/students/${studentId}/feedback`, { content })
    return res.data
  },
}

export default tutorApi