import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import ProtectedRoute from './Components/ProtectedRoute'

import Home from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Profile from './Pages/Profile'
import ForgotPassword from './Pages/ForgotPassword'
import SkillDetails from './Pages/SkillDetails'

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            
            {/* Protected routes */}
            <Route
              path="/skill/:id"
              element={
                <ProtectedRoute>
                  <SkillDetails />
                </ProtectedRoute>
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

            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
