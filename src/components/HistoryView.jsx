

import React from "react";

function HistoryView({ onBack }) {
  return (
    <div className="flex flex-col items-center justify-center text-center max-w-3xl px-4 py-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4">Historik</h2>
      <p className="text-base sm:text-lg mb-6">
        Här kan du se alla tidigare AI-kompass-svar.
      </p>
      {/* TODO: List or download previous sessions here */}
      <button
        onClick={onBack}
        className="mt-4 px-6 py-2 border border-white text-white rounded hover:bg-white/10"
      >
        Tillbaka
      </button>
    </div>
  );
}

export default HistoryView;