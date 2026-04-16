import { motion } from "framer-motion";

export default function PredictionPanel({ predictions, accuracy }) {
  const tomorrow = predictions?.[0];
  const week     = predictions?.slice(0, 7) || [];

  const getTrend = (i) => {
    if (i === 0 || !predictions?.[i-1]) return null;
    return predictions[i].price_per_gram > predictions[i-1].price_per_gram ? "up" : "down";
  };

  return (
    <section id="predict" className="px-4 md:px-10 py-8">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h2 className="text-2xl font-black gold-shimmer mb-8">🔮 AI Predictions</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Tomorrow card */}
          <div className="premium-card p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-5" style={{ background: "radial-gradient(circle at top, #FFD700, transparent)" }} />
            <p className="text-yellow-500/60 text-xs tracking-[0.3em] uppercase mb-4 font-medium">Tomorrow's Prediction</p>
            <div className="text-6xl font-black text-yellow-400 mb-2 gold-glow">
              ₹{tomorrow?.price_per_gram?.toLocaleString("en-IN") || "—"}
            </div>
            <p className="text-gray-500 text-sm mb-6">
              ₹{tomorrow?.price_per_10g?.toLocaleString("en-IN")} per 10g
            </p>
            {accuracy && (
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full"
                style={{ background: "rgba(0,255,100,0.1)", border: "1px solid rgba(0,255,100,0.3)" }}>
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 text-sm font-bold">{accuracy}% Confidence</span>
              </div>
            )}
          </div>

          {/* 7 day card */}
          <div className="premium-card p-6">
            <p className="text-yellow-500/60 text-xs tracking-[0.3em] uppercase mb-5 font-medium">Next 7 Days</p>
            <div className="space-y-3">
              {week.map((p, i) => {
                const t = getTrend(i);
                return (
                  <div key={i} className="flex justify-between items-center py-2"
                    style={{ borderBottom: "1px solid rgba(255,215,0,0.06)" }}>
                    <span className="text-gray-400 text-sm">
                      {new Date(p.date).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}
                    </span>
                    <div className="flex items-center gap-2">
                      {t && <span className={t === "up" ? "text-green-400 text-xs" : "text-red-400 text-xs"}>{t === "up" ? "▲" : "▼"}</span>}
                      <span className="text-yellow-400 font-bold text-sm">
                        ₹{p.price_per_gram?.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}