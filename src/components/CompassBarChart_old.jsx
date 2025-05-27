
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

export default function CompassBarChart({ data }) {
  return (
    <div className="w-full max-w-4xl mx-auto grid grid-cols-4 gap-4 text-center">
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="flex flex-col items-center">
          <div className="h-48 w-12 flex flex-col-reverse bg-white/10 rounded-lg shadow-inner">
            <div
              className={`w-full rounded-t transition-all duration-300 ${
                value === 1
                  ? "h-full bg-[#CEDA00]"
                  : value === 0
                  ? "h-1/2 bg-[#CEDA00]/70"
                  : "h-1/4 bg-[#CEDA00]/40"
              }`}
            ></div>
          </div>
          <p className="mt-2 text-sm font-semibold">{labels[key]}</p>
          <p className="text-xs text-white/60">{valueLabel(value)}</p>
        </div>
      ))}
    </div>
  );
}
