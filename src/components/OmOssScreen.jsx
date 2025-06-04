import React from "react";

export default function OmOssScreen({ onBack }) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-8 w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-4">
            Om oss
        </h1>
        <p className="text-lg mb-6">
            Företagslabbet är ett resultat av ett samarbete mellan Kunskapsnav företagsledning 
            och entreprenörskap på Sveriges lantbruksuniversitet samt HIR Skåne.
        </p>
        <p className="text-lg mb-6">
            Green Adviser varit med och utformat AI-kompassen, som är den första av 
            appens interaktiva övningar.
        </p>
        <button
            onClick={onBack}
            className="px-6 py-2 border border-white text-white rounded bg-white/10 hover:bg-white/20 transition"
        >
            Tillbaka
        </button>
    </div>
  );
}