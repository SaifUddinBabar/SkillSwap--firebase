import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ProtectedRoute from "./Components/ProtectedRoute";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Profile from "./Pages/Profile";
import ForgotPassword from "./Pages/ForgotPassword";
import SkillDetails from "./Pages/SkillDetails";
import Loader from "./Components/Loader";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./utils/firebase.config";

export default function App() {
  const [_, loading] = useAuthState(auth);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 1000); 
    return () => clearTimeout(timer);
  }, []);

  if (loading || showLoader) return <Loader />;

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />

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

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
