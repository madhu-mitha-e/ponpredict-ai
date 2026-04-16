import { motion } from "framer-motion";

const navLinkStyle = {
  color: "#888",
  fontSize: "14px",
  fontWeight: 500,
  textDecoration: "none",
  transition: "color 0.3s"
};

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 50,
        padding: "16px 24px",
        background: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,215,0,0.1)"
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "28px" }}>🪙</span>
          <span className="gold-shimmer" style={{ fontSize: "20px", fontWeight: 900 }}>PonPredict AI</span>
        </div>

        <div style={{ display: "flex", gap: "32px" }}>
          {["Live", "Chart", "Predict", "Insights"].map(item => (
            <a key={item} href={"#" + item.toLowerCase()} style={navLinkStyle}
              onMouseEnter={e => { e.target.style.color = "#FFD700"; }}
              onMouseLeave={e => { e.target.style.color = "#888"; }}
            >
              {item}
            </a>
          ))}
        </div>

        <div style={{
          display: "flex", alignItems: "center", gap: "8px",
          padding: "6px 14px", borderRadius: "999px",
          background: "rgba(255,215,0,0.08)",
          border: "1px solid rgba(255,215,0,0.2)"
        }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
          <span style={{ color: "#4ade80", fontSize: "11px", fontWeight: 700 }}>LIVE</span>
        </div>

      </div>
    </motion.nav>
  );
}