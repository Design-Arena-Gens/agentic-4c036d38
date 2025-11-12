"use client";

import { useAgent } from "./AgentProvider";
import { generateId } from "@/lib/id";

const impactColors: Record<string, string> = {
  high: "bg-emerald-100 text-emerald-700",
  medium: "bg-amber-100 text-amber-700",
  low: "bg-slate-100 text-slate-500"
};

export function InsightPanel() {
  const { insights, addInsight, appendLog } = useAgent();

  const handleInject = () => {
    const now = new Date();
    const insight = {
      id: generateId("insight"),
      headline: "SEO rankings spiked after SU initiative",
      impact: "high" as const,
      category: "sales" as const,
      summary:
        "Search universe uplift: targeted site updates propelled 6 key terms to top-3 positions, unlocking +18% organic traffic.",
      action: "Double down on content syndication for Aeon-branded keywords and deploy structured data markup."
    };
    addInsight(insight);
    appendLog({
      id: generateId("log"),
      actor: "Aeon Agent",
      icon: "🔍",
      status: "info",
      summary: `New growth insight generated (${now.toLocaleTimeString()})`,
      timestamp: now.toISOString()
    });
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Intelligence briefings</h2>
          <p className="text-sm text-slate-500">
            Agent synthesized insights merging sales, content, ads, and Aeon Money telemetry.
          </p>
        </div>
        <button
          onClick={handleInject}
          className="rounded-xl border border-brand-200 bg-brand-50 px-3 py-2 text-xs font-medium text-brand-700 hover:bg-brand-100"
        >
          Generate fresh insight
        </button>
      </div>
      <div className="mt-4 space-y-4">
        {insights.map((insight) => (
          <div key={insight.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-800">{insight.headline}</span>
              <span className={`rounded-full px-2 py-0.5 text-xs ${impactColors[insight.impact]}`}>
                {insight.impact} impact
              </span>
            </div>
            <p className="mt-2 text-xs uppercase text-slate-400">{insight.category}</p>
            <p className="mt-2 text-sm text-slate-600">{insight.summary}</p>
            <p className="mt-3 text-sm font-medium text-slate-800">Next move: {insight.action}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
