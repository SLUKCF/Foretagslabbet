import React from "react";

const CompassMosaicChart = ({ data }) => {
  // Log input values for debugging
  console.log("Mosaic input values:", data);

  // New logic: use fixed-size blocks centered in the 6x6 grid
  const valueToSize = (v) => {
    if (v === -1) return 1;
    if (v === 0) return 2;
    if (v === 1) return 3;
    return 1;
  };

  const sizeY = valueToSize(data.delningsvilja ?? 0) + valueToSize(data.öppenhet ?? 0);
  const sizeX = valueToSize(data.tillit ?? 0) + valueToSize(data.autonomi ?? 0);

  const marginX = Math.floor((6 - sizeX) / 2);
  const marginY = Math.floor((6 - sizeY) / 2);

  const minX = marginX;
  const maxX = marginX + sizeX - 1;
  const minY = marginY;
  const maxY = marginY + sizeY - 1;

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-[200px] sm:max-w-[240px] md:max-w-[280px]">
        <div className="grid grid-cols-6 grid-rows-6 gap-[2px] bg-white/10">
          {Array.from({ length: 36 }).map((_, i) => {
            const cx = i % 6;
            const cy = Math.floor(i / 6);
            const isActive = cx >= minX && cx <= maxX && cy >= minY && cy <= maxY;
            return (
              <div
                key={i}
                className={`aspect-square w-full ${
                  isActive ? "bg-[#CEDA00]" : "bg-teal-700"
                }`}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CompassMosaicChart;