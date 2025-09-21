"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { calculateBMI, calculateDailyCalories } from "@/lib/calculations";

export type User = {
  id: string;
  email: string;
  name?: string;
  photoURL?: string;
};

export type Profile = {
  name: string;
  age: number;
  gender: "male" | "female" | "other";
  heightCm: number;
  weightKg: number;
  diet: "veg" | "nonveg";
  bmi: number;
  caloriesTarget: number;
};

export type AppState = {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  saveProfile: (p: Omit<Profile, "bmi" | "caloriesTarget">) => void;
};

const Ctx = createContext<AppState | null>(null);

const LS_USER = "fitbuddy_user";
const LS_PROFILE = "fitbuddy_profile";

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const uRaw = typeof window !== "undefined" ? localStorage.getItem(LS_USER) : null;
    const pRaw = typeof window !== "undefined" ? localStorage.getItem(LS_PROFILE) : null;
    if (uRaw) setUser(JSON.parse(uRaw));
    if (pRaw) setProfile(JSON.parse(pRaw));
    setLoading(false);
  }, []);

  const loginWithEmail = async (email: string, _password: string) => {
    // Mock auth for now. Replace with Firebase if configured.
    const mock: User = { id: crypto.randomUUID(), email, name: email.split("@")[0] };
    setUser(mock);
    localStorage.setItem(LS_USER, JSON.stringify(mock));
    router.push("/dashboard");
  };

  const registerWithEmail = async (email: string, password: string) => {
    await loginWithEmail(email, password);
  };

  const loginWithGoogle = async () => {
    // Mock Google OAuth. Replace with Firebase/NextAuth integration.
    const mock: User = { id: crypto.randomUUID(), email: "user@gmail.com", name: "FitBuddy User" };
    setUser(mock);
    localStorage.setItem(LS_USER, JSON.stringify(mock));
    router.push("/dashboard");
  };

  const logout = async () => {
    setUser(null);
    setProfile(null);
    localStorage.removeItem(LS_USER);
    localStorage.removeItem(LS_PROFILE);
    router.push("/login");
  };

  const saveProfile = (p: Omit<Profile, "bmi" | "caloriesTarget">) => {
    const bmi = calculateBMI(p.heightCm, p.weightKg);
    const caloriesTarget = calculateDailyCalories(p.age, p.gender, p.heightCm, p.weightKg);
    const full: Profile = { ...p, bmi, caloriesTarget };
    setProfile(full);
    localStorage.setItem(LS_PROFILE, JSON.stringify(full));
    router.push("/dashboard");
  };

  const value: AppState = useMemo(
    () => ({ user, profile, loading, loginWithEmail, registerWithEmail, loginWithGoogle, logout, saveProfile }),
    [user, profile, loading]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}