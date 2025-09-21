"use client";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useApp } from "@/context/AppContext";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const { user, logout } = useApp();

  return (
    <header className="border-b border-[var(--border)] bg-[var(--card)] sticky top-0 z-40">
      <div className="container-max h-16 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl">
          <span className="inline-block h-8 w-8 rounded-lg bg-blue-600 text-white grid place-items-center">F</span>
          <span>FitBuddy</span>
        </Link>
        <div className="flex items-center gap-3">
          <button
            aria-label="Toggle theme"
            className="p-2 rounded-md border border-[var(--border)] hover:bg-slate-50 dark:hover:bg-slate-800"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </button>
          {user ? (
            <button
              onClick={logout}
              className="px-3 py-2 rounded-md bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
            >
              Logout
            </button>
          ) : (
            <Link href="/login" className="px-3 py-2 rounded-md bg-blue-600 text-white">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}