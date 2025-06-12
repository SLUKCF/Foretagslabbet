import React from "react";
import { XCircleIcon } from "@heroicons/react/24/outline";

export default function InfoOverlay({ view, infoContext, onClose, showInfo }) {
  if (view === "aiexercise" && showInfo && !infoContext) {
    return (
      <div className="absolute inset-0 z-50 bg-[#007b87]/95 text-white p-6" />
    );
  }
  return (
    <div className="absolute inset-0 z-50 bg-[#007b87]/95 text-white p-6 flex flex-col items-center justify-center text-center">
      <button
        className="absolute top-4 right-4 text-white p-2"
        onClick={onClose}
      >
        <XCircleIcon className="h-6 w-6 text-white" /> 
      </button>
      {infoContext === "aistart" && (
        <>
            <div className="text-center max-w-xl px-4 sm:px-6 mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">Vad är AI-kompassen?</h2>
                <p className="text-base sm:text-lg mb-6">
                    AI-kompassen hjälper dig att reflektera kring hur du kan använda AI i din verksamhet.
                    Du får svara på frågor om din data, dina mål och dina förväntningar.
                </p>
            </div>
        </>
      )}
      {view === "aiexercise" && (
        infoContext === "barChart" ? (
          <>
            <div className="text-center max-w-xl px-4 sm:px-6 mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">Vad visar stapeldiagrammet?</h2>
                <p className="text-base sm:text-lg mb-6">
                    Stapeldiagrammet visar hur du förhåller dig till olika aspekter av AI-strategi. 
                    Pilar och färger hjälper dig att se genomsnitt och variation i svar jämfört med andra.
                </p>
            </div>
          </>
        ) : (
          <>
            <div className="text-center max-w-xl px-4 sm:px-6 mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">Hur fungerar övningen?</h2>
                <p className="text-base sm:text-lg mb-6">
                    Du får ta ställning till olika påståenden genom att dra reglagen. Resultatet visas
                    som en karta över olika AI-strategier. Det hjälper dig att förstå vad som passar bäst för dig.              </p>
            </div>
          </>
        )
      )}
    </div>
  );
}