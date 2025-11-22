import { useQuery } from '@tanstack/react-query';
import tutorApi from '@/api/dashboardTutorApi';

import { allMySessions, notifications, feedbacks } from '@/mocks/dashboardTutor.mock';
import type { Session, Notification, Feedback } from '@/pages/Tutor/Dashboard/mysessions.types';

export const useTutorDashboard = (page: number, limit: number, useApi = false) => {

  const {
    data: sessionData,
    isLoading: isSessionLoading,
  } = useQuery({
    queryKey: ['tutor-sessions', page, limit],
    queryFn: async () => {
      if (!useApi) {
        await new Promise((r) => setTimeout(r, 500));
        
        const start = (page - 1) * limit;
        const end = page * limit;
        const paginated = allMySessions.slice(start, end);
        const totalPages = Math.ceil(allMySessions.length / limit);

        return { data: paginated, totalPages };
      }

      const res = await tutorApi.getMySessions({ page, limit });
      return res; 
    },
    placeholderData: (prev) => prev,
  });

  const {
    data: notiList,
    isLoading: isNotiLoading
  } = useQuery({
    queryKey: ['tutor-notifications'],
    queryFn: async () => {
      if (!useApi) return notifications;
      return await tutorApi.getNotifications(); 
    }
  });

  const {
    data: feedbackList,
    isLoading: isFeedbackLoading
  } = useQuery({
    queryKey: ['tutor-feedbacks'],
    queryFn: async () => {
      if (!useApi) return feedbacks; 
      return await tutorApi.getRecentFeedbacks();
    }
  });
  return {
    sessions: sessionData?.data || [],
    totalPages: sessionData?.totalPages || 0,
    
    notifications: notiList || [],
    feedbacks: feedbackList || [],

    isLoading: isSessionLoading || isNotiLoading || isFeedbackLoading,
  };
};