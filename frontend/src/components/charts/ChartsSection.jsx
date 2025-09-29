import React from "react";
import {
  ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar
} from "recharts";

const lineData = [
  { name: "T1", score: 12 },
  { name: "T2", score: 18 },
  { name: "T3", score: 9 },
  { name: "T4", score: 22 },
  { name: "T5", score: 17 },
];

const barData = [
  { label: "Person", count: 32 },
  { label: "Dog", count: 14 },
  { label: "Bicycle", count: 8 },
  { label: "Car", count: 12 },
];

// PUBLIC_INTERFACE
export default function ChartsSection() {
  /** ChartsSection
   * Visualizes placeholder metadata using Recharts. Replace with real data
   * from backend/DB in future integration.
   */
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header">Detection Score Over Time</div>
          <div className="card-body h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="score" stroke="#F97316" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="card-header">Object Frequency</div>
          <div className="card-body h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#10B981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
