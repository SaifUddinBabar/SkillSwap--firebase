import React, { useState } from "react";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../utils/firebase.config";
import { useNavigate, useLocation, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success("Signed in with Google!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password", { state: { email } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0d0f2c] to-[#1b1f44] px-4">
      <Toaster />
      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-br from-[#1b1f44] to-[#0f1230] rounded-3xl shadow-2xl w-full max-w-md p-8 flex flex-col border border-blue-500/40 transition-transform transform hover:scale-105"
      >
        <h2 className="text-3xl font-bold text-center text-blue-300 mb-6 drop-shadow-lg">Login</h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 mb-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-[#0d0f2c] text-white border-blue-500 placeholder-gray-400 transition"
        />

        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-[#0d0f2c] text-white border-blue-500 placeholder-gray-400 transition"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold active:scale-95 transition shadow-lg mb-3"
        >
          Login
        </button>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full py-3 border rounded-xl font-medium hover:bg-blue-900/20 transition text-white mb-4 border-blue-500"
        >
          Continue with Google
        </button>

        <div className="flex justify-between text-sm">
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-blue-400 hover:underline"
          >
            Forgot Password?
          </button>
          <Link to="/signup" className="text-blue-400 hover:underline">
            Signup
          </Link>
        </div>
      </form>
    </div>
  );
}
