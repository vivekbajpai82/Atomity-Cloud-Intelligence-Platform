import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";
import { useRef } from "react";
import { tokens } from "../tokens/tokens";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 18 },
  },
};

const trendColor = (trend) =>
  trend === "up" ? tokens.colors.accentSuccess : tokens.colors.accentError;

export default function MetricCard({
  title, value, unit, prefix, trend, change, description,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  // Progress bar width — derive from value (cap at 100)
  const progressWidth = Math.min(value, 100);

  return (
    <motion.article
      ref={ref}
      variants={cardVariants}
      whileHover={{
        scale: 1.05,
        y: -6,
        boxShadow: "0 0 30px rgba(59,130,246,0.3)",
      }}
      style={{
        background: tokens.colors.cardBg,
        border: `1px solid ${tokens.colors.cardBorder}`,
        borderRadius: tokens.radius.md,
        padding: "28px 24px",
        cursor: "pointer",
        boxShadow: tokens.shadow.card,
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        transition: `box-shadow 0.3s ease`,
        containerType: "inline-size",
      }}
    >
      {/* Title + Badge */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{
          fontSize: "12px",
          fontWeight: 600,
          color: tokens.colors.textSecondary,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        }}>
          {title}
        </span>
        <span style={{
          fontSize: "12px",
          fontWeight: 700,
          color: trendColor(trend),
          background: `color-mix(in srgb, ${trendColor(trend)} 12%, transparent)`,
          padding: "3px 8px",
          borderRadius: tokens.radius.sm,
        }}>
          {change}
        </span>
      </div>

      {/* Value */}
      <div style={{
        fontSize: "clamp(28px, 5cqi, 40px)",
        fontWeight: 800,
        color: tokens.colors.textPrimary,
        lineHeight: 1,
      }}>
        {prefix}
        {isInView ? (
          <CountUp end={value} duration={2} separator="," />
        ) : "0"}
        <span style={{
          fontSize: "clamp(14px, 2cqi, 18px)",
          color: tokens.colors.accentPrimary,
          marginInlineStart: "4px",
        }}>
          {unit}
        </span>
      </div>

      {/* Description */}
      <p style={{
        fontSize: "13px",
        color: tokens.colors.textSecondary,
        lineHeight: 1.5,
      }}>
        {description}
      </p>

      {/* Animated Progress Bar */}
      <div style={{
        height: "4px",
        borderRadius: "99px",
        background: tokens.colors.cardBorder,
        overflow: "hidden",
        marginBlockStart: "4px",
      }}>
        <motion.div
          initial={{ width: "0%" }}
          animate={isInView ? { width: `${progressWidth}%` } : { width: "0%" }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          style={{
            height: "100%",
            borderRadius: "99px",
            background: `linear-gradient(90deg, ${tokens.colors.accentPrimary}, ${tokens.colors.accentSuccess})`,
          }}
        />
      </div>
    </motion.article>
  );
}