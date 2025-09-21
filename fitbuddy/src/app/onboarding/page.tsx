"use client";
import { useApp } from "@/context/AppContext";
import { useForm } from "react-hook-form";

export default function OnboardingPage() {
  const { saveProfile } = useApp();
  const { register, handleSubmit } = useForm<{
    name: string;
    age: number;
    gender: "male" | "female" | "other";
    heightCm: number;
    weightKg: number;
    diet: "veg" | "nonveg";
  }>();

  return (
    <main className="min-h-screen grid place-items-center">
      <div className="card p-6 w-full max-w-2xl">
        <h1 className="text-2xl font-bold">Tell us about you</h1>
        <form className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit((v) => saveProfile({ ...v, age: +v.age, heightCm: +v.heightCm, weightKg: +v.weightKg }))}>
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input className="w-full border rounded-md px-3 py-2 bg-transparent" {...register("name", { required: true })} />
          </div>
          <div>
            <label className="block text-sm mb-1">Age</label>
            <input className="w-full border rounded-md px-3 py-2 bg-transparent" type="number" {...register("age", { required: true, valueAsNumber: true })} />
          </div>
          <div>
            <label className="block text-sm mb-1">Gender</label>
            <select className="w-full border rounded-md px-3 py-2 bg-transparent" {...register("gender", { required: true })}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Height (cm)</label>
            <input className="w-full border rounded-md px-3 py-2 bg-transparent" type="number" step="0.1" {...register("heightCm", { required: true, valueAsNumber: true })} />
          </div>
          <div>
            <label className="block text-sm mb-1">Weight (kg)</label>
            <input className="w-full border rounded-md px-3 py-2 bg-transparent" type="number" step="0.1" {...register("weightKg", { required: true, valueAsNumber: true })} />
          </div>
          <div>
            <label className="block text-sm mb-1">Diet</label>
            <select className="w-full border rounded-md px-3 py-2 bg-transparent" {...register("diet", { required: true })}>
              <option value="veg">Veg</option>
              <option value="nonveg">Non-Veg</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <button className="w-full bg-blue-600 text-white rounded-md py-2">Continue</button>
          </div>
        </form>
      </div>
    </main>
  );
}