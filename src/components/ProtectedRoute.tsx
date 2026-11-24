import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import type { Role } from '../types/api'

export function ProtectedRoute({ requiredRole }: { requiredRole?: Role }) {
  const { isAuthenticated, roles } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  if (requiredRole && !roles.includes(requiredRole)) {
    return <Navigate to="/app" replace />
  }

  return <Outlet />
}
