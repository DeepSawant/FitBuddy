export default function AchievementsPage() {
  return (
    <div className="card p-4">
      <h2 className="text-xl font-semibold">Achievements</h2>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {["Hydration Hero", "10-Day Streak", "Early Bird", "HIIT Master"].map((b) => (
          <div key={b} className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800 text-center">
            🏅
            <div className="mt-2 font-medium">{b}</div>
          </div>
        ))}
      </div>
    </div>
  );
}