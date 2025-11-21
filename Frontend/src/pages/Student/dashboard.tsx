import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faTimesCircle,
  faEllipsisV,
  faComments,
  faShare,
} from '@fortawesome/free-solid-svg-icons';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';

// DATA & TYPES
import {
  mockAllRegisteredSessions,
  mockAllWeeksData,
} from '@/mocks/dashboardStudent.mock';

// NOTE: Replace this import with your actual axiosPrivate path
// import { axiosPrivate } from '@/api/axiosClient'; 
// Mocking axiosPrivate for demonstration purposes within this file
const axiosPrivate = {
  get: async (url: string) => {
    // Simulating API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (url.includes('sessions')) return { data: mockAllRegisteredSessions };
    if (url.includes('week')) return { data: mockAllWeeksData };
    return { data: [] };
  },
  delete: async (url: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { data: { success: true } };
  }
};

export type RegisteredSession = {
  id: number;
  date: string;
  time: string;
  subject: string;
  room: string;
  tutor: string;
  actionType: 'cancel' | 'feedback' | 'none';
};

export type WeekDay = {
  day: string;
  date: number;
  fullDate: string;
};

// HELPER FUNCTIONS
export const getAppointmentCount = (
  date: string,
  sessions: RegisteredSession[]
): number => {
  return sessions.filter((s) => s.date === date).length;
};

// =================================================================
// SUB-COMPONENT: SessionRow
// Ideally, move this to: src/components/Student/SessionRow.tsx
// =================================================================
type SessionRowProps = {
  session: RegisteredSession;
  onCancel: (id: number) => void;
  onFeedback: (id: number) => void;
  onShare: (id: number) => void;
  isDeleting: boolean;
};

const SessionRow = ({
  session,
  onCancel,
  onFeedback,
  onShare,
  isDeleting,
}: SessionRowProps) => {
  return (
    <tr className={`border-b border-gray-200 hover:bg-gray-50 ${isDeleting ? 'opacity-50' : ''}`}>
      <td className="px-6 py-4">{session.date}</td>
      <td className="px-6 py-4">{session.time}</td>
      <td className="px-6 py-4 font-medium">{session.subject}</td>
      <td className="px-6 py-4">{session.room}</td>
      <td className="px-6 py-4">{session.tutor}</td>
      <td className="px-6 py-4">
        <div className="flex items-center justify-center">
          <Menu as="div" className="relative inline-block text-left">
            <MenuButton className="text-gray-300 hover:text-[#B3261E] p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#B3261E] focus:ring-offset-2">
              <FontAwesomeIcon icon={faEllipsisV} />
            </MenuButton>

            <MenuItems
              transition
              anchor="bottom end"
              className="w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 transition duration-100 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
            >
              <div className="p-1">
                <MenuItem>
                  {({ focus }) => (
                    <button
                      onClick={() => onFeedback(session.id)}
                      className={`${
                        focus ? 'bg-[#B3261E] text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm gap-2`}
                    >
                      <FontAwesomeIcon icon={faComments} className="w-4" />
                      Feedback
                    </button>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ focus }) => (
                    <button
                      onClick={() => onShare(session.id)}
                      className={`${
                        focus ? 'bg-[#B3261E] text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm gap-2`}
                    >
                      <FontAwesomeIcon icon={faShare} className="w-4" />
                      Share
                    </button>
                  )}
                </MenuItem>
              </div>
              <div className="p-1 border-t border-gray-100">
                <MenuItem>
                  {({ focus }) => (
                    <button
                      onClick={() => onCancel(session.id)}
                      disabled={isDeleting}
                      className={`${
                        focus ? 'bg-[#B3261E] text-white' : 'text-red-700'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm gap-2`}
                    >
                      <FontAwesomeIcon icon={faTimesCircle} className="w-4" />
                      {isDeleting ? 'Cancelling...' : 'Cancel Session'}
                    </button>
                  )}
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
        </div>
      </td>
    </tr>
  );
};

// =================================================================
// MAIN COMPONENT: DashboardStudentPage
// =================================================================
const DashboardStudentPage = () => {
  const queryClient = useQueryClient();

  // --- Local State ---
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCalendarPage, setCalendarPage] = useState(0);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // --- TanStack Query: Fetch Sessions ---
  const { data: allSessions = [], isLoading: isLoadingSessions } = useQuery({
    queryKey: ['student-sessions'],
    queryFn: async () => {
      // REAL API CALL:
      // const response = await axiosPrivate.get('/student/sessions');
      // return response.data;
      
      // MOCK CALL:
      const response = await axiosPrivate.get('/student/sessions');
      return response.data as RegisteredSession[];
    },
  });

  // --- TanStack Query: Fetch Week Data ---
  const { data: weeksData = [] } = useQuery({
    queryKey: ['week-calendar', currentCalendarPage], // Refetch when page changes
    queryFn: async () => {
      // REAL API CALL:
      // const response = await axiosPrivate.get(`/calendar/week?page=${currentCalendarPage}`);
      // return response.data;

      // MOCK CALL:
      const response = await axiosPrivate.get('/calendar/week');
      // In a real app, the API would return just the specific week based on param
      return (response.data as WeekDay[][])[currentCalendarPage] || []; 
    },
  });

  // --- TanStack Mutation: Cancel Session ---
  const cancelMutation = useMutation({
    mutationFn: async (sessionId: number) => {
      // REAL API CALL:
      // return axiosPrivate.delete(`/student/sessions/${sessionId}`);
      return axiosPrivate.delete(`/student/sessions/${sessionId}`);
    },
    onSuccess: () => {
      // Invalidate query to refetch data
      queryClient.invalidateQueries({ queryKey: ['student-sessions'] });
      alert('Session cancelled successfully!');
      
      // Reset page if needed
      if (currentSessions.length === 1 && currentPage > 1) {
         setCurrentPage(prev => prev - 1);
      }
    },
    onError: (error) => {
      console.error("Failed to cancel session", error);
      alert("Failed to cancel session. Please try again.");
    }
  });

  // --- Handlers ---
  const handleCancelSession = (sessionId: number) => {
    const confirmCancel = window.confirm(
      'Are you sure you want to cancel this session?'
    );
    if (confirmCancel) {
      cancelMutation.mutate(sessionId);
    }
  };

  const handleFeedback = (sessionId: number) => {
    alert(`Open feedback form for session ID: ${sessionId}`);
  };

  const handleShare = (sessionId: number) => {
    alert(`Sharing session ID: ${sessionId}`);
  };

  // --- Pagination & Filtering Logic ---
  const itemsPerPage = 5;

  const sessionsToShow = selectedDate
    ? allSessions.filter((s) => s.date === selectedDate)
    : allSessions;

  const totalPages = Math.ceil(sessionsToShow.length / itemsPerPage) || 1;

  const currentSessions = sessionsToShow.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleDateSelect = (date: string) => {
    if (selectedDate === date) {
      setSelectedDate(null);
    } else {
      setSelectedDate(date);
    }
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 ml-0 xl:ml-[282px] pt-16 p-8 flex flex-col">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-[#B3261E]">
              {selectedDate
                ? `Registered Session for ${selectedDate}`
                : 'Registered Session'}
            </h2>
            {selectedDate && (
              <button
                onClick={() => handleDateSelect(selectedDate)}
                className="text-sm text-blue-600 hover:underline"
              >
                Show All Sessions
              </button>
            )}
          </div>

          {/* Session List Table */}
          <section className="bg-white rounded-lg shadow-md mb-8">
            <div className="overflow-x-auto rounded-md overflow-y-visible min-h-[300px]">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-200 text-gray-500 uppercase">
                  <tr>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Time</th>
                    <th className="px-6 py-3">Subject</th>
                    <th className="px-6 py-3">Room</th>
                    <th className="px-6 py-3">Tutor</th>
                    <th className="px-6 py-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {isLoadingSessions ? (
                    <tr>
                      <td colSpan={6} className="text-center py-8">
                        Loading sessions...
                      </td>
                    </tr>
                  ) : currentSessions.length > 0 ? (
                    currentSessions.map((session) => (
                      <SessionRow 
                        key={session.id}
                        session={session}
                        onCancel={handleCancelSession}
                        onFeedback={handleFeedback}
                        onShare={handleShare}
                        isDeleting={cancelMutation.isPending}
                      />
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center py-8 text-gray-500 italic"
                      >
                        No sessions found for this criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Pagination */}
              {!isLoadingSessions && sessionsToShow.length > 0 && (
                <div className="flex justify-between items-center p-4 text-sm text-gray-600 bg-gray-100 border-t border-gray-200 ">
                  <span>
                    Page {currentPage} of {totalPages}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-2 py-1 rounded-md hover:bg-gray-200 disabled:opacity-50"
                    >
                      <FontAwesomeIcon icon={faChevronLeft} size="xs" />
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => handlePageChange(i + 1)}
                        className={`px-3 py-1 rounded-md ${
                          currentPage === i + 1
                            ? 'bg-red-600 text-white font-bold'
                            : 'hover:bg-gray-200'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-2 py-1 rounded-md hover:bg-gray-200 disabled:opacity-50"
                    >
                      <FontAwesomeIcon icon={faChevronRight} size="xs" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>

          <div className="flex-grow"></div>

          {/* Appointments Calendar */}
          <h2 className="text-3xl font-bold text-[#B3261E]">Appointments</h2>
          <section className="bg-gray-100 rounded-lg shadow-md p-6 mt-5">
            <div className="grid grid-cols-7 gap-2 text-center">
              {weeksData.map((day) => {
                const count = getAppointmentCount(day.fullDate, allSessions);
                const isSelected = selectedDate === day.fullDate;

                return (
                  <div
                    key={day.date}
                    onClick={() => handleDateSelect(day.fullDate)}
                    className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? 'bg-[#B3261E] text-white shadow-lg transform scale-105'
                        : 'bg-white hover:bg-gray-200 hover:shadow-md'
                    }`}
                  >
                    <div className="text-xs font-semibold uppercase">
                      {day.day}
                    </div>
                    <div className="text-2xl font-bold mt-1">{day.date}</div>
                    {count > 0 && (
                      <div
                        className={`text-xs mt-1 ${
                          isSelected ? 'text-red-100' : 'text-gray-500'
                        }`}
                      >
                        {count} Appointment{count > 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Calendar Pagination */}
            <div className="flex justify-center gap-2 mt-4">
              {[...Array(mockAllWeeksData.length)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCalendarPage(i)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentCalendarPage === i
                      ? 'bg-red-600'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to week ${i + 1}`}
                />
              ))}
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardStudentPage;