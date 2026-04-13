import { useEffect, useState } from "react";

export default function CoinAnimation({ trigger, direction }) {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    if (!trigger) return;
    const newCoins = Array.from({ length: 15 }, (_, i) => ({
      id:    Date.now() + i,
      left:  Math.random() * 100,
      delay: Math.random() * 2,
      size:  Math.random() * 24 + 16,
      emoji: direction === "down" ? "💸" : ["🪙","💰","✨"][Math.floor(Math.random()*3)]
    }));
    setCoins(newCoins);
    setTimeout(() => setCoins([]), 4000);
  }, [trigger]);

  if (!coins.length) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {coins.map(c => (
        <span
          key={c.id}
          className="absolute animate-coinfall"
          style={{
            left:            `${c.left}%`,
            fontSize:        `${c.size}px`,
            animationDelay:  `${c.delay}s`,
            filter:          direction === "down" ? "grayscale(1) opacity(0.6)" : "none"
          }}
        >
          {c.emoji}
        </span>
      ))}
    </div>
  );
}