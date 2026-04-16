import { motion } from "framer-motion";

const FESTIVALS = [
  { name: "Akshaya Tritiya", date: "May 10", tip: "Auspicious day — demand spikes 🌟" },
  { name: "Dhanteras",       date: "Oct 18", tip: "Traditional buying day 💛" },
  { name: "Diwali",          date: "Oct 20", tip: "Prices rise near festival 🪔" },
];

export default function AIInsights({ trend, predictions }) {
  const isUp = trend === "up";

  const buySignal = !isUp
    ? { text: "Good time to buy! Prices dipping.", color: "#22c55e", bg: "rgba(34,197,94,0.1)", border: "rgba(34,197,94,0.2)", icon: "✅" }
    : { text: "Consider waiting — prices rising.", color: "#f97316", bg: "rgba(249,115,22,0.1)", border: "rgba(249,115,22,0.2)", icon: "⏳" };

  const weekTrend = predictions?.length >= 2
    ? predictions[6]?.price_per_gram > predictions[0]?.price_per_gram
      ? "📈 Bullish — upward trend next week"
      : "📉 Bearish — prices may cool down"
    : "🔄 Analysing market trend...";

  return (
    <section id="insights" className="px-4 md:px-10 py-8">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h2 className="text-2xl font-black gold-shimmer mb-8">🧠 AI Insights</h2>

        <div className="grid md:grid-cols-3 gap-6">

          {/* Buy signal */}
          <div className="premium-card p-6">
            <p className="text-yellow-500/60 text-xs tracking-widest uppercase mb-4 font-medium">Buy Signal</p>
            <div className="p-4 rounded-xl mb-3"
              style={{ background: buySignal.bg, border: `1px solid ${buySignal.border}` }}>
              <p className="font-bold" style={{ color: buySignal.color }}>
                {buySignal.icon} {buySignal.text}
              </p>
            </div>
            <p className="text-gray-600 text-xs">Based on current market trend</p>
          </div>

          {/* 7 day outlook */}
          <div className="premium-card p-6">
            <p className="text-yellow-500/60 text-xs tracking-widest uppercase mb-4 font-medium">7-Day Outlook</p>
            <div className="p-4 rounded-xl" style={{ background: "rgba(255,215,0,0.05)", border: "1px solid rgba(255,215,0,0.1)" }}>
              <p className="text-white font-bold">{weekTrend}</p>
            </div>
            <p className="text-gray-600 text-xs mt-3">LSTM model prediction</p>
          </div>

          {/* Festival */}
          <div className="premium-card p-6">
            <p className="text-yellow-500/60 text-xs tracking-widest uppercase mb-4 font-medium">Festival Insights</p>
            <div className="space-y-3">
              {FESTIVALS.map(f => (
                <div key={f.name} className="p-3 rounded-xl" style={{ background: "rgba(255,215,0,0.04)", border: "1px solid rgba(255,215,0,0.08)" }}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-yellow-400 font-bold text-sm">{f.name}</span>
                    <span className="text-gray-500 text-xs">{f.date}</span>
                  </div>
                  <p className="text-gray-400 text-xs">{f.tip}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}