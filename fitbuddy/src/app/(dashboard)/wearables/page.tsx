export default function WearablesPage() {
  return (
    <div className="card p-4 space-y-3">
      <h2 className="text-xl font-semibold">Wearables Sync</h2>
      <p className="text-slate-600 dark:text-slate-300">Connect your devices to sync steps, heart rate, and sleep.</p>
      <div className="flex flex-wrap gap-3">
        {[
          { name: "Fitbit", disabled: true },
          { name: "Mi Band", disabled: true },
          { name: "Google Fit", disabled: true },
        ].map((w) => (
          <button key={w.name} className="px-4 py-2 border rounded-md disabled:opacity-50" disabled>
            Connect {w.name}
          </button>
        ))}
      </div>
      <p className="text-sm text-slate-500">(Placeholder buttons — add OAuth credentials to enable)</p>
    </div>
  );
}