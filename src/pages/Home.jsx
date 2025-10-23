import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SkillCard from "../components/SkillCard";
import skillsData from "../data/skills.json";
import HeroSlider from "../components/HeroSlider";

export default function Home() {
  const navigate = useNavigate();
  const topSkills = skillsData.slice(0, 9);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6 },
    }),
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Hero Text */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-blue-600 text-white py-12 px-4 text-center"
      >
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Learn New Skills Today
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-6"
        >
          Discover amazing skills and learn from top instructors near you.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("#skills")}
          className="bg-white text-blue-600 font-semibold px-6 py-3 rounded hover:bg-gray-100 transition"
        >
          Explore Skills
        </motion.button>
      </motion.section>

      {/* Popular Skills */}
      <section id="skills" className="py-16 px-4 container mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold mb-4">
            Popular Skills
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-600 max-w-2xl mx-auto">
            Discover the most sought-after skills in your community. Start learning today!
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {topSkills.map((skill, index) => (
            <motion.div
              key={skill.skillId}
              custom={index}
              variants={fadeUp}
              whileHover={{ scale: 1.03 }}
              className="cursor-pointer"
            >
              <SkillCard skill={skill} />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
