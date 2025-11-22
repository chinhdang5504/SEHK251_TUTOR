// src/pages/Student/DashboardStudentPage.tsx

import { useState } from 'react'; 
import Header from '@/components/Header/Header'; 
import Footer from '@/components/Footer'; 
import Sidebar from '@/components/Sidebar'; 

// Import Component con
import SessionTable from './component/SessionTable';
import AppointmentCalendar from './component/AppointmentCalendar';

// 🔥 1. IMPORT HOOK
import { useStudentDashboard } from '@/hooks/useStudentDashboard';

const DashboardStudentPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCalendarPage, setCalendarPage] = useState(0);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const itemsPerPage = 5;

  // 🔥 2. GỌI HOOK
  // useApi = false: Dùng Mock Data
  // useApi = true:  Dùng API thật
  const { 
    sessions,                
    totalPages,              
    weekDays,                
    allSessionsForCalendar,  
    totalWeeks,              
    isLoading,               
    cancelSession            
  } = useStudentDashboard(
    currentPage, 
    itemsPerPage, 
    currentCalendarPage, 
    selectedDate, 
    false // <--- Đổi thành true khi nào có Backend
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDateSelect = (date: string) => {
    const newDate = selectedDate === date ? null : date;
    setSelectedDate(newDate);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 ml-0 xl:ml-[282px] pt-16 p-8 flex flex-col">
          
          {/* Title Section */}
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

          {/* --- TABLE --- */}
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">Loading data...</div>
          ) : (
            <SessionTable 
              sessions={sessions}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}

          <div className="flex-grow"></div>

          {/* --- CALENDAR --- */}
          <h2 className="text-3xl font-bold text-[#B3261E]">Appointments</h2>
          <AppointmentCalendar 
            weekDays={weekDays}                        
            allSessions={allSessionsForCalendar}        
            selectedDate={selectedDate}
            currentCalendarPage={currentCalendarPage}
            totalWeeks={totalWeeks}
            onDateSelect={handleDateSelect}
            onCalendarPageChange={setCalendarPage}
          />

        </main>
      </div>
      <Footer />
    </div>
  );
};
    
export default DashboardStudentPage;