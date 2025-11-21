// src/pages/Tutor/MySessionsPage.tsx

import { useState } from 'react';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';

import SessionsTable from './component/SessionTable'; 
import NotificationsSidebar from './component/NotificationsSidebar';

import { useTutorDashboard } from '@/hooks/useTutorDashboard';

const MySessionsPage = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; 

  const { 
    sessions,       
    totalPages,     
    notifications,  
    feedbacks,      
    isLoading       
  } = useTutorDashboard(currentPage, itemsPerPage, false); 

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 ml-0 xl:ml-[282px] pt-24 p-8">
          
          <div className="flex flex-col lg:flex-row gap-8 mt-6">

            {/* Cột 1: Bảng danh sách lớp */}
            {isLoading ? (
              <div className="flex-1 p-10 text-center text-gray-500">Loading dashboard...</div>
            ) : (
              <SessionsTable
                sessions={sessions} 
                currentPage={currentPage}
                totalPages={totalPages} 
                onPageChange={handlePageChange}
              />
            )}

            {/* Cột 2: Sidebar thông báo */}
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