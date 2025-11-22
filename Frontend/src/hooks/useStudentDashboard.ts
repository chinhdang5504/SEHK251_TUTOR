import { useQuery } from '@tanstack/react-query'
import { getRegisteredSessions } from '@/api/studentAPI'
import dayjs from 'dayjs'
import type { WeekDay } from '@/types/calender'
import { mockRegisteredSessions } from '@/mocks/dashboardStudent.mock'

const generateCalendarWeeks = (): WeekDay[][] => {
  const today = dayjs()
  const start = today.subtract(1, 'week')
  const totalWeeks = 6

  const weeks: WeekDay[][] = []

  for (let w = 0; w < totalWeeks; w++) {
    const week: WeekDay[] = []

    for (let i = 0; i < 7; i++) {
      const d = start.add(w, 'week').add(i, 'day')
      week.push({
        day: d.format('ddd'),
        date: d.date(),
        fullDate: d.format('YYYY-MM-DD')
      })
    }

    weeks.push(week)
  }

  return weeks
}

export const useStudentDashboard = (
  page: number,
  limit: number,
  currentCalendarPage: number,
  selectedDate: string | null
) => {
  const weeks = generateCalendarWeeks()
  const startFullDate = weeks[0][0].fullDate
  const endFullDate = weeks[weeks.length - 1][6].fullDate

  const { data: allSessions = [], isLoading } = useQuery({
    queryKey: ['student-sessions-range', startFullDate, endFullDate],
    queryFn: async () => {
      try {
        return await getRegisteredSessions({
          page: 1,
          limit: 9999,
          startDate: startFullDate,
          endDate: endFullDate
        })
      } catch (e) {
        console.warn('⚠️ BE error → using mockRegisteredSessions')
        return mockRegisteredSessions
      }
    }
  })

  /** FE Filtering **/
  const filtered = selectedDate ? allSessions.filter((s) => s.date === selectedDate) : allSessions

  const totalPages = Math.ceil(filtered.length / limit)
  const start = (page - 1) * limit
  const paginated = filtered.slice(start, start + limit)

  return {
    sessions: paginated,
    totalPages,
    allSessionsForCalendar: allSessions,
    weekDays: weeks[currentCalendarPage],
    totalWeeks: weeks.length,
    isLoading
  }
}
