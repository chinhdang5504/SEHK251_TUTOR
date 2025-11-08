import axiosClient from "./axiosClient";

const userApi = {
  async getProfile() {
    const response = await axiosClient.get("/user/profile");
    return response;
  },

  async updateProfile(data: any) {
    const response = await axiosClient.put("/user/profile", data);
    return response;
  },
};

export default userApi;
