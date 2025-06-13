import React from "react";

export default function SidebarMenu({ isOpen, onClose, onNavigate }) {
  return (
    <>
      {/* Halvtransparent overlay */}
      <div
        className={`fixed inset-0 z-30 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      ></div>

      {/* Sidopanelen */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#00A6A6] text-white transform transition-transform duration-300 flex flex-col h-full ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/20">
          <h2 className="text-xl font-bold">Meny</h2>
            <button onClick={onClose} className="p-1 focus:outline-none">
                <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>
        </div>
        <nav className="flex flex-col p-4 space-y-2">
            <button
                onClick={() => {
                onNavigate("aistart");
                }}
                className="text-left py-2 px-3 rounded hover:bg-white/10 transition-colors"
            >
                AI-kompassen
            </button>
            <button
                onClick={() => {
                onNavigate("aiadvice");
                }}
                className="text-left py-2 px-3 rounded hover:bg-white/10 transition-colors"
            >
                Råd om AI & data
            </button>
            <button
                onClick={() => {
                onNavigate("history");
                }}
                className="text-left py-2 px-3 rounded hover:bg-white/10 transition-colors"
            >
                Historik
            </button>
            <button
                onClick={() => {
                onNavigate("about");
                }}
                className="text-left py-2 px-3 rounded hover:bg-white/10 transition-colors"
            >
                Om Företagslabbet
            </button>
        </nav>
      <div className="mt-auto px-4 py-2 text-xs text-white/50 border-t border-white/20">
        v1.0.61
      </div>
      </aside>
    </>
  );
}