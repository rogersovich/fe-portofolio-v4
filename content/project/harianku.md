---
title: "Harianku"
summary: "<p>HarianKu is a <strong>mobile-first web app</strong> that helps users build consistent daily habits — plan weekly meals, track workouts, and manage pantry stock, all in one cheerful and easy-to-use platform. Built as a solo portfolio project using <strong>Next.js 14, Supabase, Cloudinary, and Cloudflare AI</strong>, featuring a streak &amp; reward system, AI-powered weekly summary, and a UX designed to be minimal, fun, and actually enjoyable to use every day.</p>"
image: "https://res.cloudinary.com/dxlmdzryf/image/upload/v1780765890/project/1780765887_4523be12-9a19-44eb-95c1-0ba5d8e98e5d.png"
repositoryUrl: null
websiteUrl: "https://harianku.dimasroger.my.id"
technologies:
  - "Next JS"
  - "Tailwind"
  - "Postgresql"
  - "Auth Google"
publishedAt: "2026-06-07T00:27:03"
updatedAt: "2026-06-07T00:27:03"
isHighlight: true
sortOrder: 2
---
> ## 🍳 HarianKu — Daily Habit Companion

**Eat Right, Stay Active — One App for Both**

---

> ## Project Background

HarianKu was born from a real everyday need — many people struggle to consistently maintain healthy habits like planned meals and regular exercise, simply because there's no single tool that's simple, locally relevant, and enjoyable enough to actually use together.

This app was built as a portfolio project that also genuinely helps friends in their daily lives. The main focus is a cheerful, mobile-friendly, and form-minimal user experience — so people actually want to open it every day.

#### Problems It Solves

- Not knowing what to cook every day

- Buying ingredients already at home, only for them to go bad

- Giving up on exercise by the second week due to lack of progress tracking

- No locally relevant tools that are simple and enjoyable to use

#### Solutions

- Weekly meal planner with per-meal slots (Breakfast, Lunch, Dinner, Snack)

- Pantry stock that auto-deducts when a recipe is cooked + weekly shopping list

- Streak & reward system that motivates daily consistency

- Cheerful, mobile-first UX with minimal forms

---

> ## Key Features

#### 🍽️ Weekly Meal Planner

Schedule recipes into Breakfast, Lunch, Dinner, and Snack slots for Monday through Sunday. Comes with meal plan templates that can be assigned to specific weeks and a toggleable weekly auto-repeat feature.

#### 📖 Personal Recipe Library

Save your own recipes complete with multiple photos (reference photo + cooked result photo), custom color-coded categories, tags, optional cooking time estimate, and a 1–5 star rating after cooking.

#### 📦 Pantry Stock Management

Track ingredient stock using a fixed unit list (grams, kg, ml, liters, pieces, etc.) with optional price per unit. Stock auto-deducts when a recipe is marked as cooked, with a visual alert when ingredients are running low.

#### 🛒 Smart Shopping List

Automatically aggregates all ingredients needed from this week's meal plan, minus what's already in stock. Includes an estimated shopping cost based on ingredient prices entered.

#### 💪 Workout Tracker

Log daily workouts by type — Jogging, Gym, or Home Workout. Upload a photo as proof of completion, set a weekly target, and track your consistency with a progress bar.

#### 🔥 Streak & Reward System

Two separate streak systems — cooking streak (different recipe each day) and workout streak (upload proof daily). Earn achievement badges + AI-generated motivational messages + confetti animation when a weekly streak is completed.

#### 📸 Share Menu

Generate a playful image of your daily or weekly meal plan to share on social media. Supports two formats: 9:16 for IG Story and 1:1 for IG Feed.

#### 🤖 AI Weekly Summary

Every end of the week, Cloudflare AI generates a personal summary — a recap of meals cooked, workouts done, estimated spending, and a motivational message freshly generated each week.

#### 📅 Monthly Calendar View

A monthly calendar view showing which days have a meal plan. Tap any day to see a recipe summary and daily notes in a mobile-friendly bottom sheet.

#### 🏆 Badges & Achievements

A collectible badge achievement system. Locked badges show hint conditions to keep users motivated to earn them.

---

> ## Tech Stack

- **Framework:** Next.js 14 (App Router)

- **Styling:** Tailwind CSS

- **Database & Auth:** Supabase (PostgreSQL + Google OAuth)

- **Image Storage:** Cloudinary

- **AI:** Cloudflare Workers AI

- **Share Image:** html-to-image

- **Search:** Fuse.js (client-side fuzzy search)

- **Animation:** Framer Motion

- **Bottom Sheet:** Vaul

- **Toast:** Sonner

- **Typography:** Plus Jakarta Sans

- **Deployment:** Vercel

---

> ## Technical Highlights

1. **Unit System & Auto Stock Deduction** — Ingredient unit system with a fixed unit list and auto-conversion between compatible units (g ↔ kg, ml ↔ liter). Stock automatically deducts when a recipe is marked as cooked.

2. **Dual Streak Logic with Weekly Reset** — Two separate streak systems with different logic: cooking streak checks recipe ID uniqueness, workout streak checks for uploaded proof photos. Both reset every Monday using WIB timezone.

3. **AI-Powered Weekly Summary** — Cloudflare Workers AI generates a fresh personal motivational message every week based on the user's activity data — never cached.

4. **Dynamic Share Image Generation** — html-to-image renders a React component directly into a PNG. Supports two output formats simultaneously: 9:16 Story and 1:1 Feed.

5. **Template & Auto-Repeat Meal Plan** — Users can save a meal plan as a named template, assign it to a specific week, and enable weekly auto-repeat — all through a minimal-form UI.

6. **Configurable Admin Panel** — Admins can manage badges, rewards, starter recipes, motivational quotes, announcement banners, and workout types — all without touching the codebase.

---

> ## My Role

This project was built entirely **solo** — from ideation, product planning, and system design to full technical implementation. All architecture, UX, and feature decisions were thoroughly planned through brainstorming sessions and a detailed PRD before coding began.

- Product Manager

- UI/UX Designer

- Frontend Developer

- Backend Developer

- Database Architect

---

> ## Design Philosophy

HarianKu is designed around the principle of **"Tap, don't type"** — every interaction is optimized so users are never burdened by long forms. Built with a warm pink palette, rounded typography (Plus Jakarta Sans), and satisfying micro-animations for a delightful daily experience.

- **Tap, don't type** — Bottom sheet pickers, chip selectors, and toggles replace long forms wherever possible

- **Progressive disclosure** — Required fields shown first, the rest collapsed or clearly marked optional

- **Instant feedback** — Optimistic UI and micro-animations on every action (<100ms)

- **Helpful empty states** — Every empty page has a cheerful illustration and a clear CTA

- **Mobile-first** — Optimized for 375px–430px screens, touch targets minimum 44x44px

---

> ## Screenshots

![A image](https://res.cloudinary.com/dxlmdzryf/image/upload/v1780766760/project/1780766758_f91efaa5-8892-46bd-9568-a2712e9b0ffc.png)![A image](https://res.cloudinary.com/dxlmdzryf/image/upload/v1780766768/project/1780766768_cc6c7e36-bbd0-4d5a-a891-88ddb01e7873.png)![A image](https://res.cloudinary.com/dxlmdzryf/image/upload/v1780766779/project/1780766779_4d4c81a3-f537-4f38-a02a-d4533c913f02.png)![A image](https://res.cloudinary.com/dxlmdzryf/image/upload/v1780766787/project/1780766787_05d7d04e-ca34-4caa-ad6e-8c9f05811932.png)

![A image](https://res.cloudinary.com/dxlmdzryf/image/upload/v1780766794/project/1780766794_d437d4bd-d1fd-4ade-a35a-32b0519d4cfc.png)
