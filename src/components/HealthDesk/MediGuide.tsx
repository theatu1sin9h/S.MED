// src/components/HealthDesk/MediGuide.tsx
import { useState } from "react";

export default function MediGuide() {
  const [popup, setPopup] = useState<string | null>(null);

  const closePopup = () => setPopup(null);

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-green-600 mb-4">📖 MediGuide</h2>

      <div className="grid grid-cols-2 gap-4">
        <button onClick={() => setPopup("diet")} className="btn">🍎 Diet Plan</button>
        <button onClick={() => setPopup("thought")} className="btn">💭 Healthy Thought</button>
        <button onClick={() => setPopup("medicine")} className="btn">💊 Medicine Rates</button>
        <button onClick={() => setPopup("remedy")} className="btn">🌿 Remedies</button>
      </div>

      {popup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl p-6 max-w-md text-center">
            <h3 className="text-xl font-bold mb-4">
              {popup === "diet" && "🍎 Daily Diet Plan"}
              {popup === "thought" && "💭 Healthy Thought"}
              {popup === "medicine" && "💊 Common Medicine Rates"}
              {popup === "remedy" && "🌿 Traditional Remedies"}
            </h3>

            <div className="text-gray-700">
              {popup === "diet" && (
                <p>Breakfast: Oats + Fruits<br/>Lunch: Rice + Dal<br/>Dinner: Soup + Salad</p>
              )}
              {popup === "thought" && (
                <p>"Your health is your wealth — invest in it daily."</p>
              )}
              {popup === "medicine" && (
                <p>Fever → Paracetamol (₹20–₹50)<br/>Stomach Ache → Digene (₹30–₹60)</p>
              )}
              {popup === "remedy" && (
                <p>Fever → Tulsi + Ginger Tea<br/>Stomach Ache → Ajwain with warm water</p>
              )}
            </div>

            <button 
              onClick={closePopup}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
