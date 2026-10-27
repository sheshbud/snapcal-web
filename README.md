# SnapCal (web app)

The real, deployable version of SnapCal. Snap a photo of a schedule or syllabus, it turns it into a calendar. Installs to a phone home screen like a native app, no app store needed.

This talks to the separate `snapcal-backend` (the secure scan endpoint). Deploy that first.

---

## Run it locally

You need Node 18 or newer.

```
npm install
npm run dev
```

Open the URL it prints (usually http://localhost:5173). Add an event by hand to confirm it runs. For the photo scan to work locally, set `VITE_SCAN_URL` to your deployed backend (see below).

---

## Connect the scanner

1. Deploy the `snapcal-backend` project first (its README walks you through it). You'll get a URL like `https://snapcal-backend.vercel.app/api/scan`.
2. Copy `.env.example` to `.env` and set:
   ```
   VITE_SCAN_URL=https://snapcal-backend.vercel.app/api/scan
   ```
3. Restart `npm run dev`. The snap feature now works end to end.

---

## Deploy the app (free, ~10 min)

1. Push this folder to a GitHub repo.
2. Go to vercel.com, "Add New Project," import the repo. Framework preset: Vite. Build command `npm run build`, output `dist`.
3. Add the environment variable `VITE_SCAN_URL` in the Vercel project settings (same value as above).
4. Deploy. You get a live URL like `https://snapcal.vercel.app`.

That URL is your app. Drop it in your TikTok bio or a video. On iPhone, users tap Share, "Add to Home Screen," and it behaves like an installed app.

---

## What's already built in

- Photo and PDF scan to dates (via your backend).
- Confirm screen: edit names, recolor each event, fix dates, pick a reminder.
- Auto names a new calendar from the document title.
- Month calendar, agenda, multiple calendars, show/hide, rename, custom colors.
- Per-event reminders that ride along in the .ics export.
- Manual event entry (works with no scan at all).
- Keeps data on the device (localStorage), no account needed.
- Installable (PWA) with icon and manifest.

---

## Before a public launch

- **Privacy policy.** You send photos to an AI service to read them. Say so plainly, say you don't store the photos, and link it from the app. Both app stores and basic trust require this.
- **Lock the backend.** In `snapcal-backend`, restrict the allowed origin to your app's domain and add a rate limit so no one else burns your API credit.
- **Test on real phones**, iPhone Safari and Android Chrome, including "Add to Home Screen."
- **Confirm the model id and pricing** at docs.claude.com before launch.

---

## Going native later (only if it takes off)

This same code wraps into a real App Store / Play Store app with Capacitor (`npm i @capacitor/core @capacitor/cli`, then `npx cap init`). Do that once you see real repeat usage. Native's main extra is true push notifications; until then the .ics export covers reminders.
