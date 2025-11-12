"use client";

import { formatDistanceToNow } from "date-fns";
import { useAgent } from "./AgentProvider";

const statusTone: Record<string, string> = {
  success: "text-emerald-600",
  warning: "text-amber-600",
  info: "text-brand-600"
};

export function ActivityStream() {
  const { activityLog } = useAgent();

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Live command stream</h2>
          <p className="text-sm text-slate-500">Trace the autonomous decisions and actions executed by Aeon Agent.</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
          {activityLog.length} activities
        </span>
      </div>
      <ul className="mt-4 space-y-3">
        {activityLog.map((entry) => (
          <li key={entry.id} className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <span className="text-2xl" aria-hidden>
              {entry.icon}
            </span>
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-800">{entry.summary}</p>
              <p className={`text-xs ${statusTone[entry.status]}`}>{entry.actor}</p>
              <p className="text-xs text-slate-400">
                {formatDistanceToNow(new Date(entry.timestamp), { addSuffix: true })}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
