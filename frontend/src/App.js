import React, { useState } from "react";
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
   */
  const [active, setActive] = useState("import");

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
        <Sidebar current={active} onNavigate={setActive} />
        <main className="flex-1">
          <header className="bg-white border-b border-gray-200">
            <div className="container-padded flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold capitalize">{active}</h2>
                <p className="text-sm text-gray-500">
                  {active === "import" && "Upload images/videos for analysis."}
                  {active === "analysis" && "View YOLO detections with bounding boxes ≥ 0.7."}
                  {active === "dashboard" && "Explore metadata visualizations and trends."}
                </p>
              </div>
            </div>
          </header>
          <section className="container-padded">
            {renderContent()}
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
