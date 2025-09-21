"use client";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import ProgressWidget from "@/components/ProgressWidget";
import { useApp } from "@/context/AppContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, profile } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login");
    else if (user && !profile) router.push("/onboarding");
  }, [user, profile, router]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container-max py-6 grid grid-cols-1 lg:grid-cols-[16rem_1fr] gap-6">
        <Sidebar />
        <main className="space-y-6">
          <ProgressWidget />
          {children}
        </main>
      </div>
    </div>
  );
}