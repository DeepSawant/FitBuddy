"use client";
import { useApp } from "@/context/AppContext";
import { useForm } from "react-hook-form";

export default function RegisterPage() {
  const { registerWithEmail } = useApp();
  const { register, handleSubmit } = useForm<{ email: string; password: string }>();

  return (
    <main className="min-h-screen grid place-items-center">
      <div className="card p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold">Create account</h1>
        <form className="mt-4 space-y-3" onSubmit={handleSubmit(({ email, password }) => registerWithEmail(email, password))}>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input className="w-full border rounded-md px-3 py-2 bg-transparent" type="email" {...register("email", { required: true })} />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input className="w-full border rounded-md px-3 py-2 bg-transparent" type="password" {...register("password", { required: true })} />
          </div>
          <button className="w-full bg-blue-600 text-white rounded-md py-2">Sign up</button>
        </form>
        <p className="text-sm mt-3 text-slate-500">
          Already have an account? <a className="text-blue-600" href="/login">Login</a>
        </p>
      </div>
    </main>
  );
}