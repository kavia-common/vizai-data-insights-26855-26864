import React, { useCallback, useEffect, useState } from "react";
import "./index.css";
import "./App.css";
import Sidebar from "./components/layout/Sidebar";
import UploadSection from "./components/upload/UploadSection";
import AnalysisDashboard from "./components/analysis/AnalysisDashboard";
import ChartsSection from "./components/charts/ChartsSection";

// PUBLIC_INTERFACE
function App() {
  /** Root App component with a dashboard layout and simple view switching
   * Sections: Import (UploadSection), Analysis (AnalysisDashboard), Dashboard (ChartsSection).
   * Adds a responsive hamburger menu to toggle the sidebar on small screens.
   */
  const [active, setActive] = useState("import");

  // Track sidebar open state for small screens
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  const toggleSidebar = useCallback(() => setSidebarOpen((s) => !s), []);

  // Close sidebar on route/section change (mobile)
  useEffect(() => {
    closeSidebar();
  }, [active, closeSidebar]);

  // Close sidebar on ESC for accessibility
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const renderContent = () => {
    switch (active) {
      case "import":
        return <UploadSection />;
      case "analysis":
        return <AnalysisDashboard />;
      case "dashboard":
        return <ChartsSection />;
      default:
        return <UploadSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="flex">
        {/* Sidebar: fixed on mobile with slide-in, static on md+ */}
        <Sidebar
          current={active}
          onNavigate={setActive}
          open={sidebarOpen}
          onClose={closeSidebar}
        />

        <main className="flex-1">
          <header className="bg-white border-b border-gray-200">
            <div className="container-padded flex items-center justify-between">
              {/* Mobile hamburger button */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
                  aria-expanded={sidebarOpen}
                  aria-controls="app-sidebar"
                  onClick={toggleSidebar}
                  className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition"
                >
                  <span className="sr-only">
                    {sidebarOpen ? "Close menu" : "Open menu"}
                  </span>
                  {/* Simple hamburger/close icon using CSS */}
                  <span
                    className={`relative block w-5 h-0.5 bg-gray-800 transition-all ${
                      sidebarOpen ? "rotate-45 translate-y-0.5" : ""
                    }`}
                  />
                  <span
                    className={`relative block w-5 h-0.5 bg-gray-800 transition-all mt-1 ${
                      sidebarOpen ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`relative block w-5 h-0.5 bg-gray-800 transition-all mt-1 ${
                      sidebarOpen ? "-rotate-45 -translate-y-1" : ""
                    }`}
                  />
                </button>

                <div>
                  <h2 className="text-lg font-semibold capitalize">{active}</h2>
                  <p className="text-sm text-gray-500">
                    {active === "import" && "Upload images/videos for analysis."}
                    {active === "analysis" &&
                      "View YOLO detections with bounding boxes ≥ 0.7."}
                    {active === "dashboard" &&
                      "Explore metadata visualizations and trends."}
                  </p>
                </div>
              </div>

              {/* Right-aligned placeholder for future actions */}
              <div className="hidden md:block" />
            </div>
          </header>

          <section className="container-padded">{renderContent()}</section>
        </main>
      </div>

      {/* Backdrop for mobile when sidebar is open */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close menu backdrop"
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/30 md:hidden transition-opacity"
        />
      )}
    </div>
  );
}

export default App;
