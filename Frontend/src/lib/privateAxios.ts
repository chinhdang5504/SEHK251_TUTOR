import { BASE_URL } from '@/utils/constant'
import axios from 'axios'

const PrivateAxios = axios.create({
  baseURL: BASE_URL,
  timeout: 1000 * 60 * 10
})

PrivateAxios.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

PrivateAxios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default PrivateAxios
