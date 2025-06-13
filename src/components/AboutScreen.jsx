import React from "react";

export default function AboutScreen({ onBack }) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-8 w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-4">
            Om Företagslabbet
        </h1>
        <p className="text-lg mb-6">
            Företagslabbet är ett koncept för lärande och reflektion kring företagande i lantbruket. 
            Här får du som företagare testa idéer, utforska verktyg och reflektera över din egen utveckling – i ett format som är både enkelt och engagerande.
        </p>
        <p className="text-lg mb-6">
            Bakom Företagslabbet står <span className="font-bold">Kunskapsnav företagsledning och entreprenörskap</span> och <span className="font-bold">HIR Skåne</span>, tillsammans med samarbetspartners som <span class="font-bold">Green Advisor</span>.
        </p>
        <h2 className="text-2xl font-bold mb-4">
            Så här använder du appen
        </h2>
        <p className="text-lg mb-6">
            Välj en aktivitet och följ instruktionerna steg för steg. I olika moment får du göra egna val eller reflektera över din situation som företagare.
        </p>
        <p className="text-lg mb-6">
            Du kan när som helst be en vägledare om hjälp eller läsa mer i informationsvyerna som du (när det finns mer information) når genom att klicka på <span className="font-bold">”i”</span> högst upp till höger på skärmen.
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