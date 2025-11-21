import { useQuery, useMutation } from '@tanstack/react-query';
import homeApi from '@/api/homePageApi';

import { allSessions } from '@/mocks/homepage.mock';
import type { SessionData } from '@/pages/HomePage/homepage.types';

export const useHome = (useApi = false) => {
  
  // <--- 1. Recent Sessions --->
  const { 
    data: sessions, 
    isLoading: isSessionsLoading 
  } = useQuery({
    queryKey: ['home-recent-sessions'],
    queryFn: async () => {
      if (!useApi) {
        await new Promise(r => setTimeout(r, 500));
        return allSessions;
      }
      return await homeApi.getRecentSessions({ limit: 6 });
    },
    placeholderData: (prev) => prev,
  });

  // <--- 2. Get it now --->
  const { mutate: enroll, isPending: isEnrolling } = useMutation({
    mutationFn: async (sessionId: number) => {
      if (!useApi) {
        await new Promise(r => setTimeout(r, 1000));
        return { message: 'Mock enroll success' };
      }
      return await homeApi.enrollSession(sessionId);
    },
    onSuccess: () => alert("Đăng ký lớp thành công!"),
    onError: (err) => {
      console.error(err);
      alert("Đăng ký thất bại! Bạn cần đăng nhập trước.");
    }
  });

  return {
    sessions: sessions || [],
    isSessionsLoading,
    enroll,
    isEnrolling
  };
};