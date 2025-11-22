// import PrivateAxios from '@/lib/privateAxios'

// const publicSessionApi = {
//   /* <--- Fetch all public sessions ---> */
//   async getAllSessions() {
//     const res = await PrivateAxios.get('/session/publicSessions')
//     return res.data 
//   },
//   /* <--- Search public sessions by query keyword ---> */
//   async searchSession(query: string) {
//     const res = await PrivateAxios.get('/session/search', {
//       params: { q: query }, 
//     })
//     return res.data 
//   },
// }

// export default publicSessionApi
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import PrivateAxios from '@/lib/privateAxios'
import { mockSessions } from '@/mocks/sessions.mock'

export interface Session {
  id: string
  title: string
  subtitle?: string
  date: string
  slots: number
  tutorName: string
  faculty: string
  coverUrl?: string
}

const USE_API = false 

const fetchPublicSessions = async (query: string): Promise<Session[]> => {
  if (!USE_API) {
    const q = query.trim().toLowerCase()
    const filtered = q
      ? mockSessions.filter(
          (s) =>
            s.title.toLowerCase().includes(q) ||
            (s.subtitle ?? '').toLowerCase().includes(q) ||
            s.tutorName.toLowerCase().includes(q) ||
            s.faculty.toLowerCase().includes(q)
        )
      : mockSessions

    return new Promise((resolve) => setTimeout(() => resolve(filtered), 300))
  }

  // --- API CALL ---
  if (!query) {
    const res = await PrivateAxios.get('/session/publicSessions')
    return res.data
  } else {
    const res = await PrivateAxios.get('/session/search', { params: { q: query } })
    return res.data
  }
}

export const usePublicSessions = () => {
  const [query, setQuery] = useState('')

  const {
    data: sessions = [],
    isLoading,
    isError,
    refetch,
  } = useQuery<Session[]>({
    queryKey: ['publicSessions', query],
    queryFn: () => fetchPublicSessions(query),
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 5,
  })

  const notFound = !isLoading && sessions.length === 0

  const fetchData = (newQuery: string) => {
    setQuery(newQuery)
  }

  return {
    sessions,
    loading: isLoading,
    notFound,
    fetchData,
    refetch,
    isError,
  }
}
