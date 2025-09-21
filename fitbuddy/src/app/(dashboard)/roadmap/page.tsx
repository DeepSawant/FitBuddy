"use client";
import { useApp } from "@/context/AppContext";

function planByAge(age: number) {
  if (age < 30) return ["HIIT (20m)", "Cardio (20m)", "Push-ups 3x20", "Sprints 6x100m"];
  if (age < 40) return ["Balanced Cardio (30m)", "Yoga (20m)", "Bodyweight circuit"];
  return ["Yoga (30m)", "Meditation (10m)", "Light walk (30m)"];
}

export default function RoadmapPage() {
  const { profile } = useApp();
  const workouts = profile ? planByAge(profile.age) : [];

  return (
    <div className="card p-4">
      <h2 className="text-xl font-semibold">Personalized Fitness Plan</h2>
      <ul className="mt-3 list-disc pl-6 space-y-1">
        {workouts.map((w) => (
          <li key={w}>{w}</li>
        ))}
      </ul>
    </div>
  );
}