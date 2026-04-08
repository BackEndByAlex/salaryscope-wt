import { BrowserRouter, Routes, Route } from "react-router"
import { AuthProvider } from "./features/auth/AuthProvider.jsx"
import ProtectedRoute from "./features/auth/ProtectedRoute.jsx"
import GuestRoute from "./features/auth/GuestRoute.jsx"
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import Profile from "./pages/Profile.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import Analytics from "./pages/Analytics.jsx"
import OAuthCallback from "./features/auth/OAuthCallback.jsx"

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />
          <Route
            path="/register"
            element={
              <GuestRoute>
                <Register />
              </GuestRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/auth/callback" element={<OAuthCallback />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
