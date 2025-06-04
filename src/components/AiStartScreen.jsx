// src/components/AiStartScreen.jsx
import React from "react";

export default function AiStartScreen({ onBegin }) {
  return (
    <div
      className="flex flex-col items-center justify-center text-center px-4 py-8 w-full max-w-3xl cursor-pointer"
      onClick={onBegin}
    >
      <h1 className="text-5xl sm:text-6xl md:text-[10vw] font-extrabold text-white drop-shadow-md mb-6 leading-tight">
        AI som stöd eller risk?
      </h1>
      <p className="text-lg sm:text-xl text-white/80">
        Tryck var som helst på skärmen för att börja
      </p>
    </div>
  );
}