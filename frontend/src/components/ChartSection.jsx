import { useState } from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer, ComposedChart, Line, Area,
  XAxis, YAxis, Tooltip, CartesianGrid, Legend
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "rgba(0,0,0,0.9)", border: "1px solid rgba(255,215,0,0.3)", borderRadius: "12px", padding: "12px 16px" }}>
      <p style={{ color: "#FFD700", fontWeight: "bold", marginBottom: "6px" }}>{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color: p.color, fontSize: "13px" }}>
          {p.name}: ₹{p.value?.toLocaleString("en-IN")}
        </p>
      ))}
    </div>
  );
};

export default function ChartSection({ historical, predictions, loadHistorical }) {
  const [filter, setFilter] = useState("1M");

  const handleFilter = (f) => {
    setFilter(f);
    loadHistorical(f === "1D" ? 1 : f === "7D" ? 7 : 30);
  };

  const histData = (historical || []).map(h => ({
    date:   new Date(h.date).toLocaleDateString("en-IN", { month: "short", day: "numeric" }),
    actual: h.price_per_gram,
  }));

  const predData = (predictions || []).map(p => ({
    date:      new Date(p.date).toLocaleDateString("en-IN", { month: "short", day: "numeric" }),
    predicted: p.price_per_gram,
  }));

  const combined = [...histData, ...predData];

  return (
    <section id="chart" className="px-4 md:px-10 py-16">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-black gold-shimmer">📈 Price Chart</h2>
          <div className="flex gap-2">
            {["1D", "7D", "1M"].map(f => (
              <button
                key={f}
                onClick={() => handleFilter(f)}
                className="px-5 py-2 rounded-full text-sm font-bold transition-all duration-300"
                style={filter === f
                  ? { background: "#FFD700", color: "#000" }
                  : { background: "rgba(255,215,0,0.08)", color: "#FFD700", border: "1px solid rgba(255,215,0,0.2)" }
                }
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="premium-card p-6">
          {combined.length === 0 ? (
            <div className="flex items-center justify-center h-64 text-gray-500">
              <div className="text-center">
                <div className="text-4xl mb-3">📊</div>
                <p>Price data will appear as backend collects it</p>
                <p className="text-xs mt-2 text-gray-600">Predictions are shown in green</p>
              </div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={380}>
              <ComposedChart data={combined}>
                <defs>
                  <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#FFD700" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#FFD700" stopOpacity={0}   />
                  </linearGradient>
                  <linearGradient id="predGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#00ff88" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00ff88" stopOpacity={0}   />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,215,0,0.06)" />
                <XAxis dataKey="date" tick={{ fill: "#555", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#555", fontSize: 11 }} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ paddingTop: "20px", color: "#888" }} />
                <Area dataKey="actual"    name="Actual Price"    fill="url(#goldGrad)" stroke="#FFD700" strokeWidth={2.5} dot={false} />
                <Area dataKey="predicted" name="Predicted Price" fill="url(#predGrad)" stroke="#00ff88" strokeWidth={2} dot={{ r: 4, fill: "#00ff88" }} strokeDasharray="6 3" />
              </ComposedChart>
            </ResponsiveContainer>
          )}
        </div>
      </motion.div>
    </section>
  );
}