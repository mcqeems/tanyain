import { Navigate } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const currentUser = useAuthStore((s) => s.currentUser)

  if (!currentUser) {
    return <Navigate to="/auth" replace />
  }

  return <>{children}</>
}
