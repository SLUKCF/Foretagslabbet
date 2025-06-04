import React from "react";

const labels = {
  delningsvilja: "Delningsvilja",
  tillit: "Tillit",
  öppenhet: "Öppenhet",
  autonomi: "Autonomi"
};

const valueLabel = (v) => {
  if (v === 1) return "Hög";
  if (v === 0) return "Neutral";
  if (v === -1) return "Låg";
  return "";
};

const getHeight = (v) => {
  // Normalisera v från [-1,1] till [0,1]
  const normalized = (v + 1) / 2;
  // Omvandla till procent
  return `${normalized * 100}%`;
};

export default function AiCompassBarChart({ data }) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-10 text-center">
        {Object.keys(data.current).map((key) => (
          <div key={key} className="flex flex-col items-center">
            {/* Här har varje stapels “container” en fast höjd: h-40 (=10rem) för små skärmar och sm:h-48 (=12rem) för större */}
            <div className="relative w-20 h-56 sm:h-64 bg-white/10 rounded shadow-inner">
              {/* Deltagarens stapel */}
              <div
                className="absolute bottom-0 left-0 w-full bg-[#CEDA00] rounded-t"
                style={{ height: getHeight(data.current[key]) }}
              ></div>

              {/* Linje som visar medelvärde */}
              <div
                className="absolute left-0 w-full h-[2px] bg-white/40"
                style={{ bottom: getHeight(data.average[key]) }}
              ></div>

              {/* Cirkelmarkör vid medelvärdet */}
              <div
                className="absolute right-[-4px] w-2 h-2 bg-white rounded-full"
                style={{ bottom: `calc(${getHeight(data.average[key])} - 4px)` }}
              ></div>
            </div>

            <div className="mt-4">
              <p className="text-sm sm:text-base font-semibold">{labels[key]}</p>
              <p className="text-sm sm:text-base text-white/60">Du: {valueLabel(data.current[key])}</p>
              <p className="text-sm sm:text-base text-white/40">
                Snitt: {valueLabel(Math.round(data.average[key]))}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}