import PublicRoute from '@/config/PublicRoutes'
import StudentRoute from '@/config/StudentRoute'
import HomePage from '@/pages/HomePage/HomePage'
import TestPage from '@/pages/TestPage/TestPage'
import { Route, Routes } from 'react-router-dom'
import SearchTutor from '@/pages/Student/tutor'
import TutorInfo from '@/pages/Student/TutorInfo'
import Profile from '@/pages/Student/profile'
import PublicSessions from '@/pages/Student/publicsession'

function App() {
  return (
    <Routes>
      <Route path='/student/public-session' element={<PublicSessions />} />
      <Route path='/student/tutors' element={<SearchTutor />} />
      <Route path='/student/tutor-info/:id' element={<TutorInfo />} />
      <Route path='/student/profile' element={<Profile />} />
    </Routes>
  )
}

export default App
