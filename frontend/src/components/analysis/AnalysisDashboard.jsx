import React from "react";

/** A simple fake set of detections for the placeholder canvas */
const sampleDetections = [
  { id: 1, label: "Person", prob: 0.86, bbox: [40, 40, 120, 160], color: "border-orange-500" },
  { id: 2, label: "Dog", prob: 0.92, bbox: [180, 80, 120, 90], color: "border-green-500" },
  { id: 3, label: "Bicycle", prob: 0.68, bbox: [60, 200, 180, 120], color: "border-blue-500" },
];

// PUBLIC_INTERFACE
export default function AnalysisDashboard() {
  /** AnalysisDashboard
   * Displays a media canvas area and overlays bounding boxes for detections
   * with probability >= 0.7. This is a visual placeholder; actual drawing will
   * integrate with real results later.
   */
  const filtered = sampleDetections.filter(d => d.prob >= 0.7);

  return (
    <div className="space-y-6">
      <div className="card">
        <div className="card-header">Detections</div>
        <div className="card-body">
          <div className="relative w-full h-80 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
            {/* Placeholder media area */}
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              Media Canvas (image/video)
            </div>

            {/* Overlay boxes */}
            {filtered.map(({ id, label, prob, bbox, color }) => {
              const [x, y, w, h] = bbox;
              return (
                <div
                  key={id}
                  className={`absolute ${color} border-2 rounded`}
                  style={{ left: x, top: y, width: w, height: h }}
                  title={`${label} (${(prob * 100).toFixed(1)}%)`}
                >
                  <div className="absolute -top-6 left-0 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {label} • {(prob * 100).toFixed(0)}%
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4">
            <h4 className="font-semibold text-gray-700 mb-2">Legend</h4>
            <div className="flex gap-4 text-sm text-gray-600">
              <span className="inline-flex items-center gap-2">
                <span className="w-3 h-3 border-2 border-orange-500 inline-block rounded-sm" /> Person
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="w-3 h-3 border-2 border-green-500 inline-block rounded-sm" /> Dog
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="w-3 h-3 border-2 border-blue-500 inline-block rounded-sm" /> Bicycle
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
