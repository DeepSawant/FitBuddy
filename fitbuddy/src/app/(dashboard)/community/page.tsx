export default function CommunityPage() {
  return (
    <div className="card p-4 space-y-4">
      <h2 className="text-xl font-semibold">Community & Challenges</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {["75 Hard", "20-Day Hydration", "10k Steps Week"].map((c) => (
          <div key={c} className="border rounded-lg p-4">
            <div className="font-medium">{c}</div>
            <button className="mt-3 px-3 py-2 bg-blue-600 text-white rounded-md">Join</button>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <h3 className="font-semibold">Leaderboard</h3>
        <ol className="mt-2 list-decimal pl-6">
          <li>Alex (20 pts)</li>
          <li>Sam (18 pts)</li>
          <li>Priya (16 pts)</li>
        </ol>
      </div>
    </div>
  );
}