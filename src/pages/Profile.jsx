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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 px-4">
      <Toaster />
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 transition-transform transform hover:-translate-y-1">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">My Profile</h2>

        {/* User Info */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={user?.photoURL || "https://i.postimg.cc/placeholder.png"}
            alt="avatar"
            className="w-24 h-24 rounded-full shadow-md mb-2 object-cover"
          />
          <p className="font-semibold text-lg">{user?.displayName || "No Name"}</p>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>

        {/* Update Form */}
        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          />
          <input
            type="text"
            placeholder="Photo URL"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 active:scale-95 transition"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}
