import { createBrowserRouter } from 'react-router-dom'
// ✅ Route guards
import PublicRoute from '@/config/PublicRoutes'
import StudentRoute from '@/config/StudentRoute'
import TutorRoute from '@/config/TutorRoute'
// (sau có thể thêm AdminRoute, TBMRoute,...)

// ✅ Pages
import HomePage from '@/pages/HomePage/HomePage'

import TestPage from '@/pages/TestPage/TestPage'

import StudentDashboard from '@/pages/Student/Dashboard/dashboard'
import PublicSession from '@/pages/Student/publicsession'
import TutorList from '@/pages/Student/tutor'
import Profile from '@/pages/Student/profile'
import LibraryStudentPage from '@/pages/Student/librarystudent'

import TutorDashboard from '@/pages/Tutor/Dashboard/dashboard'
import TutorInfo from '@/pages/Student/TutorInfo'
import LibraryPage from '@/pages/hcmutLibrary/library'
import SessionDetailsPage from '@/pages/Tutor/sessiondetail'

// ================= ROUTER =================
const router = createBrowserRouter([
  // 🌐 Public pages
  {
    element: <PublicRoute />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/test', element: <TestPage /> }
    ]
  },

  // 🎓 Student pages
  {
    path: '/student',
    element: <StudentRoute />,
    children: [
      { index: true, element: <StudentDashboard /> },
      { path: 'public-session', element: <PublicSession /> },
      { path: 'tutors', element: <TutorList /> },
      { path: 'library', element: <LibraryStudentPage /> },
      { path: 'tutor-info/:id', element: <TutorInfo /> },
      { path: 'profile', element: <Profile /> }
    ]
  },

  // 🧑‍🏫 Tutor pages
  {
    path: '/tutor',
    element: <TutorRoute />,
    children: [
      { index: true, element: <TutorDashboard /> },
      // SỬA Ở ĐÂY: Path là 'session-detail' (để khớp Sidebar), Component là SessionDetailsPage (để khớp import)
      { path: 'session-detail', element: <SessionDetailsPage /> },
      { path: 'library', element: <LibraryPage /> }
    ]
  }
])

export default router