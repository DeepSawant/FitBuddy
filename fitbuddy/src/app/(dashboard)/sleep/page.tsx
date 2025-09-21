"use client";
import { useEffect, useState } from "react";

export default function SleepPage() {
  const [hours, setHours] = useState<number[]>([]);
  const [today, setToday] = useState(7);

  useEffect(() => {
    const raw = localStorage.getItem("sleep_hours");
    if (raw) setHours(JSON.parse(raw));
  }, []);

  const log = () => {
    const next = [today, ...hours].slice(0, 7);
    setHours(next);
    localStorage.setItem("sleep_hours", JSON.stringify(next));
  };

  return (
    <div className="card p-4">
      <h2 className="text-xl font-semibold">Sleep Tracker</h2>
      <div className="mt-3 flex items-center gap-2">
        <input className="border rounded-md px-3 py-2 bg-transparent w-24" type="number" step="0.5" value={today} onChange={(e) => setToday(+e.target.value)} />
        <button className="px-3 py-2 bg-blue-600 text-white rounded-md" onClick={log}>Log</button>
      </div>
      <ul className="mt-4 flex gap-2 text-sm">
        {hours.map((h, i) => (
          <li key={i} className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800">{h}h</li>
        ))}
      </ul>
    </div>
  );
}