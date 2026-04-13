import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function AnimatedNumber({ value }) {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!value) return;
    const start  = display || value - 200;
    const diff   = value - start;
    const steps  = 50;
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplay(Math.round(start + (diff * i) / steps));
      if (i >= steps) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [value]);

  return <span>{display?.toLocaleString("en-IN")}</span>;
}

export default function HeroSection({ livePrice, trend }) {
  const isUp   = trend === "up";
  const isDown = trend === "down";

  return (
    <section id="live" className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20 overflow-hidden">

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #FFD700 0%, transparent 70%)" }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 w-full max-w-3xl"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-yellow-500/60 text-xs tracking-[0.4em] uppercase mb-6 font-medium"
        >
          ✦ Real-Time Market Data ✦
        </motion.p>

        <h1 className="text-6xl md:text-8xl font-black gold-shimmer mb-2 leading-none">
          24K GOLD
        </h1>
        <p className="text-gray-500 text-base mb-12 tracking-widest uppercase text-xs">
          AI-Powered Price Prediction System
        </p>

        {livePrice ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="premium-card p-10 mx-auto animate-pulse-gold"
          >
            {/* Main price */}
            <div className="flex items-start justify-center gap-3 mb-2">
              <span className="text-yellow-600 text-3xl font-light mt-4">₹</span>
              <span className="text-7xl md:text-9xl font-black text-yellow-400 gold-glow leading-none">
                <AnimatedNumber value={livePrice.price_per_gram} />
              </span>
              <span className="text-gray-500 text-lg mt-6">/gram</span>
            </div>

            {/* 10g price */}
            <div className="text-2xl font-bold mb-6" style={{ color: "#B8860B" }}>
              ₹{livePrice.price_per_10g?.toLocaleString("en-IN")} per 10 grams
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-4 justify-center mb-6">
              <div className="px-4 py-2 rounded-xl text-sm" style={{ background: "rgba(255,215,0,0.08)", border: "1px solid rgba(255,215,0,0.15)" }}>
                <span className="text-gray-400">USD </span>
                <span className="text-white font-bold">${livePrice.usd_price?.toFixed(2)}/oz</span>
              </div>
              <div className="px-4 py-2 rounded-xl text-sm" style={{ background: "rgba(255,215,0,0.08)", border: "1px solid rgba(255,215,0,0.15)" }}>
                <span className="text-gray-400">₹/$ </span>
                <span className="text-white font-bold">{livePrice.usd_inr_rate?.toFixed(2)}</span>
              </div>
              <div className={`px-4 py-2 rounded-xl text-sm font-bold ${isUp ? "text-green-400" : isDown ? "text-red-400" : "text-yellow-400"}`}
                style={{ background: isUp ? "rgba(0,255,0,0.08)" : isDown ? "rgba(255,0,0,0.08)" : "rgba(255,215,0,0.08)", border: `1px solid ${isUp ? "rgba(0,255,0,0.2)" : isDown ? "rgba(255,0,0,0.2)" : "rgba(255,215,0,0.2)"}` }}>
                {isUp ? "▲ Rising" : isDown ? "▼ Falling" : "— Stable"}
              </div>
            </div>

            {/* Live indicator */}
            <div className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-xs font-bold tracking-widest">LIVE</span>
              <span className="text-gray-600 text-xs ml-2">
                {new Date(livePrice.timestamp).toLocaleTimeString("en-IN")}
              </span>
            </div>
          </motion.div>
        ) : (
          <div className="premium-card p-10 animate-pulse">
            <div className="h-24 w-72 rounded-xl mx-auto mb-4" style={{ background: "rgba(255,215,0,0.1)" }} />
            <div className="h-8 w-48 rounded mx-auto" style={{ background: "rgba(255,215,0,0.05)" }} />
          </div>
        )}
      </motion.div>
    </section>
  );
}