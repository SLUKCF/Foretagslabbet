import React from "react";

function HistoryView({ onBack, sessionHistory }) {
  return (
    <div className="flex flex-col items-center justify-center text-center max-w-3xl px-4 py-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4">Historik</h2>
      <p className="text-base sm:text-lg mb-6">
        Här kan du se alla tidigare AI-kompass-svar.
      </p>
      {sessionHistory.length > 0 ? (
        <table className="table-auto w-full mt-4 bg-white/10 rounded-lg overflow-hidden">
          <thead className="bg-[#00CEDA]">
            <tr>
              <th className="py-2 px-4 border-b border-white/20 text-white">Starttid</th>
              <th className="py-2 px-4 border-b border-white/20 text-white">Sluttid</th>
              <th className="py-2 px-4 border-b border-white/20 text-white">Resultat</th>
            </tr>
          </thead>
          <tbody>
            {sessionHistory.map((session, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white/5' : 'bg-white/10'}>
                <td className="py-2 px-4 border-b border-white/20 text-sm text-white">
                  {new Date(session.startTime).toLocaleString()}
                </td>
                <td className="py-2 px-4 border-b border-white/20 text-sm text-white">
                  {new Date(session.endTime).toLocaleString()}
                </td>
                <td className="py-2 px-4 border-b border-white/20 text-sm text-white">
                  {Object.values(session.answers).join(', ')}
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