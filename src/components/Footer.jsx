import React from "react";
import { motion } from "framer-motion";
import { FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 mt-10 border-t border-blue-700 text-white">
      <div className="container mx-auto px-4 py-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h3 className="text-2xl font-bold text-yellow-400 mb-2 hover:text-yellow-300 transition-all duration-300">
            SkillSwap
          </h3>
          <p className="text-sm text-gray-300">
            Contact:{" "}
            <a
              href="mailto:skillswap@example.com"
              className="hover:text-yellow-400 transition-colors"
            >
              skillswap@example.com
            </a>
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          <p className="text-sm text-gray-300 mb-2 md:mb-0">Follow us</p>
          <div className="flex gap-4">
            <motion.a
              href="#"
              whileHover={{ scale: 1.3, rotate: 10 }}
              className="text-gray-300 hover:text-blue-400 transition-all"
              title="Twitter"
            >
              <FaTwitter size={22} />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.3, rotate: 10 }}
              className="text-gray-300 hover:text-blue-500 transition-all"
              title="LinkedIn"
            >
              <FaLinkedin size={22} />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.3, rotate: 10 }}
              className="text-gray-300 hover:text-green-400 transition-all"
              title="Email"
            >
              <FaEnvelope size={22} />
            </motion.a>
          </div>
        </div>
      </div>

      <div className="border-t border-blue-700 mt-6 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} SkillSwap. All rights reserved.
      </div>
    </footer>
  );
}
