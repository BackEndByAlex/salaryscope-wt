import { BrowserRouter, Routes, Route } from "react-router"
import { ToastProvider } from "./shared/components/toast/ToastProvider.jsx"
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
import ChatBubble from "./features/chat/ChatBubble.jsx"

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <ChatBubble />
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
            {/* Public by design — salary data is browsable without an account */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/auth/callback" element={<OAuthCallback />} />
          </Routes>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  )
}
