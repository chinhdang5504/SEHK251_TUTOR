import PublicRoute from '@/config/PublicRoutes'
import StudentRoute from '@/config/StudentRoute'
import HomePage from '@/pages/HomePage/HomePage'

import { Route, Routes } from 'react-router-dom'
import Profile from './pages/Student/profile'
import LibraryPage from './pages/hcmutLibrary/library'
import SessionDetailsPage from './pages/Tutor/sessiondetail'
import DashboardTutorPage from './pages/Tutor/dashboard'

// Import các trang Student
import SearchTutor from "@/pages/Student/tutor";
import TutorInfo from '@/pages/Student/TutorInfo'
import PublicSessions from '@/pages/Student/publicsession'
import DashboardStudentPage from './pages/Student/dashboard'
import LibraryStudentPage from './pages/Student/librarystudent'

function App() {
  return (
    <Routes>
      {/* ========================================
        CÁC ROUTE CỦA TUTOR (Gia sư)
        ========================================
        (Tôi đặt tạm trong PublicRoute để bạn xem) */}
      <Route element={<PublicRoute />}>
        {/* SỬA Ở ĐÂY: Thay thế '*' bằng các đường dẫn cụ thể */}
        {/* Đường dẫn này phải khớp với <NavLink> trong Sidebar của bạn */}      
        <Route path='/tutor/dashboard' element={<DashboardTutorPage />} />
        <Route path='/tutor/session-details' element={<SessionDetailsPage />} />
        <Route path='/tutor/library' element={<LibraryPage />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/student/dashboard' element={<DashboardStudentPage />} />
        <Route path="/student/public-session" element={<PublicSessions/>} />
        <Route path="/student/tutors" element={<SearchTutor />} />
        <Route path="/student/tutor-info/:id" element={<TutorInfo />} />
        <Route path='/student/library' element={<LibraryStudentPage />} />
      </Route>

      {/* ========================================
        CÁC ROUTE CỦA STUDENT (Sinh viên)
        ========================================
      */}
      <Route element={<StudentRoute />}>
        <Route path='/home' element={<HomePage />} />
      </Route>

      {/* Route cho trang chủ (nếu có) */}
      <Route path='/' element={<HomePage />} />
      </Routes>
  );
}

export default App