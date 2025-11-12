const integrations = [
  {
    name: "Shopify & custom storefronts",
    status: "Synced",
    description: "Manage product listings, availability, pricing, Aeon Money entitlements in real time."
  },
  {
    name: "Meta Commerce + Ads",
    status: "Authenticated",
    description: "Auto-generate Advantage+ catalog ads, retargeting flows, and creative rotations."
  },
  {
    name: "Google Merchant & Ads",
    status: "Synced",
    description: "Feed optimization, Performance Max orchestration, Smart Bidding guardrails."
  },
  {
    name: "Content surfaces",
    status: "Synced",
    description: "Instagram, TikTok, YouTube, Pinterest, Twitter scheduling with AI captions + SU enhancements."
  },
  {
    name: "SU uplifts",
    status: "Monitoring",
    description: "Search universe automations refresh metadata, structured data, and backlink outreach."
  },
  {
    name: "Aeon Money",
    status: "Secured",
    description: "Track accrual, redemption, cashback, and loyalty triggers across all flows."
  }
];

export function IntegrationMatrix() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">Systems connected</h2>
      <p className="mt-1 text-sm text-slate-500">
        Every workflow is API-connected. Extend with additional providers using the agent integration kit.
      </p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {integrations.map((integration) => (
          <div key={integration.name} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-800">{integration.name}</p>
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-700">
                {integration.status}
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-600">{integration.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
