import { BrowserRouter, Routes, Route } from "react-router"
import LandingPage from "./features/landing/LandingPage.jsx"
import RegisterPage from "./features/auth/RegisterPage.jsx"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  )
}
