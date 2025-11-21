import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import studentApi from '@/api/dashboardStudentApi';

import { mockAllRegisteredSessions, mockAllWeeksData } from '@/mocks/dashboardStudent.mock'; 
import type { RegisteredSession, WeekDay } from '@/pages/Student/Dashboard/dashboard.types';

export const useStudentDashboard = (
  page: number, 
  limit: number, 
  currentCalendarPage: number,
  selectedDate: string | null,
  useApi = false
) => {
  const queryClient = useQueryClient();

  const {
    data: sessionData,
    isLoading: isSessionLoading,
  } = useQuery({
    queryKey: ['student-sessions', page, limit, selectedDate],
    queryFn: async () => {
      if (!useApi) {
        await new Promise((r) => setTimeout(r, 500));

        let filtered = selectedDate
          ? mockAllRegisteredSessions.filter((s) => s.date === selectedDate)
          : mockAllRegisteredSessions;

        const start = (page - 1) * limit;
        const end = page * limit;
        const paginated = filtered.slice(start, end);
        const totalPages = Math.ceil(filtered.length / limit);
        const allForCount = mockAllRegisteredSessions; 

        return { 
          data: paginated, 
          totalPages,
          allSessions: allForCount 
        };
      }

      const res = await studentApi.getRegisteredSessions({ 
        page, 
        limit, 
        date: selectedDate || undefined 
      });
      return res; 
    },
    placeholderData: (prev) => prev,
  });

  const {
    data: calendarData,
    isLoading: isCalendarLoading
  } = useQuery({
    queryKey: ['student-calendar', currentCalendarPage],
    queryFn: async () => {
      if (!useApi) {
        return mockAllWeeksData[currentCalendarPage] || [];
      }

      return [];
    }
  });
  
  const { mutate: cancelSession, isPending: isCancelling } = useMutation({
    mutationFn: async (id: number) => {
      if (!useApi) {
        console.log(`Mock cancel session ${id}`);
        return;
      }
      return await studentApi.cancelSession(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['student-sessions'] });
      alert("Đã hủy buổi học thành công!");
    }
  });

  return {
    sessions: sessionData?.data || [],
    totalPages: sessionData?.totalPages || 0,
    allSessionsForCalendar: sessionData?.allSessions || [],
    
    weekDays: calendarData || [],
    totalWeeks: mockAllWeeksData.length,

    isLoading: isSessionLoading || isCalendarLoading,
    isCancelling,

    cancelSession,
  };
};