import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { auth } from "../utils/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [user] = useAuthState(auth);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [avatarDropdown, setAvatarDropdown] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "My Profile", path: "/profile" },
  ];

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-bold text-2xl text-blue-600">
          SkillSwap
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 items-center">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                  : "text-gray-700 hover:text-blue-600 transition-all duration-300"
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Auth Buttons & Avatar */}
        <div className="hidden md:flex items-center gap-4 relative">
          {!user ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 transition"
              >
                Signup
              </Link>
            </>
          ) : (
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
              onMouseLeave={() => setAvatarDropdown(false)}
            >
              <img
                src={user.photoURL || "https://i.postimg.cc/placeholder.png"}
                alt="avatar"
                title={user.displayName || user.email}
                className="w-10 h-10 rounded-full cursor-pointer"
                onMouseEnter={() => setAvatarDropdown(true)}
              />
              {/* Avatar Dropdown */}
              <AnimatePresence>
                {avatarDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg overflow-hidden z-50"
                  >
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100 transition"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => signOut(auth)}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white shadow-lg overflow-hidden"
          >
            <div className="flex flex-col px-4 py-4 gap-2">
              {links.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                      : "text-gray-700 hover:text-blue-600 transition-all duration-300"
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              {!user ? (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition text-center"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 transition text-center"
                  >
                    Signup
                  </Link>
                </>
              ) : (
                <button
                  onClick={() => {
                    signOut(auth);
                    setMobileOpen(false);
                  }}
                  className="px-4 py-2 rounded border hover:bg-gray-100 transition text-left"
                >
                  Logout
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
