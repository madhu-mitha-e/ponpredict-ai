import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PriceAlert({ livePrice }) {
  const [targetPrice, setTargetPrice] = useState("");
  const [alertSet,    setAlertSet]    = useState(false);
  const [triggered,   setTriggered]   = useState(false);

  useEffect(() => {
    if (!alertSet || !livePrice || !targetPrice) return;
    if (livePrice.price_per_gram >= parseInt(targetPrice)) setTriggered(true);
  }, [livePrice, alertSet, targetPrice]);

  return (
    <div className="premium-card p-6 mt-6">
      <p className="text-yellow-500/60 text-xs tracking-widest uppercase mb-5 font-medium">🔔 Price Alert</p>
      <div className="flex gap-3">
        <input
          type="number"
          value={targetPrice}
          onChange={e => setTargetPrice(e.target.value)}
          placeholder="Alert me when ₹/gram crosses..."
          className="flex-1 px-4 py-3 text-white text-sm rounded-xl outline-none"
          style={{ background: "rgba(255,215,0,0.05)", border: "1px solid rgba(255,215,0,0.15)" }}
        />
        <button
          onClick={() => { setAlertSet(true); setTriggered(false); }}
          className="px-6 py-3 font-black rounded-xl text-sm transition-all hover:scale-105"
          style={{ background: "#FFD700", color: "#000" }}
        >
          Set Alert
        </button>
      </div>
      <AnimatePresence>
        {triggered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="mt-4 p-4 rounded-xl font-bold"
            style={{ background: "rgba(0,255,100,0.1)", border: "1px solid rgba(0,255,100,0.3)", color: "#22c55e" }}
          >
            🎯 Alert triggered! Gold reached ₹{livePrice?.price_per_gram?.toLocaleString("en-IN")}/gram
          </motion.div>
        )}
        {alertSet && !triggered && (
          <p className="mt-3 text-gray-600 text-xs">
            ✅ Alert set for ₹{parseInt(targetPrice).toLocaleString("en-IN")}/gram
          </p>
        )}
      </AnimatePresence>
    </div>
  );
}