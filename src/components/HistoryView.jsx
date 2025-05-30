

import React from "react";

function HistoryView({ onBack, sessionHistory }) {
  return (
    <div className="flex flex-col items-center justify-center text-center max-w-3xl px-4 py-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4">Historik</h2>
      <p className="text-base sm:text-lg mb-6">
        Här kan du se alla tidigare AI-kompass-svar.
      </p>
      {sessionHistory.length > 0 ? (
        <table className="w-full text-left text-sm mt-4">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-white/20">Starttid</th>
              <th className="py-2 px-4 border-b border-white/20">Sluttid</th>
              <th className="py-2 px-4 border-b border-white/20">Svar</th>
            </tr>
          </thead>
          <tbody>
            {sessionHistory.map((session, index) => (
              <tr key={index}>
                <td className="py-1 px-4 border-b border-white/10">
                  {new Date(session.startTime).toLocaleString()}
                </td>
                <td className="py-1 px-4 border-b border-white/10">
                  {new Date(session.endTime).toLocaleString()}
                </td>
                <td className="py-1 px-4 border-b border-white/10">
                  {JSON.stringify(session.answers)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-sm text-white/50">Ingen historik ännu.</p>
      )}
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