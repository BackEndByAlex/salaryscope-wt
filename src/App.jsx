import { BrowserRouter, Routes, Route } from "react-router"
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import Profile from "./pages/Profile.jsx"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}
