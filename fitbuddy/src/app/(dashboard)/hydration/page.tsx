"use client";
import { useEffect, useState } from "react";

export default function HydrationPage() {
  const [ml, setMl] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("hydration_ml");
    if (saved) setMl(+saved);
  }, []);

  const add = (n: number) => {
    const v = Math.max(0, ml + n);
    setMl(v);
    localStorage.setItem("hydration_ml", String(v));
  };

  return (
    <div className="card p-4">
      <h2 className="text-xl font-semibold">Hydration Tracker</h2>
      <div className="mt-3 text-3xl font-bold">{ml} ml</div>
      <div className="mt-3 flex gap-2">
        {[200, 300, 500].map((n) => (
          <button key={n} className="px-3 py-2 bg-blue-600 text-white rounded-md" onClick={() => add(n)}>
            +{n} ml
          </button>
        ))}
        <button className="px-3 py-2 border rounded-md" onClick={() => add(-200)}>
          -200 ml
        </button>
      </div>
    </div>
  );
}