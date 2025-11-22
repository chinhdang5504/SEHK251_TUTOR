import PrivateAxios from '@/lib/privateAxios'

interface GetSessionParams {
  page: number;
  limit: number;
  date?: string;      // Lọc theo ngày (dùng khi click vào lịch)
  startDate?: string; // Dùng để lấy dữ liệu cho cả tuần/tháng (để hiển thị chấm tròn trên lịch)
  endDate?: string;
}

interface FeedbackData {
  rating: number;
  comment: string;
}

const studentApi = {
  /* <--- 1. Lấy danh sách buổi học đã đăng ký ---> */
  // Dùng cho cả Table và Calendar
  async getRegisteredSessions(params: GetSessionParams) {
    const res = await PrivateAxios.get('/student/sessions', { params })
    return res.data 
  },

  /* <--- 2. Hủy đăng ký một buổi học ---> */
  // Nút "Cancel Session" trong menu
  async cancelSession(sessionId: number) {
    const res = await PrivateAxios.post(`/student/sessions/${sessionId}/cancel`)
    return res.data
  },

  /* <--- 3. Gửi Feedback cho Tutor ---> */
  // Nút "Feedback" trong menu
  async sendFeedback(sessionId: number, data: FeedbackData) {
    const res = await PrivateAxios.post(`/student/sessions/${sessionId}/feedback`, data)
    return res.data
  },

  /* <--- 4. Chia sẻ buổi học (Tùy chọn) ---> */
  // Nút "Share" trong menu
  async shareSession(sessionId: number) {
    // có thể trả về một link chia sẻ hoặc gửi email mời bạn bè
    const res = await PrivateAxios.post(`/student/sessions/${sessionId}/share`)
    return res.data
  }
}

export default studentApi