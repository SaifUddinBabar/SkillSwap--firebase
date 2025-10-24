import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../utils/firebase.config";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function Signup() {
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password.length < 6 || !/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
      toast.error("Password must be 6+ chars with uppercase & lowercase letters");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name, photoURL });
      toast.success("Account created successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success("Signed in with Google!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d0f2c] px-4">
      <Toaster />
      <form
        onSubmit={handleSignup}
        className="bg-gradient-to-br from-[#1b1f44] to-[#0f1230] rounded-3xl shadow-2xl w-full max-w-md p-8 transition-transform transform hover:scale-105 border border-blue-500/40"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-300 drop-shadow-lg">Signup</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-3 mb-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-[#0d0f2c] text-white border-blue-500 placeholder-gray-400 transition"
        />

        <input
          type="text"
          placeholder="Photo URL (Optional)"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
          className="w-full p-3 mb-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-[#0d0f2c] text-white border-blue-500 placeholder-gray-400 transition"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 mb-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-[#0d0f2c] text-white border-blue-500 placeholder-gray-400 transition"
        />

        <div className="relative mb-4">
          <input
            type={show ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-[#0d0f2c] text-white border-blue-500 placeholder-gray-400 transition"
          />
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition"
          >
            {show ? "Hide" : "Show"}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold active:scale-95 transition shadow-lg mb-3"
        >
          Signup
        </button>

        <button
          type="button"
          onClick={handleGoogleSignup}
          className="w-full py-3 border rounded-xl font-medium hover:bg-blue-900/20 transition text-white mb-4 border-blue-500"
        >
          Signup with Google
        </button>

        <p className="text-center text-gray-300">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
