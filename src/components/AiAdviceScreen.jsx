import React from "react";

export default function AiAdviceScreen({ onBack }) {
  return (
    <div className="max-w-2xl mx-auto text-left p-6">
      <h2 className="text-4xl font-bold mb-6 text-center">Råd om AI och datadelning</h2>
      <ul className="space-y-6 text-lg">
        <li>
          <strong>Fråga din AI-leverantör</strong><br />
          ✓ Hur hanteras din data? <br />
          ✓ Vem äger den och får tillgång till den?
        </li>
        <li>
          <strong>Filtrera vad du delar</strong><br />
          ✓ Ställ in AI:n efter dina behov. <br />
          ✓ Skriv en enkel intern policy för dig och eventuell personal.
        </li>
        <li>
          <strong>Lär dig mer</strong><br />
          ✓ Ju mer du vet, desto bättre kan du avgöra hur du vill att AI ska användas i ditt företag.
        </li>
      </ul>
      <div className="mt-8 text-center">
        <button
          onClick={onBack}
          className="px-6 py-2 bg-[#CEDA00] text-black rounded-lg hover:bg-[#b8c500]"
        >
          Till startsidan
        </button>
      </div>
    </div>
  );
}