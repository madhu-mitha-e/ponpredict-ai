import { useEffect, useRef } from "react";
import Navbar          from "./components/Navbar";
import HeroSection     from "./components/HeroSection";
import ChartSection    from "./components/ChartSection";
import PredictionPanel from "./components/PredictionPanel";
import GoldMoodMeter   from "./components/GoldMoodMeter";
import AIInsights      from "./components/AIInsights";
import PriceAlert      from "./components/PriceAlert";
import CoinAnimation   from "./components/CoinAnimation";
import { useGoldPrice } from "./hooks/useGoldPrice";

export default function App() {
  const { livePrice, historical, predictions, accuracy, trend, loading, loadHistorical } = useGoldPrice();
  const prevTrend = useRef(null);
  const showCoins = trend !== "neutral" && trend !== prevTrend.current;
  useEffect(() => { prevTrend.current = trend; }, [trend]);

  return (
    <div className="min-h-screen text-white" style={{ background: "#000000" }}>
      <Navbar />
      <CoinAnimation trigger={showCoins} direction={trend} />

      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-7xl mb-6 animate-float">🪙</div>
            <p className="gold-shimmer text-2xl font-black mb-2">PonPredict AI</p>
            <p className="text-gray-600 text-sm">Loading live gold data...</p>
          </div>
        </div>
      ) : (
        <>
          <HeroSection livePrice={livePrice} trend={trend} />

          <div className="max-w-7xl mx-auto">
            <ChartSection historical={historical} predictions={predictions} loadHistorical={loadHistorical} />

            <div className="px-4 md:px-10 py-4 grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <PredictionPanel predictions={predictions} accuracy={accuracy} />
              </div>
              <GoldMoodMeter trend={trend} accuracy={accuracy} />
            </div>

            <AIInsights trend={trend} predictions={predictions} />

            <div className="px-4 md:px-10 pb-20">
              <PriceAlert livePrice={livePrice} />
            </div>
          </div>

          <footer className="text-center py-10 text-gray-700 text-xs tracking-widest uppercase"
            style={{ borderTop: "1px solid rgba(255,215,0,0.06)" }}>
            🪙 PonPredict AI — LSTM Neural Network · Made with ❤️ in India
          </footer>
        </>
      )}
    </div>
  );
}
