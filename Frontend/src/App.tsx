import AfterLogin from "@/page/AfterLogin"
import HomePage from "@/page/HomePage"
import LibraryPage from "@/page/Library"
import NotFound from "@/page/NotFound"
import PublicSession from "@/page/Student/PublicSession"
import StudentDashboard from "@/page/Student/StudentDashboard"
import StudentProfile from "@/page/Student/StudentProfile"
import Tutor from "@/page/Student/Tutor"
import TutorInfo from "@/page/Student/TutorInfo"
import SessionDetailsPage from "@/page/Tutor/SessionDetail"
import MySessionsPage from "@/page/Tutor/TutorDashboard"
import { Route, Routes } from "react-router-dom"

function App() {

  return (
    <Routes>

      <Route path='/student/dashboard' element={<StudentDashboard />} />
      <Route path='/student/profile' element={<StudentProfile />} />
      <Route path='/student/public-session' element={<PublicSession />} />
      <Route path='/student/tutors' element={<Tutor />} />
      <Route path='/student/tutor-info/:id' element={<TutorInfo />} />


      <Route path='/tutor/dashboard' element={<MySessionsPage />} />
      <Route path='/tutor/profile' element={<StudentProfile />} />
      <Route path='/tutor/session-detail/:id' element={<SessionDetailsPage />} />


      <Route path="/library" element={<LibraryPage />} />

      <Route path="/after" element={<AfterLogin />} />
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
