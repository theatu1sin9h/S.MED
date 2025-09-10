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

type HealthData = {
  steps: number;
  calories: number;
  water: number;
  sleep: number;
  heartRate: number;
  mentalHealth: "Stressed" | "Calm" | "Thriving";
};

const COLORS = ["#1D4ED8", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"];

export default function MediTrack(): JSX.Element {
  const today = new Date().toISOString().split("T")[0];

  const [history, setHistory] = useState<Record<string, HealthData>>(() => {
    return JSON.parse(localStorage.getItem("healthHistory") || "{}") || {};
  });

  const [selectedDate, setSelectedDate] = useState(today);
  const [showGraphs, setShowGraphs] = useState(false);

  const defaultData: HealthData = {
    steps: 500,
    calories: 200,
    water: 4,
    sleep: 7,
    heartRate: 70,
    mentalHealth: "Calm",
  };

  const data = history[selectedDate] || defaultData;

  useEffect(() => {
    localStorage.setItem("healthHistory", JSON.stringify(history));
  }, [history]);

  const handleChange = (field: keyof HealthData, value: string) => {
    setHistory({
      ...history,
      [selectedDate]: {
        ...data,
        [field]: field === "mentalHealth" ? value : Number(value),
      },
    });
  };

  // Yesterday date
  const yesterday = new Date(new Date(selectedDate).getTime() - 86400000)
    .toISOString()
    .split("T")[0];
  const yesterdayData = history[yesterday] || defaultData;

  // Convert mental health into a numeric scale for comparison
  const moodScale = { Stressed: 1, Calm: 2, Thriving: 3 };

  // Data for separate bar charts
  const metrics = [
    { key: "steps", label: "Steps", unit: "" },
    { key: "calories", label: "Calories", unit: " kcal" },
    { key: "water", label: "Water", unit: " glasses" },
    { key: "sleep", label: "Sleep", unit: " hrs" },
    { key: "heartRate", label: "Heart Rate", unit: " bpm" },
    { key: "mentalHealth", label: "Mental Health", unit: "" },
  ];

  // Pie chart data
  const todayPieData = [
    { name: "Steps", value: data.steps },
    { name: "Calories", value: data.calories },
    { name: "Water", value: data.water },
    { name: "Sleep", value: data.sleep },
    { name: "Heart Rate", value: data.heartRate },
    { name: "Mental Health", value: moodScale[data.mentalHealth] },
  ];

  const yesterdayPieData = [
    { name: "Steps", value: yesterdayData.steps },
    { name: "Calories", value: yesterdayData.calories },
    { name: "Water", value: yesterdayData.water },
    { name: "Sleep", value: yesterdayData.sleep },
    { name: "Heart Rate", value: yesterdayData.heartRate },
    { name: "Mental Health", value: moodScale[yesterdayData.mentalHealth] },
  ];

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">📊 MediTrack</h2>

      {/* Date Selector */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-1">📅 Select Date</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full border rounded-lg p-2"
        />
      </div>

      {/* Input fields */}
      {metrics.map((m) =>
        m.key === "mentalHealth" ? (
          <div key={m.key} className="mb-4">
            <label className="block text-gray-700 mb-1">Mental Health</label>
            <select
              value={data.mentalHealth}
              onChange={(e) => handleChange("mentalHealth", e.target.value)}
              className="w-full border rounded-lg p-2"
            >
              <option value="Stressed">Stressed</option>
              <option value="Calm">Calm</option>
              <option value="Thriving">Thriving</option>
            </select>
          </div>
        ) : (
          <div key={m.key} className="mb-4">
            <label className="block text-gray-700 mb-1">{m.label}</label>
            <input
              type="number"
              value={data[m.key as keyof HealthData] as number}
              onChange={(e) => handleChange(m.key as keyof HealthData, e.target.value)}
              className="w-full border rounded-lg p-2"
            />
          </div>
        )
      )}

      {/* Show Graphs Button */}
      <button
        onClick={() => setShowGraphs(true)}
        className="mt-4 mb-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        Show My Health Graphs
      </button>

      {/* Graphs Section */}
      {showGraphs && (
        <div className="mt-8 space-y-12">
          {/* 6 Bar Graphs */}
          {metrics.map((m, idx) => {
            const barData = [
              { name: "Yesterday", value: m.key === "mentalHealth" ? moodScale[yesterdayData.mentalHealth] : yesterdayData[m.key as keyof HealthData] },
              { name: "Today", value: m.key === "mentalHealth" ? moodScale[data.mentalHealth] : data[m.key as keyof HealthData] },
            ];

            return (
              <div key={m.key} className="bg-white p-4 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-600">{m.label}</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill={COLORS[idx % COLORS.length]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            );
          })}

          {/* Today Pie Chart */}
          <div className="bg-white p-4 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-green-600">🍏 Today’s Health Summary</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={todayPieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {todayPieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Yesterday Pie Chart */}
          <div className="bg-white p-4 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-red-600">🍎 Yesterday’s Health Summary</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={yesterdayPieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {yesterdayPieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
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
