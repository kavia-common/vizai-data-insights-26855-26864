import React from "react";

// PUBLIC_INTERFACE
export default function Sidebar({ current, onNavigate, open = false, onClose }) {
  /** Sidebar navigation for the dashboard
   * Props:
   * - current: string key of the active section
   * - onNavigate: function(key) to switch active section
   * - open: boolean; whether the sidebar is open on small screens
   * - onClose: function() to close the sidebar (used on mobile/backdrop/close)
   */
  const items = [
    { key: "import", label: "Import" },
    { key: "analysis", label: "Analysis" },
    { key: "dashboard", label: "Dashboard" },
  ];

  return (
    <>
      {/* Off-canvas on mobile, static on md+ */}
      <aside
        id="app-sidebar"
        role="complementary"
        aria-hidden={!open}
        className={[
          "bg-white border-r border-gray-200 h-screen top-0 z-40",
          // base widths/positioning
          "w-64 md:w-64",
          // mobile: fixed with slide transform; desktop: static visible
          "fixed md:sticky",
          // transition
          "transition-transform duration-300 ease-in-out",
          // translate for mobile open/close
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        ].join(" ")}
      >
        <div className="p-4 border-b border-gray-200 flex items-center justify-between md:block">
          <div>
            <h1 className="text-xl font-bold text-gray-800">vizAi</h1>
            <p className="text-xs text-gray-500">Data Insights</p>
          </div>
          {/* Close button visible only on mobile */}
          <button
            type="button"
            aria-label="Close sidebar"
            onClick={onClose}
            className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition"
          >
            <span className="sr-only">Close sidebar</span>
            <span className="block w-4 h-0.5 bg-gray-800 rotate-45 translate-y-0.5" />
            <span className="block w-4 h-0.5 bg-gray-800 -rotate-45 -translate-y-0.5" />
          </button>
        </div>

        <nav className="p-2">
          {items.map((item) => {
            const isActive = current === item.key;
            return (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition-colors
                ${
                  isActive
                    ? "bg-orange-50 text-orange-700 border border-orange-200"
                    : "text-gray-700 hover:bg-gray-50"
                }
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
    </>
  );
}
