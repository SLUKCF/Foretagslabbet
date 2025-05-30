import React from "react";
import LoopScreen from "./components/LoopScreen";
import MenuView from "./components/MenuView";
import DataPotentialExercise from "./components/DataPotentialExercise";
import AdviceView from "./components/AdviceView";
import HistoryView from "./components/HistoryView";

function App() {
  const [view, setView] = React.useState("loop");
  const [previousView, setPreviousView] = React.useState("loop");
  const [sessionHistory, setSessionHistory] = React.useState([]);

  const logSession = (sessionData) => {
    setSessionHistory((prev) => [...prev, sessionData]);
  };

  return (
    <div className="w-screen min-h-screen h-screen text-white flex items-center justify-center overflow-hidden">
      <div className="fixed inset-0 bg-[#007b87] z-0"></div>
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {view === "loop" && <LoopScreen onContinue={() => setView("menu")} />}
        {view === "menu" && (
          <MenuView
            onStartExercise={() => setView("exercise")}
            onShowAdvice={() => setView("advice")}
            onBack={() => setView("loop")}
          />
        )}
        {view === "exercise" && (
          <DataPotentialExercise
            onBack={() => setView("menu")}
            onAdvice={() => setView("advice")}
            onLogSession={logSession}
          />
        )}
        {view === "advice" && <AdviceView onBack={() => setView("loop")} />}
        {view === "history" && (
          <HistoryView
            onBack={() => setView(previousView)}
            sessionHistory={sessionHistory}
          />
        )}
        <div className="absolute bottom-2 right-2 text-xs text-white/60 z-20 flex items-center gap-2">
          <span>
            v1.0.45
          </span>
          <button
            onClick={() => {
              setPreviousView(view);
              setView("history");
            }}
            className="text-white/40 hover:text-white underline"
          >
            Admin
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;