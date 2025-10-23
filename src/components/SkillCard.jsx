import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function SkillCard({ skill }) {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="border rounded-lg shadow-md p-4 flex flex-col bg-white hover:shadow-xl transition-shadow"
    >
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={skill.image}
          alt={skill.skillName}
          className="w-full h-40 object-cover rounded-lg"
          onError={(e) =>
            (e.currentTarget.src =
              "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop")
          }
        />
        <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
          {skill.category}
        </span>
      </div>

      <h4 className="mt-3 font-semibold text-lg">{skill.skillName}</h4>
      <p className="text-sm text-gray-500">by {skill.providerName}</p>

      <div className="mt-2 flex items-center justify-between">
        <span className="font-bold">${skill.price}</span>
        <span className="text-sm">⭐ {skill.rating}</span>
      </div>

      <button
        onClick={() => navigate(`/skill/${skill.skillId}`)}
        className="mt-4 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        View Details
      </button>
    </motion.div>
  );
}
