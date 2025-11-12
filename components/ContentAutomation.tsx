"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useAgent } from "./AgentProvider";
import type { ContentAsset } from "@/lib/types";
import { generateId } from "@/lib/id";

const platforms = ["Instagram", "TikTok", "YouTube", "Pinterest", "Twitter", "Facebook"];
const assetTypes: ContentAsset["type"][] = ["image", "video", "copy", "story", "live"];

export function ContentAutomation() {
  const { contentAssets, addContentAsset, appendLog } = useAgent();
  const [formData, setFormData] = useState({
    title: "",
    platform: "Instagram",
    type: "image" as ContentAsset["type"],
    caption: "",
    scheduledAt: "",
    assetUrl: ""
  });

  const handleSubmit = () => {
    if (!formData.title.trim()) return;
    const scheduledAt = formData.scheduledAt ? new Date(formData.scheduledAt).toISOString() : undefined;
    const asset: ContentAsset = {
      id: generateId("asset"),
      title: formData.title.trim(),
      type: formData.type,
      platform: formData.platform,
      status: scheduledAt ? "scheduled" : "draft",
      scheduledAt,
      caption: formData.caption.trim() || "",
      assetUrl: formData.assetUrl.trim() || undefined,
      objectives: ["awareness", "sales assist"]
    };
    addContentAsset(asset);
    appendLog({
      id: generateId("log"),
      actor: "Aeon Agent",
      icon: "📤",
      status: "success",
      summary: `Content asset queued for ${asset.platform}: ${asset.title}`,
      timestamp: new Date().toISOString()
    });
    setFormData({ title: "", platform: "Instagram", type: "image", caption: "", scheduledAt: "", assetUrl: "" });
  };

  return (
    <section className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-1">
        <h2 className="text-xl font-semibold text-slate-900">Content automation</h2>
        <p className="text-sm text-slate-500">
          Drop imagery, videos, or campaign directives. The agent writes captions, schedules, and
          syndicates across surfaces automatically.
        </p>
        <div className="space-y-2 rounded-2xl border border-dashed border-brand-200 bg-brand-50/60 p-4 text-sm text-brand-800">
          <p className="font-medium">Agent boosters</p>
          <ul className="list-disc pl-5">
            <li>Auto-caption in 16 languages</li>
            <li>Smart hashtag & CTA selection</li>
            <li>Cross-post scheduling with best-time intelligence</li>
          </ul>
        </div>
      </div>
      <div className="space-y-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 lg:col-span-2">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">Title</label>
            <input
              className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
              placeholder="UGC unboxing clip for hero product"
              value={formData.title}
              onChange={(event) => setFormData((prev) => ({ ...prev, title: event.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">Platform</label>
            <select
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
              value={formData.platform}
              onChange={(event) => setFormData((prev) => ({ ...prev, platform: event.target.value }))}
            >
              {platforms.map((platform) => (
                <option key={platform}>{platform}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">Asset type</label>
            <select
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
              value={formData.type}
              onChange={(event) => setFormData((prev) => ({ ...prev, type: event.target.value as ContentAsset["type"] }))}
            >
              {assetTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">Schedule</label>
            <input
              type="datetime-local"
              className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-600 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
              value={formData.scheduledAt}
              onChange={(event) => setFormData((prev) => ({ ...prev, scheduledAt: event.target.value }))}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">Caption or script</label>
            <textarea
              className="min-h-[120px] w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
              placeholder="Include hooks, product USPs, Aeon Money mention, CTA"
              value={formData.caption}
              onChange={(event) => setFormData((prev) => ({ ...prev, caption: event.target.value }))}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">Media reference</label>
            <input
              className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
              placeholder="https://cdn.yourstore.com/assets/ugc-clip.mp4"
              value={formData.assetUrl}
              onChange={(event) => setFormData((prev) => ({ ...prev, assetUrl: event.target.value }))}
            />
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          Generate deployment plan
        </button>
      </div>
      <div className="lg:col-span-3">
        <h3 className="text-sm font-semibold text-slate-700">Pipeline preview</h3>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {contentAssets.slice(0, 6).map((asset) => (
            <div key={asset.id} className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{asset.platform}</span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-emerald-600">
                  {asset.status}
                </span>
              </div>
              <p className="mt-2 text-sm font-medium text-slate-900">{asset.title}</p>
              <p className="mt-1 text-xs text-slate-500 line-clamp-3">{asset.caption}</p>
              <p className="mt-3 text-xs font-medium text-slate-400">
                {asset.scheduledAt ? `Scheduled ${format(new Date(asset.scheduledAt), "MMM d, HH:mm")}` : "Draft"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
