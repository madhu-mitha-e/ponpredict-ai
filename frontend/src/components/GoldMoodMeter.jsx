import { motion } from "framer-motion";

export default function GoldMoodMeter({ trend, accuracy }) {
  const score = trend === "up" ? 72 : trend === "down" ? 28 : 50;

  const mood =
    score >= 70 ? { label: "Bullish 🚀", color: "#22c55e", bg: "rgba(34,197,94,0.1)", border: "rgba(34,197,94,0.3)" } :
    score >= 50 ? { label: "Neutral ➡️", color: "#FFD700", bg: "rgba(255,215,0,0.1)", border: "rgba(255,215,0,0.3)" } :
    score >= 30 ? { label: "Bearish 📉", color: "#f97316", bg: "rgba(249,115,22,0.1)", border: "rgba(249,115,22,0.3)" } :
                  { label: "Crash ⚠️",  color: "#ef4444", bg: "rgba(239,68,68,0.1)",  border: "rgba(239,68,68,0.3)"  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="premium-card p-8 text-center h-full"
    >
      <p className="text-yellow-500/60 text-xs tracking-[0.3em] uppercase mb-6 font-medium">Gold Mood Meter</p>

      {/* Score circle */}
      <div className="relative w-32 h-32 mx-auto mb-6">
        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
          <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,215,0,0.1)" strokeWidth="8" />
          <circle cx="60" cy="60" r="50" fill="none" stroke={mood.color} strokeWidth="8"
            strokeDasharray={`${score * 3.14} 314`} strokeLinecap="round"
            style={{ transition: "stroke-dasharray 1s ease" }} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-black" style={{ color: mood.color }}>{score}</span>
        </div>
      </div>

      <div className="inline-block px-5 py-2 rounded-full mb-3 text-lg font-black"
        style={{ background: mood.bg, border: `1px solid ${mood.border}`, color: mood.color }}>
        {mood.label}
      </div>

      <p className="text-gray-600 text-xs">Sentiment score: {score}/100</p>

      {accuracy && (
        <div className="mt-4 text-xs text-gray-500">
          Model accuracy: <span className="text-yellow-400 font-bold">{accuracy}%</span>
        </div>
      )}
    </motion.div>
  );
}