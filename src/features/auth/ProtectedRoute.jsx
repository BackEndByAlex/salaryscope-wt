import { Navigate } from "react-router"
import { useAuth } from "./useAuth.js"

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) return null
  if (!user) return <Navigate to="/login" replace />
  return children
}
