import React, { useState, useEffect } from "react";

const activities = [
  "Förbättringar i företaget – var ligger din potential?",
  "Potentialen i din data – hur ser din AI-kompass ut?",
  "Dina pengar – var gör de mest nytta?",
  "Vilken slags företagare är du?"
];

export default function LoopScreen({ onContinue }) {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % activities.length);
        setFade(true);
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      onClick={onContinue}
      className="flex flex-col items-center justify-center text-center w-full h-full p-8 cursor-pointer"
    >
      <h1 className="text-5xl sm:text-6xl md:text-[10vw] font-extrabold text-white drop-shadow-md mb-6 leading-tight">
        Företagslabbet
      </h1>
      <p className="text-sm sm:text-base md:text-[1.5vw] mb-8 max-w-md">
        Kunskapsnav företagsledning och entreprenörskap · HIR Skåne · Green Advisor
      </p>

      <div className={`transition-opacity duration-1000 ${fade ? "opacity-100" : "opacity-0"}`}>
        <p className="text-base sm:text-lg md:text-[2.2vw] italic font-semibold mt-6 mb-4 max-w-[90vw] h-auto md:h-[3vw]">
          {activities[index]}
        </p>
      </div>
      <div className="flex justify-center gap-2">
        {activities.map((_, i) => (
          <span key={i} className={`text-sm sm:text-base md:text-[1.2vw] ${i === index ? "text-white" : "text-white/50"}`}>
            {i === index ? "●" : "○"}
          </span>
        ))}
      </div>
      
      <p className="absolute bottom-4 text-xs sm:text-sm text-white/40 italic">
      Tryck för att fortsätta
      </p>
    </div>
  );
}