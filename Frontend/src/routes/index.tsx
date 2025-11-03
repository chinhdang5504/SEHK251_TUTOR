import { createBrowserRouter } from 'react-router-dom'

// ✅ Route guards
import PublicRoute from '@/config/PublicRoutes'
import StudentRoute from '@/config/StudentRoute'
import TutorRoute from '@/config/TutorRoute'
// (sau có thể thêm AdminRoute, TBMRoute,...)

// ✅ Pages
import HomePage from '@/pages/HomePage/HomePage'
import ProfilePage from '@/pages/ProfilePage/ProfilePage'
import TestPage from '@/pages/TestPage/TestPage'

import StudentDashboard from '@/pages/Student/dashboard'
import PublicSession from '@/pages/Student/publicsession'
import TutorList from '@/pages/Student/tutor'

import TutorDashboard from '@/pages/Tutor/dashboard'
import SessionDetail from '@/pages/Tutor/sessiondetail'

import LibraryPage from '@/pages/hcmutLibrary/library'


// ================= ROUTER =================
const router = createBrowserRouter([
  // 🌐 Public pages
  {
    element: <PublicRoute />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/profile', element: <ProfilePage /> },
      { path: '/test', element: <TestPage /> },
    ],
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
    ],
  },

  // 🧑‍🏫 Tutor pages
  {
    path: '/tutor',
    element: <TutorRoute />,
    children: [
      { index: true, element: <TutorDashboard /> },
      { path: 'session-detail', element: <SessionDetail /> },
      { path: 'library', element: <LibraryPage /> },
    ],
  },

])

export default router
