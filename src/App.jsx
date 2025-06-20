import React, { useEffect } from "react";
import HomeScreen from "./components/HomeScreen";
import SideBarMenu from "./components/SideBarMenu";
import AiStartScreen from "./components/AiStartScreen";
import AiExercise from "./components/AiExercise";
import AiAdviceScreen from "./components/AiAdviceScreen";
import HistoryScreen from "./components/HistoryScreen";
import AboutScreen from "./components/AboutScreen";
import InfoOverlay from "./components/InfoOverlay";
import { InformationCircleIcon } from '@heroicons/react/24/outline';

function App() {
  const [view, setView] = React.useState("home");
  const [previousView, setPreviousView] = React.useState("home");
  const [sessionHistory, setSessionHistory] = React.useState([]);
  // Load saved history from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("aiSessionHistory");
    if (stored) {
      try {
        setSessionHistory(JSON.parse(stored));
      } catch (e) {
        console.error("Kunde inte tolka sparad sessionHistory:", e);
      }
    }
  }, []);
	const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const [showInfo, setShowInfo] = React.useState(false);
  const [infoContext, setInfoContext] = React.useState(null);
  
  const logSession = (sessionData) => {
    setSessionHistory((prev) => [...prev, sessionData]);
  };
  // Persist sessionHistory to localStorage whenever it updates
  useEffect(() => {
    localStorage.setItem("aiSessionHistory", JSON.stringify(sessionHistory));
  }, [sessionHistory]);

  return (
    <div className="w-screen min-h-screen h-screen text-white flex items-center justify-center overflow-auto">
      <div className="fixed inset-0 bg-[#007b87] z-0"></div>
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {/* Hamburger button in top-left */}
        <button
          className="absolute top-4 left-4 p-2 focus:outline-none"
          onClick={() => setIsSidebarOpen(true)}
        >
          <svg
            className="h-6 w-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        {/* “Företagslabbet”-etikett till höger om hamburgarikonen */}
        {view !== "home" && (
          <button
            className="absolute top-4 left-16 h-10 flex items-center text-xl font-bold text-white focus:outline-none"
            onClick={() => {
              setView("home");
              setIsSidebarOpen(false);
            }}
          >
            Företagslabbet
          </button>
        )}

        {/* Informationsknapp höger-centrerad */}
        {["aiexercise", "aistart"].includes(view) && (
          <button
            className="absolute top-4 right-4 p-2 focus:outline-none z-50"
            onClick={() => {
              setShowInfo(true);
            }}
          >
            <InformationCircleIcon className="h-6 w-6 text-white" />
          </button>
        )}

        {/* Sidebar menu */}
        <SideBarMenu
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onNavigate={(target) => {
            setPreviousView(view);
            setView(target);
            setIsSidebarOpen(false);
          }}
        />

        {view === "home" && <HomeScreen />}
        {view === "aistart" && (
          <AiStartScreen
            onBegin={() => setView("aiexercise")}
            showInfo={showInfo}
            setInfoContext={setInfoContext}
          />
        )}
        {view === "aiexercise" && (
          <AiExercise
            onBack={() => setView("aistart")}
            onAdvice={() => setView("aiadvice")}
            onLogSession={logSession}
            sessionHistory={sessionHistory}
            showInfo={showInfo}
            setInfoContext={setInfoContext}
          />
        )}
        {view === "aiadvice" && <AiAdviceScreen onBack={() => setView("aistart")} />}
        {view === "history" && (
          <HistoryScreen
            onBack={() => setView(previousView)}
            sessionHistory={sessionHistory}
          />
        )}
        {view === "about" && (
          <AboutScreen onBack={() => setView(previousView)} />
        )}

        {console.log("Aktiv infoContext:", infoContext)}
        {showInfo && infoContext && (
          <InfoOverlay
            view={view}
            infoContext={infoContext}
            onClose={() => {
              setShowInfo(false);
              setInfoContext(null);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App;