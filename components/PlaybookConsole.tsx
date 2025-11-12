"use client";

import { useAgent } from "./AgentProvider";

export function PlaybookConsole() {
  const { playbooks, togglePlaybook } = useAgent();

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Automation playbooks</h2>
          <p className="text-sm text-slate-500">All-channel workflows that keep the store compounding while you rest.</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
          {playbooks.filter((playbook) => playbook.status === "enabled").length} enabled
        </span>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {playbooks.map((playbook) => (
          <div key={playbook.id} className="space-y-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-800">{playbook.name}</h3>
              <button
                onClick={() => togglePlaybook(playbook.id)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                  playbook.status === "enabled"
                    ? "bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20"
                    : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                }`}
              >
                {playbook.status === "enabled" ? "Enabled" : "Disabled"}
              </button>
            </div>
            <p className="text-xs uppercase text-slate-400">Trigger: {playbook.trigger}</p>
            <ul className="space-y-1 text-sm text-slate-600">
              {playbook.actions.map((action) => (
                <li key={action} className="flex items-start gap-2">
                  <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-brand-500" />
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
