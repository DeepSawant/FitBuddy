"use client";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export type TimerTask =
  | { type: "countdown"; label: string; seconds: number }
  | { type: "sets"; label: string; sets: number; reps: number };

export default function WorkoutTimer({ task }: { task: TimerTask }) {
  if (task.type === "countdown") return <CountdownTimer label={task.label} seconds={task.seconds} />;
  return <SetsTimer label={task.label} sets={task.sets} reps={task.reps} />;
}

function CountdownTimer({ label, seconds }: { label: string; seconds: number }) {
  const [remaining, setRemaining] = useState(seconds);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(intervalRef.current!);
          toast.success("Workout Completed ✅");
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current!);
  }, [running]);

  const minutes = Math.floor(remaining / 60);
  const secs = remaining % 60;

  return (
    <div className="card p-4">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="text-3xl font-bold tabular-nums">
        {minutes}:{secs.toString().padStart(2, "0")}
      </div>
      <div className="mt-3 flex gap-2">
        <button className="px-3 py-2 bg-blue-600 text-white rounded-md" onClick={() => setRunning(true)}>
          Start
        </button>
        <button className="px-3 py-2 border rounded-md" onClick={() => setRunning(false)}>
          Pause
        </button>
        <button className="px-3 py-2 border rounded-md" onClick={() => setRemaining(seconds)}>
          Reset
        </button>
      </div>
    </div>
  );
}

function SetsTimer({ label, sets, reps }: { label: string; sets: number; reps: number }) {
  const [currentSet, setCurrentSet] = useState(1);

  const next = () => {
    if (currentSet < sets) {
      setCurrentSet((s) => s + 1);
      toast("Don’t give up, 1 more set! 💪", { icon: "🔥" });
    } else {
      toast.success("Workout Completed ✅");
    }
  };

  return (
    <div className="card p-4">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="text-xl font-semibold">
        Set {currentSet} / {sets} • {reps} reps
      </div>
      <div className="mt-3">
        <button className="px-3 py-2 bg-blue-600 text-white rounded-md" onClick={next}>
          Complete set
        </button>
      </div>
    </div>
  );
}