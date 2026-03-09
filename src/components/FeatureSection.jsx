import { motion } from "framer-motion";
import MetricCard from "./MetricCard";
import { useApiData } from "../hooks/useApiData";
import { tokens } from "../tokens/tokens";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const SkeletonCard = () => (
  <div
    style={{
      background: tokens.colors.cardBg,
      borderRadius: tokens.radius.md,
      height: "180px",
      animation: "pulse 1.5s ease-in-out infinite",
    }}
  />
);

export default function FeatureSection() {
  const { data, isLoading, error } = useApiData();

  return (
    <motion.section
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        padding: "clamp(60px, 10vw, 140px) clamp(16px, 5vw, 80px)",
        background: "radial-gradient(circle at top, #0f172a, #020617)",
        minBlockSize: "100vh",
      }}
    >
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{ textAlign: "center", marginBlockEnd: "clamp(40px, 6vw, 80px)" }}
      >
        <p
          style={{
            fontSize: "12px",
            fontWeight: 700,
            color: tokens.colors.accentPrimary,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            marginBlockEnd: "12px",
          }}
        >
          Real-time Intelligence
        </p>
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          style={{
            fontSize: "clamp(26px, 4vw, 48px)",
            fontWeight: 800,
            color: tokens.colors.textPrimary,
            lineHeight: 1.2,
            maxInlineSize: "600px",
            marginInline: "auto",
          }}
        >
          Cloud Optimization at a Glance
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontSize: "clamp(14px, 1.5vw, 17px)",
            color: tokens.colors.textSecondary,
            marginBlockStart: "16px",
            maxInlineSize: "500px",
            marginInline: "auto",
            lineHeight: 1.7,
          }}
        >
          Live metrics across your infrastructure — updated automatically, cached intelligently.
        </motion.p>
      </motion.div>

      {error && (
        <p style={{ textAlign: "center", color: tokens.colors.accentError }}>
          Failed to load metrics. Please try again.
        </p>
      )}

      {/* Grid */}
      <motion.div
        key={data ? "loaded" : "loading"}
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "clamp(14px, 2vw, 24px)",
          maxInlineSize: "1100px",
          marginInline: "auto",
        }}
      >
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : data?.map((item) => (
              <MetricCard
                key={item.id}
                title={item.title}
                value={item.value}
                unit={item.unit}
                prefix={item.prefix}
                trend={item.trend}
                change={item.change}
                description={item.description}
              />
            ))}
      </motion.div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </motion.section>
  );
}