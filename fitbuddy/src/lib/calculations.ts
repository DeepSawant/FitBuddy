export function calculateBMI(heightCm: number, weightKg: number) {
  const h = heightCm / 100;
  const bmi = weightKg / (h * h);
  return Math.round(bmi * 10) / 10;
}

export function calculateDailyCalories(
  age: number,
  gender: "male" | "female" | "other",
  heightCm: number,
  weightKg: number,
  activity: "sedentary" | "light" | "moderate" | "active" = "moderate",
  goal: "maintain" | "deficit" | "surplus" = "maintain"
) {
  // Mifflin-St Jeor Equation
  const s = gender === "male" ? 5 : -161; // other -> treat as female baseline
  const bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + s;
  const factors = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725 } as const;
  let calories = bmr * factors[activity];
  if (goal === "deficit") calories -= 400;
  if (goal === "surplus") calories += 300;
  return Math.round(calories);
}