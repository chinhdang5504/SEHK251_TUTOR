// src/pages/MySessionsPage.tsx

// =================================================================
// 1. IMPORTS
// =================================================================
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import {
  allMySessions,
  notifications,
  feedbacks,
} from '@/mocks/dashboardTutor.mock';



export type SessionStatus = 'Canceled' | 'Completed' | 'Scheduled' | string;

export type Session = {
  id: number;
  date: string;
  time: string;
  subject: string;
  room: string;
  status: SessionStatus;
};

export type Notification = {
  id: number;
  text: string;
  isReminder?: boolean;
};

export type Feedback = {
  id: number;
  student: string;
  session: string;
  text: string;
};

// =================================================================
// 3. COMPONENT CHÍNH: MySessionsPage
// =================================================================
const MySessionsPage = () => {

  // State cho phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // 6 dòng 1 trang
  const totalPages = Math.ceil(allMySessions.length / itemsPerPage);

  // Logic lọc session cho trang hiện tại
  const currentSessions = allMySessions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 ml-0 xl:ml-[282px] pt-24 p-8">
          
          {/* Layout 2 cột */}
          <div className="flex flex-col lg:flex-row gap-8 mt-6">

            {/* Cột 1: Bảng "My sessions" */}
            <SessionsTable
              sessions={currentSessions}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />

            {/* Cột 2: Sidebar (Notifications & Feedback) */}
            <NotificationsSidebar
              notifications={notifications}
              feedbacks={feedbacks}
            />

          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}; 

export default MySessionsPage;


// =================================================================
// 4. CÁC COMPONENT CON
// =================================================================

// --- Component 1: SessionsTable ---
type SessionsTableProps = {
  sessions: Session[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};
const SessionsTable = ({ sessions, currentPage, totalPages, onPageChange }: SessionsTableProps) => {
  return (
    <div className="flex-1">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-[#B3261E]">My sessions</h1>
      </div>

      {/* Bảng dữ liệu */}
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase">
            <tr>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Time</th>
              <th className="px-6 py-3">Subject</th>
              <th className="px-6 py-3">Room</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {sessions.map((session) => (
              <tr key={session.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4">{session.date}</td>
                <td className="px-6 py-4">{session.time}</td>
                <td className="px-6 py-4 font-medium">{session.subject}</td>
                <td className="px-6 py-4">{session.room}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={session.status} />
                </td>
                <td className="px-6 py-4 flex gap-2">
                  
                  <NavLink
                    to={`/tutor/session-details`} 
                    className="text-red-600 border border-red-500 rounded-full px-3 py-1 text-xs font-medium hover:bg-red-50"
                  >
                    Details
                  </NavLink>
                  
                  <button className="text-red-600 border border-red-500 rounded-full px-3 py-1 text-xs font-medium hover:bg-red-50">
                    Upload Minutes
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phân trang (Pagination) */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <span>Page {currentPage} of {totalPages}</span>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 py-1 rounded-md hover:bg-gray-100 disabled:opacity-50"
          >
            <FontAwesomeIcon icon={faChevronLeft} size="xs" />
          </button>
          
          {[...Array(totalPages)].map((_, i) => (
            <button 
              key={i} 
              onClick={() => onPageChange(i + 1)}
              className={`px-3 py-1 rounded-md ${
                currentPage === i + 1 
                  ? 'bg-red-600 text-white font-bold' 
                  : 'hover:bg-gray-100'
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button 
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-2 py-1 rounded-md hover:bg-gray-100 disabled:opacity-50"
          >
            <FontAwesomeIcon icon={faChevronRight} size="xs" />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Component 2: NotificationsSidebar ---
type NotificationsSidebarProps = {
  notifications: Notification[];
  feedbacks: Feedback[];
};
const NotificationsSidebar = ({ notifications, feedbacks }: NotificationsSidebarProps) => {
  return (
    <div className="w-full lg:w-96 space-y-8 self-start sticky top-28">
      
      {/* Box Notifications */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Notifications</h2>
        <ul className="space-y-4">
          {notifications.map((noti) => (
            <li key={noti.id} className={`text-sm text-gray-700 border-l-4 pl-4 ${noti.isReminder ? 'border-red-500' : 'border-gray-300'}`}>
              {noti.isReminder && <span className="font-bold text-gray-900">Reminder: </span>}
              {noti.text}
            </li>
          ))}
        </ul>
      </div>

      {/* Box Recent Feedback */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Feedback</h2>
          <div className="space-y-4">
          {feedbacks.map((fb) => (
            <div key={fb.id} className="bg-gray-100 p-4 rounded-md shadow-inner">
              <p className="text-sm text-gray-800">"{fb.text}"</p>
              <p className="text-xs text-gray-500 mt-2 text-right">
                - <span className="font-semibold">{fb.student}</span> ({fb.session})
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

// --- Component 3: StatusBadge (Helper) ---
type StatusBadgeProps = {
  status: SessionStatus;
};
const StatusBadge = ({ status }: StatusBadgeProps) => {
  let colorClasses = '';
  switch (status) {
    case 'Canceled': colorClasses = 'bg-red-100 text-red-700'; break;
    case 'Completed': colorClasses = 'bg-green-100 text-green-700'; break;
    case 'Scheduled': colorClasses = 'bg-yellow-100 text-yellow-700'; break;
    default: colorClasses = 'bg-gray-100 text-gray-700';
  }
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colorClasses}`}>
      {status}
    </span>
  );
};