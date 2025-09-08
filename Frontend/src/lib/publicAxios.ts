import { BASE_URL } from '@/utils/constant'
import axios from 'axios'

const PublicAxios = axios.create({
  baseURL: BASE_URL,
  timeout: 1000 * 60 * 10
})

PublicAxios.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

PublicAxios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default PublicAxios
