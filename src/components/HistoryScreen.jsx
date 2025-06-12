import React from "react";

function HistoryScreen({ onBack, sessionHistory }) {
  // Function to export sessionHistory as CSV
  const downloadCSV = (e) => {
    // Define headers
    const headers = ["Starttid", "Sluttid", "Scenario1", "Scenario2", "Scenario3", "Scenario4"];

    // Build rows: each session’s timestamps and individual answers
    const rows = sessionHistory.map((session) => {
      const start = new Date(session.startTime).toISOString();
      const end = new Date(session.endTime).toISOString();
      const answers = session.answers;
      // Assuming answers object has keys scenario1..scenario4
      return [
        start,
        end,
        answers.scenario1,
        answers.scenario2,
        answers.scenario3,
        answers.scenario4,
      ];
    });

    // Combine headers and rows into CSV string
    const csvContent =
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    // Create a Blob and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `AI-kompass_historik_${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Ta bort fokus från knappen efter klick
    if (e && e.currentTarget) {
      e.currentTarget.blur();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center max-w-3xl px-4 py-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4">Historik</h2>
      {/* Knappar för Tillbaka och Export CSV */}
      <div className="mt-4 flex space-x-4">
        <button
          onClick={onBack}
          className="px-6 py-2 border border-white text-white rounded-lg bg-white/10 hover:bg-white/20"
        >
          Tillbaka
        </button>
        <button
          onClick={downloadCSV}
          className="px-6 py-2 bg-[#CEDA00] text-black rounded-lg hover:bg-[#b8c500]"
        >
          Ladda ner som CSV
        </button>
      </div>
      <br/>
      {sessionHistory.length > 0 ? (
        <>
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
        </>
      ) : (
        <p className="text-sm text-white/50">Ingen historik ännu.</p>
      )}

    </div>
  );
}

export default HistoryScreen;