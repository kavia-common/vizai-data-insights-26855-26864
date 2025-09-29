import React from "react";

// PUBLIC_INTERFACE
export default function Sidebar({ current, onNavigate }) {
  /** Sidebar navigation for the dashboard
   * Props:
   * - current: string key of the active section
   * - onNavigate: function(key) to switch active section
   */
  const items = [
    { key: "import", label: "Import" },
    { key: "analysis", label: "Analysis" },
    { key: "dashboard", label: "Dashboard" },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">vizAi</h1>
        <p className="text-xs text-gray-500">Data Insights</p>
      </div>
      <nav className="p-2">
        {items.map((item) => {
          const isActive = current === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition-colors
                ${isActive ? "bg-orange-50 text-orange-700 border border-orange-200" : "text-gray-700 hover:bg-gray-50"}
              `}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
      <div className="mt-auto p-4 text-xs text-gray-400">
        v0.1 • Ocean Professional
      </div>
    </aside>
  );
}
