import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
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

  const res = await fetch(`/api/public-sessions?query=${encodeURIComponent(query)}`)
  if (!res.ok) throw new Error('Failed to fetch sessions')
  const json = await res.json()
  return json.items
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
