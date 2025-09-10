// src/components/HealthDesk/MediTrack.tsx
import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Define types
type HealthData = {
  steps: number;
  calories: number;
  water: number;
  sleep: number;
  heartRate: number;
  stress?: number;
  wellness?: number;
  mood?: number;
};

// Colors for Pie charts
const COLORS = ["#1D4ED8", "#10B981", "#F59E0B", "#EF4444"];

export default function MediTrack(): JSX.Element {
  const [data, setData] = useState<HealthData>(() => {
    return (
      JSON.parse(localStorage.getItem("healthData") || "null") || {
        steps: 500,
        calories: 200,
        water: 4,
        sleep: 7,
        heartRate: 70,
        stress: 3,
        wellness: 4,
        mood: 4,
      }
    );
  });

  const [showGraph, setShowGraph] = useState(false);

  // Save automatically
  useEffect(() => {
    localStorage.setItem("healthData", JSON.stringify(data));
  }, [data]);

  const handleChange = (field: keyof HealthData, value: string) => {
    setData({ ...data, [field]: Number(value) });
  };

  // Prepare data for charts
  const barChartData = [
    { name: "Steps", value: data.steps },
    { name: "Calories", value: data.calories },
    { name: "Heart Rate", value: data.heartRate },
  ];

  const pieData = [
    { name: "Water (glasses)", value: data.water },
    { name: "Sleep (hrs)", value: data.sleep },
  ];

  const mentalData = [
    { name: "Stress", value: data.stress || 0 },
    { name: "Wellness", value: data.wellness || 0 },
    { name: "Mood", value: data.mood || 0 },
  ];

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">📊 MediTrack</h2>

      {/* Input fields */}
      {Object.keys(data)
        .filter((key) => key !== "stress" && key !== "wellness" && key !== "mood")
        .map((field) => (
          <div key={field} className="mb-4">
            <label className="block text-gray-700 capitalize mb-1">{field}</label>
            <input
              type="number"
              value={data[field as keyof HealthData]}
              onChange={(e) => handleChange(field as keyof HealthData, e.target.value)}
              className="w-full border rounded-lg p-2"
            />
          </div>
        ))}

      <button
        onClick={() => setShowGraph(true)}
        className="mt-4 mb-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        View Your MediTrack
      </button>

      {/* Show current values */}
      <div className="mt-4 text-left">
        <p>🚶 Steps: <b>{data.steps}</b></p>
        <p>🔥 Calories: <b>{data.calories}</b></p>
        <p>❤️ Heart Rate: <b>{data.heartRate}</b> bpm</p>
        <p>💧 Water: <b>{data.water}</b> glasses</p>
        <p>😴 Sleep: <b>{data.sleep}</b> hrs</p>
      </div>

      {/* Charts */}
      {showGraph && (
        <div className="mt-8 space-y-8">
          {/* Bar Chart */}
          <div className="bg-white p-4 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-blue-600">📊 Health Overview</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#1D4ED8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart for Water & Sleep */}
          <div className="bg-white p-4 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-green-600">💧 Water & Sleep</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart for Mental Health */}
          <div className="bg-white p-4 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-purple-600">🧠 Mental Health</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mentalData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {mentalData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}

