# FitBuddy

A professional fitness and nutrition web app featuring authentication & onboarding, a personalized dashboard, roadmap/workouts with timers and toasts, nutrition plans with macros, mood tracking, community & challenges, achievements, hydration and sleep tracking, analytics, and an in-app chatbot.

## Tech stack
- Next.js (App Router, TypeScript)
- Tailwind CSS
- next-themes (dark/light)
- react-hook-form + zod (forms)
- react-hot-toast (toasts)
- recharts (charts)
- Optional: Firebase Auth for email/password + Google OAuth 2.0

## Quick start
1) Install dependencies

```bash
npm install
```

2) Run dev server

```bash
npm run dev
```

Visit http://localhost:3000

## Authentication
By default, auth is mocked locally for quick testing. To enable real auth (email/password + Google):

1) Create a Firebase project and enable Email/Password and Google providers in Firebase Authentication.
2) Create `.env.local` (copy from `.env.local.example`) and fill in your Firebase config keys.
3) Replace the mock methods in `src/context/AppContext.tsx` with Firebase auth calls (signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, etc.).

## Pages
- /login, /register: Auth pages
- /onboarding: Capture name, age, gender, height, weight, diet; auto-compute BMI and calorie target
- /dashboard: Overview + workout timers + toasts
- /roadmap: Personalized workout plan by age group
- /nutrition: Daily meal plan (veg/non-veg) + macros chart
- /mood: Emoji-based journal with notes and weekly placeholder chart
- /community: Join challenges + leaderboard
- /achievements: Badges
- /wearables: Connect buttons (placeholders) for Fitbit, Mi Band, Google Fit
- /hydration: Water intake widget
- /sleep: Manual sleep log + weekly list
- /analytics: Progress charts (calories demo)
- /chatbot: FitBuddy Assistant (rules-based demo)

## Theming
- Toggle theme in the navbar. Dark/light is persisted by next-themes and Tailwind variables.

## Production
- Configure Firebase (optional) and any API keys
- Build with `npm run build` and start with `npm start`

## Notes
- Wearables sync and chatbot are scaffolded with placeholders. Add provider OAuth credentials and an LLM API key to enable production functionality.
