import type { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const StudentRoute = () => {
  const { isAuthenticated, role } = useSelector((s: RootState) => s.user)

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />
  }

  if (role !== 'student') {
    return <Navigate to='/403' replace />
  }

  return <Outlet />
}

export default StudentRoute
