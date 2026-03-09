import { tokens } from "../tokens/tokens";

export default function Navbar() {
  return (
    <nav style={{
      position: "fixed",
      top: 0,
      inlineSize: "100%",
      zIndex: 100,
      padding: "16px clamp(16px, 5vw, 80px)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: "rgba(10, 14, 26, 0.8)",
      backdropFilter: "blur(12px)",
      borderBlockEnd: `1px solid ${tokens.colors.cardBorder}`,
    }}>
      <span style={{
        fontWeight: 800,
        fontSize: "20px",
        color: tokens.colors.textPrimary,
        letterSpacing: "-0.02em",
      }}>
        ⬡ Atomity
      </span>
      <span style={{
        fontSize: "13px",
        color: tokens.colors.textSecondary,
      }}>
        Cloud Intelligence Platform
      </span>
    </nav>
  );
}