import React, { useState } from "react";
import { useParams } from "react-router-dom";
import skillsData from "../data/skills.json";

export default function SkillDetails() {
  const { id } = useParams();
  const skill = skillsData.find((s) => s.skillId === Number(id));
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  if (!skill) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Skill not found.</p>
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
    <div className="min-h-screen py-12 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10">
        {/* Skill Info */}
        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-2xl shadow-lg aspect-video">
            <img
              src={skill.image}
              alt={skill.skillName}
              className="object-cover w-full h-full"
            />
            <span className="absolute top-4 right-4 bg-white bg-opacity-90 px-3 py-1 rounded-full text-sm font-medium shadow">
              {skill.category}
            </span>
          </div>

          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{skill.skillName}</h1>
            <p className="text-gray-600 text-lg mb-6">{skill.description}</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition">
                <p className="text-sm text-gray-500">Rating</p>
                <p className="font-semibold">{skill.rating} / 5.0</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition">
                <p className="text-sm text-gray-500">Price</p>
                <p className="font-semibold">${skill.price}</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition">
                <p className="text-sm text-gray-500">Slots Available</p>
                <p className="font-semibold">{skill.slotsAvailable}</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition">
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-semibold">1 hour</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-white rounded-lg shadow-sm">
              <h3 className="font-semibold mb-1">Instructor</h3>
              <p className="text-lg font-medium">{skill.providerName}</p>
              <p className="text-sm text-gray-500">{skill.providerEmail}</p>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="lg:sticky lg:top-24">
          <div className="p-6 bg-white rounded-lg shadow-md border">
            <h2 className="text-xl font-bold mb-4">Book a Session</h2>
            <form onSubmit={handleBooking} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <div className="p-4 bg-gray-100 rounded-lg space-y-1">
                <div className="flex justify-between text-gray-500">
                  <span>Session Price:</span>
                  <span>${skill.price}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span>${skill.price}</span>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition"
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
