"use client";

import { useMemo, useState } from "react";
import { useAgent } from "./AgentProvider";
import type { Campaign } from "@/lib/types";
import { generateId } from "@/lib/id";
import { format } from "date-fns";

const objectives = [
  "Sales conversion",
  "Catalog sales",
  "Awareness",
  "Traffic",
  "Leads",
  "App installs"
];

const platforms: Campaign["platform"][] = ["Meta", "Google", "TikTok", "Pinterest", "Snapchat"];

export function CampaignLaunchpad() {
  const { campaigns, addCampaign, appendLog } = useAgent();
  const [formData, setFormData] = useState({
    name: "",
    objective: objectives[0],
    platform: platforms[0],
    audience: "Lookalike shoppers",
    budget: "2500",
    startDate: "",
    endDate: ""
  });

  const liveCampaigns = useMemo(() => campaigns.filter((campaign) => campaign.status === "active"), [campaigns]);

  const handleSubmit = () => {
    if (!formData.name.trim()) return;
    const campaign: Campaign = {
      id: generateId("campaign"),
      name: formData.name.trim(),
      objective: formData.objective,
      platform: formData.platform,
      audience: formData.audience.trim() || "Smart segment",
      budget: Number(formData.budget) || 0,
      status: "draft",
      startDate: formData.startDate ? new Date(formData.startDate).toISOString() : new Date().toISOString(),
      endDate: formData.endDate
        ? new Date(formData.endDate).toISOString()
        : new Date(Date.now() + 86400000 * 7).toISOString(),
      metrics: {
        impressions: 0,
        clicks: 0,
        conversions: 0,
        spend: 0,
        roas: 0
      }
    };
    addCampaign(campaign);
    appendLog({
      id: generateId("log"),
      actor: "Aeon Agent",
      icon: "🚀",
      status: "success",
      summary: `Campaign drafted on ${campaign.platform}: ${campaign.name}`,
      timestamp: new Date().toISOString()
    });
    setFormData({
      name: "",
      objective: objectives[0],
      platform: platforms[0],
      audience: "Lookalike shoppers",
      budget: "2500",
      startDate: "",
      endDate: ""
    });
  };

  return (
    <section className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-1">
        <h2 className="text-xl font-semibold text-slate-900">Campaign launchpad</h2>
        <p className="text-sm text-slate-500">
          Command Meta, Google, and emerging channels with a single instruction. The agent
          configures creatives, audiences, and budget pacing automatically.
        </p>
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-xs text-slate-500">
          <p className="font-semibold text-slate-600">Live telemetry</p>
          <ul className="mt-2 space-y-1">
            {liveCampaigns.map((campaign) => (
              <li key={campaign.id} className="flex justify-between">
                <span>{campaign.name}</span>
                <span className="font-medium text-emerald-500">ROAS {campaign.metrics.roas.toFixed(1)}x</span>
              </li>
            ))}
            {liveCampaigns.length === 0 ? <li>No active campaigns yet</li> : null}
          </ul>
        </div>
      </div>
      <div className="space-y-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">Campaign name</label>
            <input
              className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
              placeholder="Meta Advantage+ conversion burst"
              value={formData.name}
              onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">Platform</label>
            <select
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
              value={formData.platform}
              onChange={(event) => setFormData((prev) => ({ ...prev, platform: event.target.value as Campaign["platform"] }))}
            >
              {platforms.map((platform) => (
                <option key={platform}>{platform}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">Objective</label>
            <select
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
              value={formData.objective}
              onChange={(event) => setFormData((prev) => ({ ...prev, objective: event.target.value }))}
            >
              {objectives.map((objective) => (
                <option key={objective}>{objective}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">Audience</label>
            <input
              className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
              value={formData.audience}
              onChange={(event) => setFormData((prev) => ({ ...prev, audience: event.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">Budget (USD)</label>
            <input
              type="number"
              className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
              value={formData.budget}
              onChange={(event) => setFormData((prev) => ({ ...prev, budget: event.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">Start date</label>
            <input
              type="date"
              className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
              value={formData.startDate}
              onChange={(event) => setFormData((prev) => ({ ...prev, startDate: event.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">End date</label>
            <input
              type="date"
              className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
              value={formData.endDate}
              onChange={(event) => setFormData((prev) => ({ ...prev, endDate: event.target.value }))}
            />
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-700"
        >
          Draft campaign brief
        </button>
      </div>
      <div className="lg:col-span-3">
        <h3 className="text-sm font-semibold text-slate-700">Portfolio intelligence</h3>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {campaigns.slice(0, 6).map((campaign) => (
            <div key={campaign.id} className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{campaign.platform}</span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-600">{campaign.status}</span>
              </div>
              <p className="mt-2 text-sm font-medium text-slate-900">{campaign.name}</p>
              <p className="mt-1 text-xs text-slate-500">Objective: {campaign.objective}</p>
              <p className="mt-1 text-xs text-slate-500">Budget ${campaign.budget.toLocaleString()}</p>
              <p className="mt-3 text-xs font-medium text-slate-400">
                {`Runs ${format(new Date(campaign.startDate), "MMM d")} - ${format(new Date(campaign.endDate), "MMM d")}`}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
