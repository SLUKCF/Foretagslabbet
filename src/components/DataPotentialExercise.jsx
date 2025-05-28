import React, { useState, useEffect } from "react";
import CompassBarChart from "./CompassBarChart";
import CompassMosaicChart from "./CompassMosaicChart";

export default function DataPotentialExercise({ onBack, onAdvice }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [viewMode, setViewMode] = useState("bars");
  const [pressedId, setPressedId] = useState(null);

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);
  const restart = () => {
    setStep(0);
    setAnswers({});
  };

  const handleAnswer = (questionId, score, text) => {
    setAnswers((prev) => ({ ...prev, [questionId]: score }));
    setPressedId(`${questionId}:${text}`);
    setTimeout(() => {
      setPressedId(null);
      next();
    }, 700);
  };

  const calculateCompassData = () => {
    return {
      delningsvilja: answers.scenario1 ?? 0,
      tillit: answers.scenario2 ?? 0,
      öppenhet: answers.scenario3 ?? 0,
      autonomi: answers.scenario4 ?? 0
    };
  };

  const scenarios = [
    {
      id: "scenario1",
      title: "Kartläggning – dina data, din mark",
      text: "Du erbjuds att använda en AI-tjänst som hjälper dig att kartlägga dina jordarter, pH och vattenhållande förmåga – i utbyte mot att du laddar upp skördekartor och markdata.",
      options: [
        { text: "Ja, det är värt det – datan är inte känslig", score: 1 },
        { text: "Kanske – om jag vet hur den används", score: 0 },
        { text: "Nej – jag vill inte dela den", score: -1 }
      ]
    },
    {
      id: "scenario2",
      title: "Rekommendationer – värdet av analys",
      text: "AI:n föreslår en skräddarsydd gödslingsstrategi som ska öka lönsamheten – men ger inte full insyn i hur den räknat.",
      options: [
        { text: "Jag litar på att det fungerar", score: 1 },
        { text: "Jag vill veta hur den räknat", score: 0 },
        { text: "Jag är tveksam utan insyn", score: -1 }
      ]
    },
    {
      id: "scenario3",
      title: "Delad utveckling – vem får följa med i dina framsteg?",
      text: "Resultaten är positiva. En rådgivare frågar om han får använda dina data som 'god praxis' i sitt AI-verktyg för andra gårdar.",
      options: [
        { text: "Ja, det gynnar andra och mig", score: 1 },
        { text: "Endast om jag får ersättning eller insyn", score: 0 },
        { text: "Nej, jag vill behålla kontrollen", score: -1 }
      ]
    },
    {
      id: "scenario4",
      title: "Beroenden mot AI:n – behöver du återta kontrollen?",
      text: "Efter två säsonger fungerar systemet bra – men AI:n fungerar bara inom leverantörens ekosystem. Du måste betala för att fortsätta, annars förloras historiken.",
      options: [
        { text: "Jag vill inte bli låst", score: 1 },
        { text: "Jag vill kunna byta fritt", score: 0 },
        { text: "Det är okej – det fungerar", score: -1 }
      ]
    }
  ];

  const introStep = (
    <div className="text-center max-w-xl px-4 sm:px-6 mx-auto">
      <h2 className="text-3xl sm:text-4xl font-bold mb-6">Potentialen i din data</h2>
      <p className="text-base sm:text-lg mb-6">
        Du kommer nu få ta del av en berättelse som handlar om att utveckla en åkermark med hjälp av AI. 
        I varje steg får du ta ställning till olika val kopplade till data, kontroll och värdeskapande.
      </p>
      <button
        onClick={next}
        className="mt-4 px-6 py-2 bg-[#CEDA00] text-black rounded-lg hover:bg-[#b8c500]"
      >
        Börja
      </button>
    </div>
  );

  const scenarioStep = (s) => (
    <div className="text-center">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4">{s.title}</h2>
      <p className="text-base sm:text-lg mb-6 max-w-2xl mx-auto">{s.text}</p>
      <div className="flex flex-col gap-4 w-full max-w-md mx-auto">
        {s.options.map((option, idx) => {
          const isPressed = pressedId === `${s.id}:${option.text}`;
          return (
            <div
              key={`${s.id}-${idx}`}
              role="button"
              tabIndex={0}
              onClick={() => handleAnswer(s.id, option.score, option.text)}
              className={`py-3 px-4 sm:px-6 text-sm sm:text-lg rounded-lg font-semibold transition-all duration-300 w-full
                ${isPressed ? "bg-[#CEDA00] text-black" : "bg-white/10 hover:bg-white/20"} focus:outline-none`}
            >
              {option.text}
            </div>
          );
        })}
      </div>
      <button onClick={back} className="mt-6 text-xs sm:text-sm underline">
        Tillbaka
      </button>
    </div>
  );

  const summaryStep = (() => {
    const compass = calculateCompassData();
    return (
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">Din AI-kompass</h2>
        <div onClick={() => setViewMode(viewMode === "bars" ? "mosaic" : "bars")} className="cursor-pointer">
          {viewMode === "bars" ? (
            <CompassBarChart
              data={{
                current: compass,
                average: {
                  delningsvilja: 0,
                  tillit: -1,
                  öppenhet: 1,
                  autonomi: 0
                }
              }}
            />
          ) : (
            <CompassMosaicChart data={compass} />
          )}
        </div>
        <button
          onClick={restart}
          className="mt-6 px-6 py-2 border border-white text-white rounded-lg hover:bg-white/10"
        >
          Gör om övningen
        </button>
        <button
          onClick={onAdvice}
          className="mt-4 ml-4 px-6 py-2 bg-[#CEDA00] text-black rounded-lg hover:bg-[#b8c500]"
        >
          Nästa: Några råd på vägen
        </button>
      </div>
    );
  })();

  useEffect(() => {
    setPressedId(null);
  }, [step]);

  return (
    <div className="flex flex-col items-center justify-center text-center px-4 sm:px-6 py-8 w-full max-w-4xl">
      {step === 0 && introStep}
      {step > 0 && step <= scenarios.length && (
        <React.Fragment key={step}>
          {scenarioStep(scenarios[step - 1])}
        </React.Fragment>
      )}
      {step === scenarios.length + 1 && summaryStep}
    </div>
  );
}
