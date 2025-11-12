"use client";

import { motion } from "framer-motion";

const metricCards = [
  {
    label: "GMV orchestrated",
    value: "$248k",
    delta: "+32% vs last week",
    tone: "text-emerald-500",
    glow: "from-emerald-100/70 to-transparent",
    description: "Agent-led merchandising boosts cart completion and upsell sequencing."
  },
  {
    label: "Platform coverage",
    value: "12 channels",
    delta: "All synced",
    tone: "text-brand-600",
    glow: "from-brand-100/70 to-transparent",
    description: "Storefront, social, ads, loyalty, and retail ops streams are in sync."
  },
  {
    label: "Aeon Money",
    value: "480k pts",
    delta: "+11% accrual",
    tone: "text-purple-500",
    glow: "from-purple-100/70 to-transparent",
    description: "Agent automations triggered 5x more loyalty redemptions across campaigns."
  }
];

export function MetricPulse() {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {metricCards.map((card) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${card.glow}`} aria-hidden />
          <div className="relative space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              {card.label}
            </p>
            <p className={`text-3xl font-semibold ${card.tone}`}>{card.value}</p>
            <p className="text-xs font-medium text-slate-500">{card.delta}</p>
            <p className="text-sm text-slate-600">{card.description}</p>
          </div>
        </motion.div>
      ))}
    </section>
  );
}
