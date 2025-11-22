import PublicRoute from '@/config/PublicRoutes'
import StudentRoute from '@/config/StudentRoute'
import HomePage from '@/pages/HomePage/HomePage'
import TestPage from '@/pages/TestPage/TestPage'
import { Route, Routes } from 'react-router-dom'
import SearchTutor from '@/pages/Student/tutor'
import TutorInfo from '@/pages/Student/TutorInfo'
import Profile from '@/pages/Student/profile'
import PublicSessions from '@/pages/Student/publicsession'

// Import các trang
import Profile from './pages/Student/profile'
import LibraryPage from './pages/hcmutLibrary/library'
import SessionDetailsPage from './pages/Tutor/SessionDetailsPage/sessiondetail'
import DashboardTutorPage from './pages/Tutor/Dashboard/dashboard'
import SearchTutor from "@/pages/Student/tutor"
import TutorInfo from '@/pages/Student/TutorInfo'
import PublicSessions from '@/pages/Student/publicsession'
import DashboardStudentPage from './pages/Student/Dashboard/dashboard'
import LibraryStudentPage from './pages/Student/librarystudent'

function App() {
  return (
    <Routes>
      {/* ========================================
        CÁC ROUTE DÙNG CHUNG (Public/Student/Tutor)
        ======================================== */}
      <Route element={<PublicRoute />}>
        
        {/* --- TUTOR ROUTES (Đã cập nhật path theo Sidebar mới) --- */}
        {/* Đường dẫn này giờ là /tutor thay vì /tutor/dashboard để khớp Sidebar */}
        <Route path='/tutor' element={<DashboardTutorPage />} /> 
        <Route path='/tutor/session-detail' element={<SessionDetailsPage />} />
        <Route path='/tutor/library' element={<LibraryPage />} />
        
        {/* --- STUDENT ROUTES --- */}
        <Route path='/student/dashboard' element={<DashboardStudentPage />} />
        <Route path="/student/public-session" element={<PublicSessions/>} />
        <Route path="/student/tutors" element={<SearchTutor />} />
        <Route path="/student/tutor-info/:id" element={<TutorInfo />} />
        <Route path='/student/library' element={<LibraryStudentPage />} />
        <Route path='/student/profile' element={<Profile />} />
      </Route>

      {/* ========================================
        CÁC ROUTE CẦN QUYỀN STUDENT (Ví dụ)
        ======================================== */}
      <Route element={<StudentRoute />}>
        <Route path='/home' element={<HomePage />} />
      </Route>

      {/* Route mặc định */}
      <Route path='/' element={<HomePage />} />
    </Routes>
  )
}

export default App