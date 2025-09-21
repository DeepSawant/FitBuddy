"use client";
import { useEffect, useState } from "react";

export default function ProgressWidget() {
  const [streak, setStreak] = useState(3);
  const [caloriesBurned, setCaloriesBurned] = useState(450);
  const [steps, setSteps] = useState(6500);
  const [water, setWater] = useState(1200);

  useEffect(() => {
    // In real app, pull from DB/wearables
  }, []);

  return (
    <div className="card p-4 grid grid-cols-2 gap-4">
      <Metric label="Streak" value={`${streak} days`} />
      <Metric label="Calories" value={`${caloriesBurned}`} suffix="kcal" />
      <Metric label="Steps" value={`${steps}`} />
      <Metric label="Water" value={`${water}`} suffix="ml" />
    </div>
  );
}

function Metric({ label, value, suffix }: { label: string; value: string; suffix?: string }) {
  return (
    <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="text-xl font-semibold">
        {value} {suffix}
      </div>
    </div>
  );
}