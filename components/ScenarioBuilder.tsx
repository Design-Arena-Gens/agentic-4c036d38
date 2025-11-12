"use client";

import { useState } from "react";
import { generateId } from "@/lib/id";
import { useAgent } from "./AgentProvider";

const scenarios = [
  {
    id: "scenario-1",
    title: "Flash sale mobilization",
    description:
      "Upload product shots, agent spins micro-site, triggers push notifications, deploys Meta retargeting, and manages Aeon Money boosters.",
    timeline: ["Generate landing page", "Deploy cross-channel creative", "Launch ads", "Track Aeon Money impact"]
  },
  {
    id: "scenario-2",
    title: "Influencer drop",
    description:
      "Provide influencer video, agent edits for reels + TikTok, coordinates merchandising, tracks performance, and re-targets engaged viewers.",
    timeline: ["Edit + caption", "Schedule publish", "Activate loyalty drip", "Report conversions"]
  },
  {
    id: "scenario-3",
    title: "Search universe takeover",
    description:
      "Agent pushes SU enhancements: structured data, backlink outreach, blog post generation, and Google Ads synergy.",
    timeline: ["Audit surfaces", "Generate content", "Deploy schema", "Monitor rankings"]
  }
];

export function ScenarioBuilder() {
  const { appendLog } = useAgent();
  const [selected, setSelected] = useState<string | null>(null);

  const handleRun = (scenarioId: string) => {
    setSelected(scenarioId);
    const scenario = scenarios.find((item) => item.id === scenarioId);
    if (!scenario) return;
    appendLog({
      id: generateId("log"),
      actor: "Aeon Agent",
      icon: "⚡",
      status: "info",
      summary: `Scenario initiated: ${scenario.title}`,
      timestamp: new Date().toISOString()
    });
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Scenario command center</h2>
          <p className="text-sm text-slate-500">
            Encode multi-step missions—ads, product updates, SU, and loyalty boosts—in a single tap.
          </p>
        </div>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {scenarios.map((scenario) => (
          <button
            key={scenario.id}
            onClick={() => handleRun(scenario.id)}
            className={`space-y-3 rounded-2xl border p-4 text-left transition ${
              selected === scenario.id
                ? "border-brand-400 bg-brand-50 shadow-sm"
                : "border-slate-100 bg-slate-50 hover:border-brand-200"
            }`}
          >
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Scenario</span>
              <span>{scenario.timeline.length} steps</span>
            </div>
            <p className="text-sm font-semibold text-slate-800">{scenario.title}</p>
            <p className="text-sm text-slate-600">{scenario.description}</p>
            <ol className="list-decimal pl-5 text-xs text-slate-500">
              {scenario.timeline.map((step, index) => (
                <li key={step} className={selected === scenario.id && index === 0 ? "text-brand-600" : undefined}>
                  {step}
                </li>
              ))}
            </ol>
          </button>
        ))}
      </div>
    </section>
  );
}
