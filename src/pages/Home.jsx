import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSlider from "../components/HeroSlider";
import SkillCard from "../components/SkillCard";
import skillsData from "../data/skills.json";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const navigate = useNavigate();
  const skillsRef = useRef([]);
  const howRef = useRef([]);
  const providersRef = useRef([]);

  const topSkills = skillsData.slice(0, 9);

  const topProviders = [
    { name: "Maya Patel", skills: "Yoga & Meditation", rating: 4.9, students: 150 },
    { name: "David Chen", skills: "Web Development", rating: 4.7, students: 120 },
    { name: "Emma Wilson", skills: "Photography", rating: 4.9, students: 95 },
    { name: "Sofia Romano", skills: "Italian Cooking", rating: 4.8, students: 80 },
  ];

  const stats = [
    { value: "5000+", label: "Active Learners" },
    { value: "500+", label: "Skill Providers" },
    { value: "50+", label: "Skill Categories" },
    { value: "4.8", label: "Average Rating" },
  ];

  useEffect(() => {
    skillsRef.current.forEach((el, i) => {
      gsap.fromTo(
        el,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: i * 0.15,
          scrollTrigger: { trigger: el, start: "top 90%" },
        }
      );
    });

    howRef.current.forEach((el, i) => {
      gsap.fromTo(
        el,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: i * 0.2,
          scrollTrigger: { trigger: el, start: "top 90%" },
        }
      );
    });

    providersRef.current.forEach((el, i) => {
      gsap.fromTo(
        el,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: i * 0.15,
          scrollTrigger: { trigger: el, start: "top 90%" },
        }
      );
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#0d0f2c] text-white pt-20">
      <HeroSlider />

      <section className="py-16 text-center px-4">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-extrabold mb-4 text-blue-400"
        >
          Learn Magical Skills Today
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-6"
        >
          Discover enchanting skills, master new talents, and transform your life with top instructors.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("#skills")}
          className="bg-blue-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-600 transition shadow-lg"
        >
          Explore Skills
        </motion.button>
      </section>

      <section id="skills" className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-300">
          Popular Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topSkills.map((skill, i) => (
            <div
              key={skill.skillId}
              ref={(el) => (skillsRef.current[i] = el)}
              className="bg-gradient-to-b from-[#1b1f44] to-[#0f1230] p-6 rounded-3xl shadow-lg border border-blue-500/30 hover:scale-105 hover:shadow-2xl hover:shadow-blue-400/50 transition transform text-white"
            >
              <SkillCard skill={skill} />
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 bg-[#08132a]">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-300">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { icon: "👤", title: "Create Account", desc: "Sign up free and create your profile." },
            { icon: "🔍", title: "Browse Skills", desc: "Explore hundreds of skills from experts." },
            { icon: "📅", title: "Book Session", desc: "Choose a time that works for you." },
            { icon: "🎓", title: "Start Learning", desc: "Attend and start your journey." },
          ].map((step, i) => (
            <div
              key={i}
              ref={(el) => (howRef.current[i] = el)}
              className="bg-gradient-to-b from-[#1b1f44] to-[#0f1230] p-6 rounded-3xl shadow-lg border border-blue-500/30 hover:scale-105 hover:shadow-2xl hover:shadow-blue-400/50 transition transform text-white text-center"
            >
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="font-semibold text-xl mb-2">{step.title}</h3>
              <p className="text-gray-300 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-300">
          Top Providers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {topProviders.map((provider, i) => (
            <div
              key={i}
              ref={(el) => (providersRef.current[i] = el)}
              className="bg-gradient-to-b from-[#1b1f44] to-[#0f1230] p-6 rounded-3xl shadow-lg border border-blue-500/30 hover:scale-105 hover:shadow-2xl hover:shadow-blue-400/50 transition transform text-white text-center"
            >
              <h3 className="text-xl font-bold mb-2">{provider.name}</h3>
              <p className="text-blue-300 mb-1">{provider.skills}</p>
              <p className="text-gray-300 text-sm">⭐ {provider.rating} | {provider.students} Students</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 bg-[#08132a]">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="p-6 bg-gradient-to-b from-[#1b1f44] to-[#0f1230] rounded-3xl shadow-lg border border-blue-500/30 hover:shadow-2xl transition transform">
              <h3 className="text-3xl font-bold text-blue-400 mb-1">{stat.value}</h3>
              <p className="text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
