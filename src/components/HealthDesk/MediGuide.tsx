// src/components/HealthDesk/MediGuide.tsx
import { useState } from "react";

export default function MediGuide() {
  const [popup, setPopup] = useState<string | null>(null);

  const closePopup = () => setPopup(null);

  const btnStyle =
    "bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg shadow";

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-green-600 mb-6">📖 MediGuide</h2>

      {/* Buttons Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <button onClick={() => setPopup("diet")} className={btnStyle}>🍎 Diet Plan</button>
        <button onClick={() => setPopup("thought")} className={btnStyle}>💭 Healthy Thought</button>
        <button onClick={() => setPopup("medicine")} className={btnStyle}>💊 Medicine Rates</button>
        <button onClick={() => setPopup("remedy")} className={btnStyle}>🌿 Remedies</button>
        <button onClick={() => setPopup("yoga")} className={btnStyle}>🧘 Yoga & Meditation</button>
        <button onClick={() => setPopup("articles")} className={btnStyle}>📑 Medical Articles</button>
        <button onClick={() => setPopup("books")} className={btnStyle}>📚 Book Recs</button>
        <button onClick={() => setPopup("contacts")} className={btnStyle}>📞 Emergency Contacts</button>
        <button onClick={() => setPopup("news")} className={btnStyle}>📰 Health News</button>
        <button onClick={() => setPopup("sleep")} className={btnStyle}>😴 Sleep Tips</button>
        <button onClick={() => setPopup("stressedOut")} className={btnStyle}>🌬️ Stress Management</button>
        <button onClick={() => setPopup("checklist")} className={btnStyle}>📆 Monthly Test </button>
      </div>

      {/* Popup */}
      {popup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full text-center shadow-xl">
            <h3 className="text-xl font-bold mb-4">
              {popup === "diet" && "🍎 Daily Diet Plan"}
              {popup === "thought" && "💭 Healthy Thought"}
              {popup === "medicine" && "💊 Common Medicine Rates"}
              {popup === "remedy" && "🌿 Traditional Remedies"}
              {popup === "yoga" && "🧘 Yoga & Meditation"}
              {popup === "articles" && "📑 Medical Articles"}
              {popup === "books" && "📚 Book Recommendations"}
              {popup === "contacts" && "📞 Emergency Contacts"}
              {popup === "news" && "📰 Latest Health News"}
              {popup === "sleep" && "😴 Sleep Improvement Exercises"}
              {popup === "stressedOut" && "😴 Stress Management Tips"}
              {popup === "checkedlist" && "📆 Monthly Test"}
            </h3>

            {/* Popup Content */}
            <div className="text-gray-700 text-left space-y-2">
              {popup === "diet" && (
                <ul className="list-disc pl-6">
                  <li>Breakfast: Oats + Fruits + Milk</li>
                  <li>Lunch: Rice + Dal + Vegetables</li>
                  <li>Snack: Nuts + Green Tea</li>
                  <li>Dinner: Soup + Salad + Whole wheat roti</li>
                </ul>
              )}

              {popup === "thought" && <p>"Your health is your wealth — invest in it daily."</p>}

              {popup === "medicine" && (
                <ul className="list-disc pl-6">
                  <li>Fever → Paracetamol (₹20–₹50)</li>
                  <li>Stomach Ache → Digene (₹30–₹60)</li>
                  <li>Headache → Crocin (₹25–₹45)</li>
                  <li>Cold & Cough → Cetzine (₹15–₹40)</li>
                  <li>Pain Relief → Volini Gel (₹100–₹150)</li>
                </ul>
              )}

              {popup === "remedy" && (
                <ul className="list-disc pl-6">
                  <li>Fever → Tulsi + Ginger Tea</li>
                  <li>Stomach Ache → Ajwain with warm water</li>
                  <li>Cold & Cough → Turmeric milk</li>
                  <li>Headache → Peppermint oil massage</li>
                  <li>Indigestion → Lemon water + Honey</li>
                </ul>
              )}

              {popup === "yoga" && (
                <ul className="list-disc pl-6">
                  <li>Morning → Surya Namaskar (10 rounds)</li>
                  <li>Breathing → Anulom-Vilom (10 min)</li>
                  <li>Stress Relief → Meditation (15 min)</li>
                </ul>
              )}

              {popup === "articles" && (
                <ul className="list-disc pl-6">
                  <li>"The Importance of Gut Health"</li>
                  <li>"How Sleep Affects Mental Wellness"</li>
                  <li>"Yoga as Preventive Medicine"</li>
                </ul>
              )}

              {popup === "books" && (
                <ul className="list-disc pl-6">
                  <li>“The Power of Habit” – Charles Duhigg</li>
                  <li>“How Not to Die” – Michael Greger</li>
                  <li>“Ikigai” – Hector Garcia</li>
                </ul>
              )}

              {popup === "contacts" && (
                <ul className="list-disc pl-6">
                  <li>🚑 Ambulance – 108</li>
                  <li>🔥 Fire – 101</li>
                  <li>👮 Police – 100</li>
                  <li>🏥 Nearest Hospital: +91-9876543210</li>
                </ul>
              )}

              {popup === "news" && (
                <ul className="list-disc pl-6">
                  <li>New vaccine research in progress...</li>
                  <li>WHO announces new mental health guidelines</li>
                  <li>AI in healthcare gaining rapid adoption</li>
                </ul>
              )}

              {popup === "sleep" && (
                <ul className="list-disc pl-6">
                  <li>Maintain consistent sleep schedule</li>
                  <li>Avoid caffeine before bed</li>
                  <li>Practice deep breathing before sleep</li>
                </ul>
              )}
               {popup === "stressedOut" && (
                <ul className="list-disc pl-6">
                  <li>Deep breathing exercise</li>
                  <li>Progressive muscle relaxation</li>
                  <li>Balanced diet</li>
                  <li>Hobbies and relaxation activities</li>
                  <li>Stay hydrated</li>
                </ul>
              )}
              {popup === "checklist" && (
                <ul className="list-disc pl-6">
                  <li>Blood Pressure (BP) check – to monitor heart health</li>
                  <li>Blood Sugar (Fasting/Random) – especially for people at risk of diabetes</li>
                  <li>Weight & BMI – to track healthy body balance</li>
                  <li>Cholesterol (if at risk) – not always monthly, but important for some</li>
                  <li>General Wellness Check – energy levels, sleep quality, mood</li>
                </ul>
              )}
            </div>

            {/* ✅ Button moved OUTSIDE content */}
            <button
              onClick={closePopup}
              className="mt-6 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
