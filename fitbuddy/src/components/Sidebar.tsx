"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/nutrition", label: "Nutrition" },
  { href: "/mood", label: "Mood Tracker" },
  { href: "/community", label: "Community & Challenges" },
  { href: "/achievements", label: "Achievements" },
  { href: "/wearables", label: "Wearables Sync" },
  { href: "/hydration", label: "Hydration" },
  { href: "/sleep", label: "Sleep" },
  { href: "/analytics", label: "Progress Analytics" },
  { href: "/chatbot", label: "FitBuddy Chatbot" },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 h-[calc(100vh-4rem)] sticky top-16 hidden lg:block">
      <nav className="p-4 space-y-1">
        {links.map((l) => {
          const active = pathname === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`block px-3 py-2 rounded-md border ${
                active
                  ? "bg-blue-600 text-white border-blue-700"
                  : "border-[var(--border)] hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}