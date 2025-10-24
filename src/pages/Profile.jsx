import React, { useState, useEffect } from "react";
import { auth } from "../utils/firebase.config";
import { updateProfile } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import toast, { Toaster } from "react-hot-toast";

export default function Profile() {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setPhoto(user.photoURL || "");
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d0f2c]">
        <p className="text-gray-300 text-lg animate-pulse">Loading...</p>
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d0f2c] px-4">
      <Toaster />
      <div className="bg-gradient-to-br from-[#1b1f44] to-[#0f1230] rounded-3xl shadow-2xl w-full max-w-md p-8 transition-transform transform hover:scale-105 hover:shadow-2xl border border-blue-500/40">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-300 drop-shadow-lg">
          My Profile
        </h2>

        <div className="flex flex-col items-center mb-6">
          <img
            src={user?.photoURL || "https://i.postimg.cc/placeholder.png"}
            alt="avatar"
            className="w-28 h-28 rounded-full shadow-lg mb-3 object-cover border-2 border-blue-500"
          />
          <p className="font-semibold text-xl text-white">{user?.displayName || "No Name"}</p>
          <p className="text-gray-400 text-sm">{user?.email}</p>
        </div>

        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-[#0d0f2c] text-white border-blue-500 placeholder-gray-400 transition"
          />
          <input
            type="text"
            placeholder="Photo URL"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-[#0d0f2c] text-white border-blue-500 placeholder-gray-400 transition"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold active:scale-95 transition shadow-lg"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}
