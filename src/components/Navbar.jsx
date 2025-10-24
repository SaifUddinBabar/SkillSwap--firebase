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
    <nav className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 shadow-lg fixed w-full z-50">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        <Link
          to="/"
          className="font-extrabold text-2xl text-white tracking-wide hover:text-yellow-400 transition-all duration-500"
        >
          SkillSwap
        </Link>

        <div className="hidden md:flex gap-8 items-center">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-400 font-semibold border-b-2 border-yellow-400 pb-1 transition-all"
                  : "text-white hover:text-yellow-400 hover:border-b-2 hover:border-yellow-400 pb-1 transition-all duration-300"
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4 relative">
          {!user ? (
            <>
              <Link
                to="/login"
                className="px-5 py-2 rounded-lg bg-yellow-400 text-blue-900 font-medium hover:bg-yellow-300 transition shadow-md hover:shadow-lg"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2 rounded-lg border border-yellow-400 text-white font-medium hover:bg-yellow-400 hover:text-blue-900 transition shadow-md hover:shadow-lg"
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
                className="w-11 h-11 rounded-full cursor-pointer ring-2 ring-yellow-400 hover:ring-yellow-500 transition-all duration-300"
                onMouseEnter={() => setAvatarDropdown(true)}
              />
              <AnimatePresence>
                {avatarDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-44 bg-blue-800 border border-yellow-400 rounded-xl shadow-xl overflow-hidden z-50"
                  >
                    <Link
                      to="/profile"
                      className="block px-5 py-2 hover:bg-yellow-400 hover:text-blue-900 text-white transition font-medium"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => signOut(auth)}
                      className="block w-full text-left px-5 py-2 hover:bg-yellow-400 hover:text-blue-900 text-white transition font-medium"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={28} className="text-white" /> : <Menu size={28} className="text-white" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-blue-900 shadow-lg overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-3">
              {links.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-yellow-400 font-semibold border-b-2 border-yellow-400 pb-1 transition-all"
                      : "text-white hover:text-yellow-400 hover:border-b-2 hover:border-yellow-400 pb-1 transition-all duration-300"
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              {!user ? (
                <>
                  <Link
                    to="/login"
                    className="px-5 py-2 rounded-lg bg-yellow-400 text-blue-900 font-medium hover:bg-yellow-300 text-center transition shadow-md hover:shadow-lg"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-5 py-2 rounded-lg border border-yellow-400 text-white font-medium hover:bg-yellow-400 hover:text-blue-900 text-center transition shadow-md hover:shadow-lg"
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
                  className="px-5 py-2 rounded-lg border border-yellow-400 text-white font-medium hover:bg-yellow-400 hover:text-blue-900 text-left transition shadow-md hover:shadow-lg"
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
