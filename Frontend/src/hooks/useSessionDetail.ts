import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import tutorApi from '@/api/dashboardTutorApi';

import { sessionDetails, registeredStudents } from '@/mocks/sessiontutor.mock'; 
import type { Student } from '@/pages/Tutor/SessionDetailsPage/sessiondetail.types';

export const useSessionDetail = (sessionId: string, page: number, limit: number, useApi = false) => {
  const queryClient = useQueryClient();

  const { data: sessionInfo, isLoading: isInfoLoading } = useQuery({
    queryKey: ['session-detail', sessionId],
    queryFn: async () => {
      if (!useApi) return sessionDetails; 
      return await tutorApi.getSessionDetail(sessionId);
    }
  });

  const { data: studentsData, isLoading: isStudentsLoading } = useQuery({
    queryKey: ['session-students', sessionId, page, limit],
    queryFn: async () => {
      if (!useApi) {
        await new Promise(r => setTimeout(r, 500));
        const start = (page - 1) * limit;
        const end = page * limit;
        const paginated = registeredStudents.slice(start, end);
        const totalPages = Math.ceil(registeredStudents.length / limit);
        return { data: paginated, totalPages };
      }
      return await tutorApi.getRegisteredStudents(sessionId, page, limit);
    },
    placeholderData: (prev) => prev
  });

  const { mutate: uploadReport, isPending: isUploading } = useMutation({
    mutationFn: async (file: File) => {
      if (!useApi) {
        await new Promise(r => setTimeout(r, 1000));
        return;
      }
      return await tutorApi.uploadSessionMinutes(Number(sessionId), file);
    },
    onSuccess: () => alert("Upload báo cáo thành công!"),
    onError: () => alert("Upload thất bại!")
  });

  return {
    sessionInfo: sessionInfo || null,
    students: studentsData?.data || [],
    totalPages: studentsData?.totalPages || 0,

    isLoading: isInfoLoading || isStudentsLoading,
    isUploading,

    uploadReport
  };
};