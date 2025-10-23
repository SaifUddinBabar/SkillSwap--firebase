import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../utils/firebase.config";
import toast, { Toaster } from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent! Check your inbox.");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Toaster />
      <form onSubmit={handleReset} className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <button
          type="submit"
          className="w-full bg-yellow-600 text-white py-3 rounded-lg font-medium hover:bg-yellow-700 transition"
        >
          Send Reset Email
        </button>
      </form>
    </div>
  );
}
