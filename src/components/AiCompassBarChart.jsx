import React from "react";
import { UsersIcon } from '@heroicons/react/24/solid';

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
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 mt-4">
      {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-10 text-center"> */}
      <div className="grid grid-cols-2 min-[480px]:grid-cols-4 gap-4 min-[480px]:gap-8 text-center">
        {Object.keys(data.current).map((key) => (
          <div key={key} className="flex flex-col items-center">
            {/* Här har varje stapels “container” en fast höjd: h-40 (=10rem) för små skärmar och sm:h-48 (=12rem) för större */}
            {/* <div className="relative w-20 h-56 sm:h-64 bg-white/10 rounded shadow-inner"> */}
            <div className="relative w-16 h-32 min-[480px]:w-20 min-[480px]:h-56 bg-white/10 rounded shadow-inner">
              {/* Deltagarens stapel */}
              <div
                className="absolute bottom-0 left-0 w-full bg-[#CEDA00] rounded-t"
                style={{ height: getHeight(data.current[key]) }}
              ></div>

              {/* Pilmarkör vid medelvärdet */}
              <svg
                className="absolute z-10 right-[-6px] w-4 h-4 text-white transform rotate-180"
                style={{
                  bottom:
                    data.average[key] <= -1
                      ? "0px"
                      : `calc(${getHeight(data.average[key])} - 8px)`,
                }}
                viewBox="0 0 8 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 6 L0 0 V12 L8 6 Z" fill="currentColor" />
              </svg>              
              {/* <UsersIcon
                className="absolute z-10 right-[-10px] w-6 h-6 text-white"
                style={{
                  bottom:
                    data.average[key] <= -1
                      ? "0px"
                      : `calc(${getHeight(data.average[key])} - 12px)`,
                }}
              /> */}
            </div>

            <div className="mt-4">
              <p className="text-sm sm:text-base font-semibold">{labels[key]}</p>
              <p className="text-sm sm:text-base text-white/60">{valueLabel(data.current[key])}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}