import type { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PublicRoute = () => {
  const { isAuthenticated } = useSelector((s: RootState) => s.user)

  return isAuthenticated ? <Navigate to='/student' replace /> : <Outlet />
}

export default PublicRoute
