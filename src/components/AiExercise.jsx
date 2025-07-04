import React, { useState, useEffect } from "react";
import AiCompassBarChart from "./AiCompassBarChart";

export default function AiExercise({ onBack, onAdvice, onLogSession, sessionHistory, showInfo, setInfoContext, onShowInfo }) {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showIntro, setShowIntro] = useState(true);
  const [showSummary, setShowSummary] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [hasLoggedSession, setHasLoggedSession] = useState(false);

  useEffect(() => {
    if (showInfo) {
      if (showSummary) {
        setInfoContext("barChart");
      } else {
        setInfoContext("exercise");
      }
    }
  }, [showInfo, showSummary, setInfoContext]);

  const restart = () => {
    setCurrentScenario(0);
    setAnswers({});
    setShowIntro(true);
    setShowSummary(false);
    setHasLoggedSession(false);
  };

  const handleAnswer = (questionId, score, text) => {
    const newAnswers = { ...answers, [questionId]: score };
    setAnswers(newAnswers);
    
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
    } else {
      setShowSummary(true);
    }
  };

  const goBack = () => {
    if (showSummary) {
      setShowSummary(false);
      setCurrentScenario(scenarios.length - 1);
    } else if (currentScenario > 0) {
      const newAnswers = { ...answers };
      delete newAnswers[scenarios[currentScenario - 1].id];
      setAnswers(newAnswers);
      setCurrentScenario(currentScenario - 1);
    } else {
      setShowIntro(true);
    }
  };

  const calculateCompassData = () => {
    return {
      delningsvilja: answers.scenario1 ?? 0,
      tillit: answers.scenario2 ?? 0,
      öppenhet: answers.scenario3 ?? 0,
      autonomi: answers.scenario4 ?? 0
    };
  };

  const calculateAverageCompass = () => {
    if (!sessionHistory || sessionHistory.length === 0) {
      return { delningsvilja: 0, tillit: 0, öppenhet: 0, autonomi: 0 };
    }
    const sums = sessionHistory.reduce(
      (acc, session) => {
        const answers = session.answers;
        acc.delningsvilja += answers.scenario1 ?? 0;
        acc.tillit += answers.scenario2 ?? 0;
        acc.öppenhet += answers.scenario3 ?? 0;
        acc.autonomi += answers.scenario4 ?? 0;
        return acc;
      },
      { delningsvilja: 0, tillit: 0, öppenhet: 0, autonomi: 0 }
    );
    const count = sessionHistory.length;
    return {
      delningsvilja: sums.delningsvilja / count,
      tillit: sums.tillit / count,
      öppenhet: sums.öppenhet / count,
      autonomi: sums.autonomi / count
    };
  };

  const scenarios = [
    {
      id: "scenario1",
      title: "Kartläggning – dina data, din mark",
      text: "Du erbjuds att använda en AI-tjänst som hjälper dig att analysera dina jordarter, pH och vattenhållande förmåga – i utbyte mot att du laddar upp skördekartor och markdata.",
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
        { text: "Jag kanske kan byta senare", score: 0 },
        { text: "Det är okej – det fungerar", score: -1 }
      ]
    }
  ];

  // Ensure this useEffect is always at the top level, not inside any conditional
  useEffect(() => {
    if (showSummary && !hasLoggedSession) {
      const endTime = new Date();
      onLogSession({
        answers,
        startTime: sessionStartTime,
        endTime: endTime
      });
      setHasLoggedSession(true);
    }
  }, [showSummary, hasLoggedSession, onLogSession, answers, sessionStartTime]);

  if (showIntro) {
    return (
      <div className="flex flex-col items-center justify-center text-center px-4 sm:px-6 py-8 w-full max-w-4xl">
        {/* Dummy element to steal initial focus in Safari */}
        <div tabIndex="-1" className="opacity-0 absolute top-0 left-0 w-1 h-1"></div>
        <div className="text-center max-w-xl px-4 sm:px-6 mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Potentialen i din data</h2>
          <p className="text-base sm:text-lg mb-6">
            Du kommer nu få ta del av en berättelse som handlar om att utveckla en åkermark med hjälp av AI. 
            I varje steg får du ta ställning till olika val kopplade till data, kontroll och värdeskapande.
          </p>
          <button
            onClick={() => {
              setSessionStartTime(new Date());
              setShowIntro(false);
            }}
            className="mt-4 px-6 py-2 bg-[#CEDA00] text-black rounded-lg hover:bg-[#b8c500]"
          >
            Ok, vi kör!
          </button>
        </div>
      </div>
    );
  }

  if (showSummary) {
    const compass = calculateCompassData();
    console.log("sessionHistory i showSummary:", sessionHistory);
    console.log("Beräknat genomsnitt:", calculateAverageCompass());
    return (
      <div className="flex flex-col items-center justify-center text-center px-4 sm:px-6 py-8 w-full max-w-4xl">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Din AI-kompass</h2>
          <AiCompassBarChart
            data={{
              current: compass,
              average: calculateAverageCompass()
            }}
            onShowInfo={() => onShowInfo("barChart")}
          />
          <button
            onClick={restart}
            className="mt-6 mx-2 px-6 py-2 rounded-lg text-white bg-white/10 hover:bg-white/20"
          >
            Gör om övningen
          </button>
          <button
            onClick={onAdvice}
            className="mt-4 mx-2 px-6 py-2 rounded-lg text-black bg-[#CEDA00] hover:bg-[#b8c500]"
          >
            Nästa: Några råd på vägen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center text-center px-4 sm:px-6 py-8 w-full max-w-4xl">
      {/* Progress indicator */}
      <div className="w-full max-w-md mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-white/70">Scenario {currentScenario + 1} av {scenarios.length}</span>
          <span className="text-sm text-white/70">{Math.round(((currentScenario + 1) / scenarios.length) * 100)}%</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div 
            className="bg-[#CEDA00] h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((currentScenario + 1) / scenarios.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* All scenarios rendered but only current one visible */}
      <div className="relative w-full max-w-2xl">
        {scenarios.map((scenario, index) => (
          <div
            key={scenario.id}
            className={`transition-all duration-500 ease-in-out ${
              index === currentScenario 
                ? 'opacity-100 translate-x-0 relative' 
                : index < currentScenario 
                  ? 'opacity-0 -translate-x-full absolute inset-0 pointer-events-none'
                  : 'opacity-0 translate-x-full absolute inset-0 pointer-events-none'
            }`}
          >
            <div className="text-center pt-8 min-h-[28rem]">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">{scenario.title}</h2>
              <p className="text-base sm:text-lg mb-6 max-w-2xl mx-auto">{scenario.text}</p>
              <div className="mt-8 flex flex-col gap-4 w-full max-w-md mx-auto">
                {scenario.options.map((option, idx) => (
                  <button
                    key={`${scenario.id}-${idx}`}
                    tabIndex="-1"
                    onClick={() => handleAnswer(scenario.id, option.score, option.text)}
                    disabled={answers[scenario.id] !== undefined}
                    className={`py-3 px-4 sm:px-6 text-sm sm:text-lg rounded-lg font-semibold transition-all duration-300 w-full 
                      bg-white/10 hover:bg-white/20 text-white ${answers[scenario.id] !== undefined ? 'cursor-not-allowed opacity-60' : ''}`}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="mt-8 flex gap-4">
        <button 
          onClick={goBack} 
          className="px-4 py-2 text-sm underline text-white/70 hover:text-white"
          disabled={showIntro}
        >
          Tillbaka
        </button>
      </div>
    </div>
  );
}