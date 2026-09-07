import { Navigate } from "react-router"
import { useAuth } from "./useAuth.js"

export default function GuestRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) return null
  if (user) return <Navigate to="/dashboard" replace />
  return children
}
