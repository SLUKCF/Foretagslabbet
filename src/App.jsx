import React from "react";
import LoopScreen from "./components/LoopScreen";
import MenuView from "./components/MenuView";
import DataPotentialExercise from "./components/DataPotentialExercise";
import AdviceView from "./components/AdviceView";
import HistoryView from "./components/HistoryView";

function App() {
  const [view, setView] = React.useState("loop");

  return (
    <div className="w-screen min-h-screen h-screen text-white flex items-center justify-center overflow-hidden">
      <div className="fixed inset-0 bg-[#007b87] z-0"></div>
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {view === "loop" && <LoopScreen onContinue={() => setView("menu")} />}
        {view === "menu" && (
          <MenuView
            onStartExercise={() => setView("exercise")}
            onShowAdvice={() => setView("advice")}
            onShowHistory={() => setView("history")}
            onBack={() => setView("loop")}
          />
        )}
        {view === "exercise" && (
          <DataPotentialExercise
            onBack={() => setView("menu")}
            onAdvice={() => setView("advice")}
          />
        )}
        {view === "advice" && <AdviceView onBack={() => setView("loop")} />}
        {view === "history" && <HistoryView onBack={() => setView("menu")} />}
        <div className="absolute bottom-2 right-2 text-xs text-white/60 z-20">
          v1.0.40
        </div>
      </div>
    </div>
  );
}

export default App;