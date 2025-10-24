import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import skillsData from "../data/skills.json";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SkillDetails() {
  const { id } = useParams();
  const skill = skillsData.find((s) => s.skillId === Number(id));

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const leftRef = useRef([]);
  const rightRef = useRef([]);

  useEffect(() => {
    leftRef.current.forEach((el, i) => {
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

    rightRef.current.forEach((el, i) => {
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

  if (!skill) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d0f2c] text-white">
        <p className="text-gray-300 text-lg">Skill not found.</p>
      </div>
    );
  }

  const handleBooking = (e) => {
    e.preventDefault();
    alert(`Session booked successfully for ${name}!`);
    setName("");
    setEmail("");
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-[#0d0f2c] text-white">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div
            ref={(el) => (leftRef.current[0] = el)}
            className="relative overflow-hidden rounded-2xl shadow-lg aspect-video"
          >
            <img
              src={skill.image}
              alt={skill.skillName}
              className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
            />
            <span className="absolute top-4 right-4 bg-white  bg-opacity-20 px-3 py-1 rounded-full text-sm font-medium shadow text-black">
              {skill.category}
            </span>
          </div>

          <div ref={(el) => (leftRef.current[1] = el)}>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-blue-400">
              {skill.skillName}
            </h1>
            <p className="text-gray-300 text-lg mb-6">{skill.description}</p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Rating", value: `${skill.rating} / 5.0` },
                { label: "Price", value: `$${skill.price}` },
                { label: "Slots Available", value: skill.slotsAvailable },
                { label: "Duration", value: "1 hour" },
              ].map((item, i) => (
                <div
                  key={item.label}
                  ref={(el) => (leftRef.current[i + 2] = el)}
                  className="p-4 bg-gradient-to-b from-[#1b1f44] to-[#0f1230] rounded-2xl shadow-lg border border-blue-500/30 hover:scale-105 hover:shadow-2xl hover:shadow-blue-400/50 transition transform"
                >
                  <p className="text-sm text-gray-400">{item.label}</p>
                  <p className="font-semibold">{item.value}</p>
                </div>
              ))}
            </div>

            <div
              ref={(el) => (leftRef.current[6] = el)}
              className="mt-6 p-4 bg-gradient-to-b from-[#1b1f44] to-[#0f1230] rounded-2xl shadow-lg border border-blue-500/30"
            >
              <h3 className="font-semibold mb-1">Instructor</h3>
              <p className="text-lg font-medium">{skill.providerName}</p>
              <p className="text-sm text-gray-400">{skill.providerEmail}</p>
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-24 space-y-4">
          <div
            ref={(el) => (rightRef.current[0] = el)}
            className="p-6 bg-gradient-to-b from-[#1b1f44] to-[#0f1230] rounded-2xl shadow-lg border border-blue-500/30"
          >
            <h2 className="text-xl font-bold mb-4 text-blue-400">Book a Session</h2>
            <form onSubmit={handleBooking} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                ref={(el) => (rightRef.current[1] = el)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-[#0d0f2c] text-white placeholder-gray-400"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                ref={(el) => (rightRef.current[2] = el)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-[#0d0f2c] text-white placeholder-gray-400"
              />
              <div
                ref={(el) => (rightRef.current[3] = el)}
                className="p-4 bg-gradient-to-b from-[#08132a] to-[#0d0f2c] rounded-2xl space-y-1"
              >
                <div className="flex justify-between text-gray-400">
                  <span>Session Price:</span>
                  <span>${skill.price}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span>${skill.price}</span>
                </div>
              </div>
              <button
                ref={(el) => (rightRef.current[4] = el)}
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-2xl font-medium hover:bg-blue-600 transition"
              >
                Book Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
