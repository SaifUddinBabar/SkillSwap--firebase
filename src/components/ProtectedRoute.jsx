import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase.config";
import Loader from "./Loader";

export default function ProtectedRoute({ children }) {
  const [user, loading] = useAuthState(auth);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 1000); 
    return () => clearTimeout(timer);
  }, []);

  if (loading || showLoader) return <Loader />; 

  if (!user) return <Navigate to="/login" replace />;

  return children;
}
