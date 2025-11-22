import publicAxios from '@/lib/publicAxios'

export const getCurrentUser = async () => {
  const response = await publicAxios.get('/me')

  return response.data
}
