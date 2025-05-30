import React from "react";

export default function MenuView({ onStartExercise, onShowAdvice, onBack }) {
  return (
    <div className="flex flex-col items-center justify-center w-full text-center px-4 py-8 max-w-3xl mx-auto">

      <div className="w-full max-w-2xl flex flex-col gap-8 items-center text-center mb-8">
        <div>
          <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4">Aktiviteter</h3>
          <button
            onClick={onStartExercise}
            className="w-full sm:w-fit mb-4 px-6 py-4 text-base sm:text-lg font-semibold bg-[#CEDA00] text-black rounded hover:bg-[#b8c500]"
          >
            AI-kompassen
          </button>
        </div>
        <div>
          <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4">Lär mer</h3>
          <button
            onClick={onShowAdvice}
            className="w-full sm:w-fit mb-4 px-6 py-4 text-base sm:text-lg font-semibold bg-white/20 text-white rounded hover:bg-white/30"
          >
            Råd om AI och datadelning
          </button>
        </div>
      </div>

      <button
        onClick={() => onSelect("history")}
        className="w-full sm:w-fit mb-4 px-6 py-4 text-base sm:text-lg font-semibold bg-white/20 text-white rounded hover:bg-white/30"
      >
        Visa historik
      </button>

      <button
        onClick={onBack}
        className="mt-6 text-xs sm:text-sm underline"
      >
        Tillbaka till startsidan
      </button>
    </div>
  );
}