import { Navigate } from "react-router"
import { useAuth } from "./useAuth.js"

export default function GuestRoute({ children }) {
  const { user, status } = useAuth()

  if (status === "unknown") return null
  if (user) return <Navigate to="/dashboard" replace />
  return children
}
