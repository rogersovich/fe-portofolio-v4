---
title: "Kalend"
summary: "<p>Kalend is a digital calendar platform for Indonesia and Malaysia that helps office workers actively plan their leaves, long weekends, and work schedules — not just look up public holidays.</p><p>The platform combines official holiday data, Javanese calendar system, planning tools (Leave Optimizer, Date Calculator, Weton Checker), and personal events in one modern interface. It also provides a Public REST API with full documentation for developers integrating holiday data into HR systems or payroll applications.</p>"
image: "https://res.cloudinary.com/dxlmdzryf/image/upload/v1780761776/project/1780761774_1016bba0-37d2-4cd8-9813-388ad862e7dc.png"
repositoryUrl: null
websiteUrl: "https://kalend.dimasroger.my.id/"
technologies:
  - "Next JS"
  - "Typescript"
  - "Tailwind"
  - "Postgresql"
  - "Supabase"
  - "Prisma ORM"
  - "Auth Google"
publishedAt: "2026-06-06T22:58:15"
updatedAt: "2026-06-07T00:28:40"
isHighlight: true
sortOrder: 1
---
> ## Project Background

Existing Indonesian digital calendars are passive — users can only check red dates without any tools to plan actively. There is no platform that combines official holidays, local calendar systems, and planning tools in one place.

Kalend was built to fill that gap. The platform helps Indonesian and Malaysian office workers actively plan their leaves, long weekends, and work schedules. It also serves developers who need reliable holiday data via REST API for HR systems, payroll, or chatbots.

Built from scratch as a solo developer in approximately 6 weeks part-time.

---

> ## Key Features

#### Indonesia & Malaysia Calendar

Year, month, and day detail views — complete with national holidays, joint leaves, and Javanese calendar system. Every page is statically generated (SSG) for optimal performance.

#### Automatic <mark>Long Weekends</mark>

All long weekend periods throughout the year are detected automatically, with filters by minimum day count (3, 4, 5+ days).

#### Leave Optimizer

A tool that recommends the best leave-taking strategy — calculating combinations with the highest holiday-to-leave ratio using minimal leave days.

#### Date Calculator

Five functions in one tool: date difference, add/subtract days, count working days in a range, day name lookup, and age calculator with next birthday countdown.

#### <mark>Weton Jawa</mark> Checker

Calculates weton and neptu based on the input date, computed entirely client-side using an anchor date algorithm — no database call required, available for the range 1900–2100.

#### Public <mark>REST API</mark>

An open API with a free tier of 100 requests per day. Developers can generate an API key from the dashboard and integrate holiday data directly into their applications. Full documentation available via Mintlify.

#### <mark>PDF Export</mark>

Monthly calendars can be downloaded as A4 landscape PDF, generated directly in the browser using @react-pdf/renderer — no server processing required.

#### User Events & Dashboard

Logged-in users can add personal events that appear on the calendar, monitor API key usage, and manage their account from an integrated dashboard.

---

> ## Tech Stack

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui

- **Backend & Database:** Supabase (PostgreSQL), Prisma ORM

- **Auth:** Supabase Auth — Google OAuth & Email/Password

- **Email:** Resend

- **PDF Generation:** @react-pdf/renderer (client-side)

- **API Docs:** Mintlify

- **Deployment:** Vercel

---

> ## Technical Highlights

- **Static Site Generation per calendar page** — every year/month combination is pre-rendered so there is no server computation per request. Target LCP under 2.5 seconds.

- **Client-side Weton algorithm** — weton and neptu are calculated using an anchor date (1 January 1900 = Minggu Wage) without storing data in the database, avoiding query overhead for a stateless feature.

- **Rate limiting via database row count** — a simple and maintainable implementation using Supabase row count on the ApiUsageLog table per api\_key per day, without additional infrastructure.

- **Multi-region holiday schema** — the Holiday model supports federal vs. regional holidays in Malaysia using a nullable regionId, allowing one schema to accommodate both countries with different data structures.

- **Admin import panel** — holiday data is managed via an admin page with JSON upload, preview before import, Add/Update modes, and a progress indicator — no direct database access needed for annual data updates.

---

> ## Challenges & Learnings

One of the biggest challenges was designing an unambiguous URL routing structure between the default Indonesian calendar and per-country calendars in Next.js App Router. The final decision to consistently use a country prefix (`/id/2026`, `/my/2026`) resolved potential conflicts between dynamic segments.

Building the Leave Optimizer also required a careful algorithmic approach — computing all leave day combinations that maximize the holiday ratio, then sorting by efficiency, within a reasonable client-side execution time.

On the product side, this project reinforced the importance of defining MVP scope strictly from the start. With more than 13 features in the PRD, disciplined prioritization between must-have and nice-to-have was key to finishing within a realistic timeline.

---

> ## Outcome

- Platform is live and publicly accessible

- Public API with complete documentation, ready for developer use

- Core Web Vitals meet targets: LCP < 2.5s, CLS < 0.1, INP < 200ms

- Codebase structured with scalable folder conventions for Phase 2 feature additions

---

> ## Screenshots

![A image](https://res.cloudinary.com/dxlmdzryf/image/upload/v1780762444/project/1780762441_6b9c4776-85d7-449a-8e44-87c2f9e64686.png)![A image](https://res.cloudinary.com/dxlmdzryf/image/upload/v1780762466/project/1780762466_17c9c265-da99-4d2a-877c-f8854b745a25.png)![A image](https://res.cloudinary.com/dxlmdzryf/image/upload/v1780762482/project/1780762482_32bb9ad8-6b7e-4369-9fc5-7d6e7d9ed808.png)![A image](https://res.cloudinary.com/dxlmdzryf/image/upload/v1780762489/project/1780762489_90cd2b7b-745b-4353-a82f-c5ca0efb2912.png)
