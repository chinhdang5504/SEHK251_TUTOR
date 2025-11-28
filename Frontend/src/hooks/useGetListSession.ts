import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import type { Session } from '@/types/session'
import { searchSessions } from '@/api/studentAPI'
import { mockClasses } from '@/mocks/tutor.info.mock'

export const usePublicSessions = () => {
  const [query, setQuery] = useState('')

  const { data, isLoading, isError, refetch } = useQuery<Session[]>({
    queryKey: ['publicSessions', query],
    queryFn: async () => {
      try {
        const res = await searchSessions(query)
        return Array.isArray(res) ? res : mockClasses
      } catch (err) {
        console.error('Failed to fetch sessions, using mock data', err)
        return mockClasses
      }
    },
    placeholderData: mockClasses,
    staleTime: 1000 * 60 * 5
  })

  const sessions: Session[] = Array.isArray(data) ? data : mockClasses

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
    isError
  }
}
