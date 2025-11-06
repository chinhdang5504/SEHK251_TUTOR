import axiosClient from "./axiosClient";

const profileApi = {
  // 🔍 Tìm kiếm tutor
  async searchTutor(query: string) {
    const response = await axiosClient.get(`/tutors/search`, {
      params: { q: query },
    });
    return response;
  },

  // 📘 Lấy thông tin tutor theo ID
  async getTutorById(id: string) {
    const response = await axiosClient.get(`/tutors/${id}`);
    return response;
  },

  // 🧩 Lấy danh sách lớp của tutor
  async getClassesByTutor(id: string) {
    const response = await axiosClient.get(`/tutors/${id}/classes`);
    return response;
  },

  // 📝 Ghi danh vào lớp học
  async enrollClass(classId: number) {
    const response = await axiosClient.post(`/classes/${classId}/enroll`);
    return response;
  },
};

export default profileApi;
