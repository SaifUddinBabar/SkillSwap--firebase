import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import skillsData from "../data/skills.json";

export default function HeroSlider() {
  const slides = skillsData.slice(0, 3); 

  return (
    <div className="relative w-full h-[400px] md:h-[600px]">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="w-full h-full rounded-lg overflow-hidden"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.skillId}>
            <div className="relative w-full h-full">
              <img
                src={slide.image}
                alt={slide.skillName}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-10 left-5 md:left-10 bg-black/60 p-5 rounded-lg max-w-md text-white">
                <h2 className="text-lg md:text-3xl font-bold mb-2">
                  {slide.skillName}
                </h2>
                <p className="text-sm md:text-lg">{slide.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
