"use client";
import { useApp } from "@/context/AppContext";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ["#2563eb", "#22c55e", "#f59e0b", "#ef4444"];

export default function NutritionPage() {
  const { profile } = useApp();
  const data = [
    { name: "Protein", value: 120 },
    { name: "Carbs", value: 250 },
    { name: "Fats", value: 60 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="card p-4">
        <h2 className="text-xl font-semibold">Daily Meal Plan ({profile?.diet?.toUpperCase()})</h2>
        <ul className="mt-3 space-y-2 text-slate-700 dark:text-slate-200">
          <li>Breakfast: Oats + Greek Yogurt + Berries</li>
          <li>Lunch: Grilled {profile?.diet === "veg" ? "Paneer" : "Chicken"} + Rice + Salad</li>
          <li>Snack: Nuts + Fruit</li>
          <li>Dinner: {profile?.diet === "veg" ? "Dal + Quinoa" : "Fish"} + Veggies</li>
        </ul>
        <div className="mt-3 text-sm text-slate-500">Alternatives shown based on preference</div>
      </div>
      <div className="card p-4">
        <h2 className="text-xl font-semibold">Macros</h2>
        <div className="h-64">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}