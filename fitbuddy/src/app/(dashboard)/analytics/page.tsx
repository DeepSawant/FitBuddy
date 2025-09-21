"use client";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const caloriesData = [
  { day: "Mon", kcal: 2100 },
  { day: "Tue", kcal: 2200 },
  { day: "Wed", kcal: 2000 },
  { day: "Thu", kcal: 2300 },
  { day: "Fri", kcal: 2150 },
  { day: "Sat", kcal: 2400 },
  { day: "Sun", kcal: 1900 },
];

export default function AnalyticsPage() {
  return (
    <div className="card p-4">
      <h2 className="text-xl font-semibold">Progress Analytics</h2>
      <div className="h-72 mt-3">
        <ResponsiveContainer>
          <LineChart data={caloriesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="kcal" stroke="#2563eb" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}