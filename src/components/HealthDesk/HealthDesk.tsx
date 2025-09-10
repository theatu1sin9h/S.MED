import { useState } from "react";
import MediTrack from "./MediTrack";
import MediGuide from "./MediGuide";

export default function HealthDesk() {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  return (
    <section className="p-10 text-center bg-blue-50 min-h-screen">
      <h1 className="text-4xl font-bold text-blue-700 mb-6">🏥 Health Desk</h1>
      <p className="text-gray-600 mb-8">
        Your one-stop platform for health tracking & guidance
      </p>

      <div className="flex justify-center gap-6">
        <button
          onClick={() => setActiveTab("track")}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700"
        >
          📊 MediTrack
        </button>

        <button
          onClick={() => setActiveTab("guide")}
          className="bg-green-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-green-700"
        >
          📖 MediGuide
        </button>
      </div>

      <div className="mt-10">
        {activeTab === "track" && <MediTrack />}
        {activeTab === "guide" && <MediGuide />}
      </div>
    </section>
  );
}
