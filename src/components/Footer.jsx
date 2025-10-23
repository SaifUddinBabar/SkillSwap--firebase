import React from "react";
import { motion } from "framer-motion";
import { FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-10 border-t">
      <div className="container mx-auto px-4 py-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        {/* Brand & Contact */}
        <div>
          <h3 className="text-2xl font-bold text-blue-600 mb-2">SkillSwap</h3>
          <p className="text-sm text-gray-600">
            Contact: <a href="mailto:skillswap@example.com" className="hover:text-blue-600 transition">skillswap@example.com</a>
          </p>
        </div>

        {/* Social Links */}
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          <p className="text-sm text-gray-600 mb-2 md:mb-0">Follow us</p>
          <div className="flex gap-4">
            <motion.a
              href="#"
              whileHover={{ scale: 1.2 }}
              className="text-gray-600 hover:text-blue-500 transition"
              title="Twitter"
            >
              <FaTwitter size={20} />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.2 }}
              className="text-gray-600 hover:text-blue-700 transition"
              title="LinkedIn"
            >
              <FaLinkedin size={20} />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.2 }}
              className="text-gray-600 hover:text-green-600 transition"
              title="Email"
            >
              <FaEnvelope size={20} />
            </motion.a>
          </div>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="border-t mt-6 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} SkillSwap. All rights reserved.
      </div>
    </footer>
  );
}
