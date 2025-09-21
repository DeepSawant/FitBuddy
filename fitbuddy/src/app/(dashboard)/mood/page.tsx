"use client";
import { useState } from "react";

const EMOJIS = ["😀", "🙂", "😐", "🙁", "😢"];

export default function MoodPage() {
  const [entries, setEntries] = useState<{ emoji: string; note?: string; date: string }[]>([]);
  const [emoji, setEmoji] = useState("😀");
  const [note, setNote] = useState("");

  const add = () => {
    setEntries((e) => [{ emoji, note, date: new Date().toISOString() }, ...e]);
    setNote("");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="card p-4">
        <h2 className="text-xl font-semibold">Mood Tracker</h2>
        <div className="mt-3 flex items-center gap-2">
          <select className="border rounded-md px-3 py-2 bg-transparent" value={emoji} onChange={(e) => setEmoji(e.target.value)}>
            {EMOJIS.map((e) => (
              <option key={e}>{e}</option>
            ))}
          </select>
          <input className="flex-1 border rounded-md px-3 py-2 bg-transparent" placeholder="Add a note" value={note} onChange={(e) => setNote(e.target.value)} />
          <button className="px-3 py-2 bg-blue-600 text-white rounded-md" onClick={add}>
            Log
          </button>
        </div>
        <ul className="mt-4 space-y-2 max-h-72 overflow-y-auto pr-2 scrollbar-thin">
          {entries.map((e, i) => (
            <li key={i} className="border rounded-md px-3 py-2 flex justify-between">
              <span>
                <b className="mr-2">{e.emoji}</b> {e.note}
              </span>
              <span className="text-xs text-slate-500">{new Date(e.date).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="card p-4">
        <h2 className="text-xl font-semibold">Weekly Emotion Chart</h2>
        <p className="text-slate-500 mt-2">(Placeholder chart)</p>
      </div>
    </div>
  );
}