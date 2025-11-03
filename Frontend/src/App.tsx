import PublicRoute from '@/config/PublicRoutes'
import StudentRoute from '@/config/StudentRoute'
import HomePage from '@/pages/HomePage/HomePage'
import TestPage from '@/pages/TestPage/TestPage'
import ProfilePage from '@/pages/ProfilePage/ProfilePage'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path='*' element={<TestPage />} />
      </Route>

      <Route element={<StudentRoute />}>
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/home' element={<HomePage />} />
      </Route>
    </Routes>
  )
}

export default App
