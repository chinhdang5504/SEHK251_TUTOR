//@ts-nocheck
import PublicRoute from '@/config/PublicRoutes'
import StudentRoute from '@/config/StudentRoute'
import HomePage from '@/pages/HomePage/HomePage'
import LandingPage from '@/pages/LandingPage/LandingPage'
import ProfilePage from '@/pages/ProfilePage/ProfilePage'
import { Route, Routes } from 'react-router-dom'
import TutorMatchModule from './components/AIModule/TutorMatch.jsx';

function App() {
  return (
    <>
      <div className="my-8">
        <TutorMatchModule />
      </div>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path='*' element={<LandingPage />} />
        </Route>

        <Route element={<StudentRoute />}>
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/home' element={<HomePage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
