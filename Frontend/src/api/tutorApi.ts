import PrivateAxios from '@/lib/privateAxios'

const tutorApi = {
  /* <--- Search tutors by query keyword ---> */
  async searchTutor(query: string) {
    const res = await PrivateAxios.get('/tutors/search', {
      params: { q: query }, 
    })
    return res.data 
  },

  /* <--- Get tutor information by ID ---> */
  async getTutorById(id: string) {
    const res = await PrivateAxios.get(`/tutors/${id}`)
    return res.data
  },

  /* <--- Get all classes of a tutor ---> */
  async getClassesByTutor(id: string) {
    const res = await PrivateAxios.get(`/tutors/${id}/classes`)
    return res.data
  },

  /* <--- Enroll a class ---> */
  async enrollClass(id: string) {
    const res = await PrivateAxios.post(`/classes/${id}/enroll`)
    return res.data
  },

  /* <--- Get tutor availability by date/time ---> */
  async getTutorAvailability(id: string, date: string) {
    const res = await PrivateAxios.get(`/tutors/${id}/availability`, {
      params: { date},
    })
    return res.data
  },
}

export default tutorApi
