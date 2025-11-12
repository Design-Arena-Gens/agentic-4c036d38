export function AgentHeader() {
  return (
    <header className="gradient-bg rounded-3xl border border-slate-200 p-8 shadow-sm">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl space-y-3">
          <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-600">
            <span>AEON COMMERCE AGENT</span>
            <span className="text-brand-700">Always-on</span>
          </p>
          <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">
            Manage your entire retail universe with an autonomous operator
          </h1>
          <p className="text-slate-600">
            Upload rich media, orchestrate product launches, spin up campaigns across Meta
            and Google, and let the agent optimize loyalty, content, and retail ops while
            safeguarding Aeon Money flows.
          </p>
        </div>
        <div className="grid w-full max-w-sm gap-4 rounded-2xl border border-white/80 bg-white/70 p-5 backdrop-blur md:w-auto">
          <div>
            <p className="text-xs uppercase text-slate-400">Agent Status</p>
            <p className="mt-1 flex items-center gap-2 text-lg font-semibold text-slate-900">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              Fully operational
            </p>
          </div>
          <div>
            <p className="text-xs uppercase text-slate-400">Active Missions</p>
            <p className="mt-1 text-xl font-bold text-slate-900">21 workflows</p>
            <p className="text-xs text-slate-500">Across 8 channels with autonomous scheduling</p>
          </div>
          <div>
            <p className="text-xs uppercase text-slate-400">This week</p>
            <p className="mt-1 text-sm text-slate-600">
              62 tasks completed • 14 campaigns scaled • 480k Aeon Money credited
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
