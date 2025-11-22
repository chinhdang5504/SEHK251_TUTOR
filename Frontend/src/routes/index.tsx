import { createBrowserRouter } from 'react-router-dom'
// ✅ Route guards
import PublicRoute from '@/config/PublicRoutes'
import StudentRoute from '@/config/StudentRoute'
import TutorRoute from '@/config/TutorRoute'
// (sau có thể thêm AdminRoute, TBMRoute,...)

// ✅ Pages
import HomePage from '@/pages/HomePage/HomePage'

import TestPage from '@/pages/TestPage/TestPage'

import StudentDashboard from '@/pages/Student/dashboard'
import PublicSession from '@/pages/Student/publicsession'
import TutorList from '@/pages/Student/tutor'
import Profile from '@/pages/Student/profile'

import TutorDashboard from '@/pages/Tutor/dashboard'
import SessionDetail from '@/pages/Tutor/sessiondetail'
import TutorInfo from '@/pages/Student/TutorInfo'
import LibraryPage from '@/pages/hcmutLibrary/library'

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
      { path: 'library', element: <LibraryPage /> },
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
      { path: 'session-detail', element: <SessionDetail /> },
      { path: 'library', element: <LibraryPage /> }
    ]
  }
])

export default router
