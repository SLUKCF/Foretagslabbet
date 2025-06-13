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
        <div className="text-center max-w-xl px-4 sm:px-6 mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Vad är AI-kompassen?</h2>
            <p className="text-base sm:text-lg mb-6">
                AI-kompassen är en övning där du får ta ställning till olika situationer som rör delning av data i samband med AI-användning. 
                Syftet är att du ska få syn på dina egna gränser, värderingar och prioriteringar – och reflektera över hur just <span className="font-bold">du</span> vill använda AI i din roll som företagare.
            </p>
        </div>
      )}
      {view === "aiexercise" && (
        infoContext === "barChart" ? (
            <div className="text-center max-w-xl px-4 sm:px-6 mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">Vad visar stapeldiagrammet?</h2>
                    <p className="text-base sm:text-lg mb-6">
                        Diagrammet visar hur dina val fördelar sig längs fyra linjer:
                    </p>
                    <p className="text-base sm:text-lg mb-6">
                        <span className="font-bold">Delningsvilja:</span> hur villig du är att dela data med en AI.
                    </p>
                    <p className="text-base sm:text-lg mb-6">
                        <span className="font-bold">Tillit:</span> hur mycket du litar på tekniken bakom AI.
                    </p>
                    <p className="text-base sm:text-lg mb-6">
                        <span className="font-bold">Öppenhet:</span> hur du ser på datadelning som ett sätt att bidra till branschen.
                    </p>               
                    <p className="text-base sm:text-lg mb-6">
                        <span className="font-bold">Autonomi:</span> hur självständig du vill vara gentemot AI-leverantörer. 
                    </p>    
                    <p className="text-base sm:text-lg mb-6">
                        Du kan också jämföra dina svar med genomsnittet från tidigare deltagare - <span className="font-bold">de vita pilarna</span> i diagrammet.
                    </p>
                    <p className="text-base sm:text-lg mb-6">
                        När du är klar visas några råd om hur du kan tänka vidare kring datadelning och AI.
                    </p>
                </div>
        ) : (
        <div className="text-center max-w-xl px-4 sm:px-6 mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Hur fungerar övningen?</h2>
            <p className="text-base sm:text-lg mb-6">
                Du får följa en kort berättelse om hur AI kan användas i lantbruket. I fyra steg får du ta ställning till olika val. 
                I varje steg gör du ett val och ser hur det påverkar fyra områden: delningsvilja, tillit, öppenhet och autonomi. 
                Resultatet visas i ett diagram som speglar din hållning.
            </p>
            <p className="text-base sm:text-lg mb-6">
                Det finns inga rätt eller fel!
            </p>
        </div>
        )
      )}
    </div>
  );
}