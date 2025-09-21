"use client";
import { useApp } from "@/context/AppContext";
import WorkoutTimer from "@/components/WorkoutTimer";

export default function DashboardPage() {
  const { profile } = useApp();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="card p-4">
        <h2 className="text-xl font-semibold">Welcome back{profile?.name ? `, ${profile.name}` : ""} 👋</h2>
        <p className="text-slate-600 dark:text-slate-300 mt-1">
          BMI: <b>{profile?.bmi ?? "-"}</b> • Daily Calories: <b>{profile?.caloriesTarget ?? "-"}</b>
        </p>
      </div>
      <WorkoutTimer task={{ type: "countdown", label: "1 min plank", seconds: 60 }} />
      <WorkoutTimer task={{ type: "sets", label: "Push-ups", sets: 3, reps: 20 }} />
    </div>
  );
}