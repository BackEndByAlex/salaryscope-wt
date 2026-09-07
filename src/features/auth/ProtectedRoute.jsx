import { Navigate } from "react-router"
import { useAuth } from "./useAuth.js"

export default function ProtectedRoute({ children }) {
  const { user, status } = useAuth()

  if (status === "unknown") return null
  if (!user) return <Navigate to="/login" replace />
  return children
}
