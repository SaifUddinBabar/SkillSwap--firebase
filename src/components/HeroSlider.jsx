import React, { useState, useEffect } from "react";
import skillsData from "../data/skills.json";

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  // শুধু প্রথম ৩টি skill নিলাম
  const slides = skillsData.slice(0, 3).map((skill) => ({
    id: skill.skillId,
    title: skill.skillName,
    description: skill.description,
    image: skill.image,
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000); // 5 সেকেন্ড পর slide change
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[400px] md:h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-10 left-5 md:left-10 bg-black bg-opacity-60 p-5 rounded max-w-md md:max-w-xl text-white">
            <h2 className="text-lg md:text-3xl font-bold mb-2">{slide.title}</h2>
            <p className="text-sm md:text-lg">{slide.description}</p>
          </div>
        </div>
      ))}

      {/* Navigation */}
      <div className="absolute flex justify-between items-center top-1/2 left-5 right-5 -translate-y-1/2">
        <button
          className="btn btn-circle btn-sm md:btn-md bg-white/60 hover:bg-white"
          onClick={() =>
            setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
          }
        >
          ❮
        </button>
        <button
          className="btn btn-circle btn-sm md:btn-md bg-white/60 hover:bg-white"
          onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
        >
          ❯
        </button>
      </div>
    </div>
  );
}
