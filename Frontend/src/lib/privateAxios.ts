import { BASE_URL } from '@/utils/constant'
import axios from 'axios'
import Cookies from 'js-cookie' // Import thư viện xử lý cookie

const PrivateAxios = axios.create({
  baseURL: BASE_URL,
  timeout: 1000 * 60 * 10
})

PrivateAxios.interceptors.request.use(
  (config) => {
    const token = Cookies.get('TOKEN')

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

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
    console.error(error)
    return Promise.reject(error)
  }
)

export default PrivateAxios
