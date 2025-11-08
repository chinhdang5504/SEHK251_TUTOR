import PrivateAxios from '@/lib/privateAxios'

const userApi = {
  /* <--- Fetch user profile ---> */
  async getProfile() {
    const res = await PrivateAxios.get('/user/profile')
    return res.data 
  },

  /* <--- Update user profile ---> */
  async updateProfile(data: any) {
    const res = await PrivateAxios.put('/user/profile', data)
    return res.data
  },
}

export default userApi
