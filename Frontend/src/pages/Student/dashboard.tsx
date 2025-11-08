// src/pages/Student/DashboardStudentPage.tsx

// =================================================================
// 1. IMPORTS
// =================================================================
import { useState, Fragment, useEffect } from 'react'; // <-- SỬA 1: Thêm 'useEffect'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faTimesCircle,
  faEllipsisV,
  faComments,
  faShare, 
} from '@fortawesome/free-solid-svg-icons';
import { Menu, Transition } from '@headlessui/react'; 

import Header from '@/components/Header/Header'; 
import Footer from '@/components/Footer'; 
import Sidebar from '@/components/Sidebar'; 

// <-- SỬA 2: Import data và types từ file mock -->
import {
  mockAllRegisteredSessions,
  mockAllWeeksData,
} from '@/mocks/dashboardStudent.mock';

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

export const getAppointmentCount = (date: string, sessions: RegisteredSession[]): number => {
  return sessions.filter(s => s.date === date).length;
};

// =================================================================
// 3. COMPONENT CHÍNH: DashboardStudentPage
// =================================================================
const DashboardStudentPage = () => {

  // --- State ---
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCalendarPage, setCalendarPage] = useState(0);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // <-- SỬA 3: Thêm state để chứa dữ liệu từ API (hoặc mock) -->
  const [allSessions, setAllSessions] = useState<RegisteredSession[]>([]);
  const [weekDays, setWeekDays] = useState<WeekDay[]>([]);

  // --- Logic gọi API (Giả lập bằng useEffect) ---

  // Lấy danh sách TẤT CẢ session (chỉ chạy 1 lần)
  useEffect(() => {
    // ---- BẮT ĐẦU PHẦN API (ĐANG COMMENT) ----
    /*
    const fetchAllSessions = async () => {
      // const response = await fetch('/api/sessions/my-sessions-all'); // (API thật)
      // const data = await response.json();
      // setAllSessions(data);
    };
    fetchAllSessions();
    */
    // ---- KẾT THÚC PHẦN API ----
    
    // Dùng code Mock (bạn có thể xóa dòng này khi có API)
    setAllSessions(mockAllRegisteredSessions);
    
  }, []); // [] nghĩa là chỉ chạy 1 lần khi trang tải

  // Lấy lịch 7 ngày (chạy mỗi khi đổi 'currentCalendarPage')
  useEffect(() => {
    // ---- BẮT ĐẦU PHẦN API (ĐANG COMMENT) ----
    /*
    const fetchWeekData = async () => {
      // const response = await fetch(`/api/calendar/week?page=${currentCalendarPage}`); // (API thật)
      // const data = await response.json();
      // setWeekDays(data);
    };
    fetchWeekData();
    */
    // ---- KẾT THÚC PHẦN API ----

    // Dùng code Mock (bạn có thể xóa dòng này khi có API)
    setWeekDays(mockAllWeeksData[currentCalendarPage]);

  }, [currentCalendarPage]); // <-- Chạy lại khi 'currentCalendarPage' thay đổi

  
  // --- Logic Phân trang (Giờ sẽ dùng state 'allSessions') ---
  const itemsPerPage = 5;
  const sessionsToShow = selectedDate
    ? allSessions.filter(s => s.date === selectedDate) // Lọc từ state
    : allSessions; // Lấy từ state

  const totalPages = Math.ceil(sessionsToShow.length / itemsPerPage);
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
          <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-[#B3261E]">
                {selectedDate ? `Registered Session for ${selectedDate}` : 'Registered Session'}
              </h2>
              {selectedDate && (
                <button onClick={() => handleDateSelect(selectedDate)} className="text-sm text-blue-600 hover:underline">
                  Show All Sessions
                </button>
              )}
            </div>

          {/* Box 1: Registered Session */}
          <section className="bg-white rounded-lg shadow-md mb-8">
            <div className="overflow-x-auto rounded-md overflow-y-visible">
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
                  {currentSessions.map((session) => (
                    <tr key={session.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4">{session.date}</td>
                      <td className="px-6 py-4">{session.time}</td>
                      <td className="px-6 py-4 font-medium">{session.subject}</td>
                      <td className="px-6 py-4">{session.room}</td>
                      <td className="px-6 py-4">{session.tutor}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center">
                          <Menu as="div" className="inline-block text-left">
                            <Menu.Button className="text-gray-300 hover:text-[#B3261E] p-1 rounded-full hover:bg-[#B3261E]-200">
                              <FontAwesomeIcon icon={faEllipsisV} />
                            </Menu.Button>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="absolute right-0 mt-2 w-45 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                                <div className="px-1 py-1 ">
                                  <Menu.Item>
                                    {({ active }) => (
                                      <button
                                        className={`${
                                          active ? 'bg-[#B3261E] text-white' : 'text-gray-900'
                                        } group flex rounded-md items-center w-full px-2 py-2 text-sm gap-2`}
                                      >
                                        <FontAwesomeIcon icon={faComments} className="w-4" />
                                        Feedback
                                      </button>
                                    )}
                                  </Menu.Item>
                                  <Menu.Item>
                                    {({ active }) => (
                                      <button
                                        className={`${
                                          active ? 'bg-[#B3261E] text-white' : 'text-gray-900'
                                        } group flex rounded-md items-center w-full px-2 py-2 text-sm gap-2`}
                                      >
                                        <FontAwesomeIcon icon={faShare} className="w-4" />
                                        Share
                                      </button>
                                    )}
                                  </Menu.Item>
                                </div>
                                <div className="px-1 py-1">
                                  <Menu.Item>
                                    {({ active }) => (
                                      <button
                                        className={`${
                                          active ? 'bg-[#B3261E] text-white' : 'text-red-700'
                                        } group flex rounded-md items-center w-full px-2 py-2 text-sm gap-2`}
                                      >
                                        <FontAwesomeIcon icon={faTimesCircle} className="w-4" />
                                        Cancel Session
                                      </button>
                                    )}
                                  </Menu.Item>
                                </div>
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Phân trang */}
              <div className="flex justify-between items-center p-4 text-sm text-gray-600 bg-gray-100 border-t border-gray-200 ">
                <span>Page {currentPage} of {totalPages}</span>
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
              
            </div>
          </section>

          {/* Div đệm (flex-grow) */}
          <div className="flex-grow"></div>

          {/* Box 2: Appointments */}
          <h2 className="text-3xl font-bold text-[#B3261E]">Appointments</h2>
          <section className="bg-gray-100 rounded-lg shadow-md p-6 mt-5">
            <div className="grid grid-cols-7 gap-2 text-center">
              {weekDays.map((day) => { 
                const count = getAppointmentCount(day.fullDate, allSessions); 
                const isSelected = selectedDate === day.fullDate;

                return (
                  <div 
                    key={day.date} 
                    onClick={() => handleDateSelect(day.fullDate)}
                    className={`p-4 rounded-lg cursor-pointer ${
                      isSelected
                        ? 'bg-[#B3261E] text-white' 
                        : 'bg-white hover:bg-gray-200'
                    }`}
                  >
                    <div className="text-xs font-semibold uppercase">{day.day}</div>
                    <div className="text-2xl font-bold mt-1">{day.date}</div>
                    {count > 0 && (
                      <div className={`text-xs mt-1 ${
                        isSelected ? 'text-red-100' : 'text-gray-500'
                      }`}>
                        {count} Appointment{count > 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
            <div className="flex justify-center gap-2 mt-4">
              {[...Array(mockAllWeeksData.length)].map((_, i) => ( 
                <button
                  key={i}
                  onClick={() => setCalendarPage(i)}
                  className={`w-3 h-3 rounded-full ${
                    currentCalendarPage === i ? 'bg-red-600' : 'bg-gray-300'
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