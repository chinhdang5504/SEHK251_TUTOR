import publicAxios from '@/lib/publicAxios'; 
import PrivateAxios from '@/lib/privateAxios';

interface GetSessionParams {
  limit?: number; 
}

const homeApi = {
  /* <--- 1. Recent Sessions ---> */
  // Dùng publicAxios vì ai vào trang chủ cũng xem được
  async getRecentSessions(params: GetSessionParams) {
    const res = await publicAxios.get('/public/sessions/recent', { params });
    return res.data;
  },

  /* <--- 2. Get it now ---> */
  // Cần PrivateAxios vì phải đăng nhập mới đăng ký được
  async enrollSession(sessionId: number) {
    const res = await PrivateAxios.post(`/classes/${sessionId}/enroll`);
    return res.data;
  },

  /* <--- 3. Lấy số lượng người truy cập ---> */
  async getVisitorCount() {
    const res = await publicAxios.get('/public/visitors');
    return res.data;
  }
};

export default homeApi;