import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-[#0b1020] dark:to-[#0b1020]">
      <div className="container-max py-20">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
            FitBuddy • Your AI-powered fitness companion
          </div>
          <h1 className="mt-6 text-4xl sm:text-6xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Train smarter. Eat better. Track everything.
          </h1>
          <p className="mt-4 text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-lg">
            Personalized workouts, nutrition plans, mood tracking, community challenges, and more — all in one dashboard.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link href="/login" className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700">
              Login
            </Link>
            <Link href="/register" className="px-6 py-3 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800">
              Create account
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
