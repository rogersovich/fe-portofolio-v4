---
title: "Dashboard PLN"
summary: "<p>I build and implemented a multi-role management system (Super Admin, Vendor, and Approval Committees), featuring real-time S-curve analytics, a 3-level e-signature workflow, and Excel integration</p>"
image: "https://res.cloudinary.com/dxlmdzryf/image/upload/v1780664623/project/1780664622_18c8f6e5-041e-434f-8218-fb0904a5517d.png"
repositoryUrl: null
websiteUrl: null
technologies:
  - "Vue "
  - "Pinia"
  - "Postgresql"
  - "Laravel"
  - "Vuetify"
publishedAt: "2025-04-13T20:41:12"
updatedAt: "2026-06-07T00:13:59"
isHighlight: false
sortOrder: 5
---
> ### Project Background

As Indonesia’s state-owned electricity company, **PLN** manages hundreds of infrastructure projects nationwide. The challenge? Different stakeholders—internal teams, vendors, and approval committees—required varying levels of access to project data. Manual reporting and approval processes were slow, error-prone, and inefficient.

That’s where the **PLN Dashboard** came in—a centralized, role-based project management system I developed from scratch as a **Full Stack Developer**.

---

> ### The Challenge: Multiple Roles, One System

The system had to accommodate **four distinct user roles**, each with unique permissions:

1. **Super Admin** – Full system control (user management, audit logs, global settings).

2. **Vendor** – Limited to assigned projects (submit progress reports, upload documents).

3. **Approval Committee** – Three-tier authority (Level 1: Field → Level 2: Regional → Level 3: HQ).

4. **Project Admin** – Oversee project health, generate reports, and track milestones.

**Problem:**

- A vendor should **never** see another vendor’s data.

- Approvers needed **sequential e-signatures** (Level 1 → 2 → 3).

- Super Admins required **real-time audit trails**.

**Solution:**

- **JWT Role-Based Access Control (RBAC)** ensured strict data segregation.

- **Workflow Automation** prevented approval skipping (e.g., Level 2 couldn’t sign before Level 1).

- **Activity Logs** tracked every change (who, when, and what was modified).

---

> ### Key Features & Implementation

**1️⃣ Dashboard Module: Real-Time Project Insights**

The dashboard provided an **executive overview** of all projects, featuring:

- Live Metrics:

    - ✔ **Active Projects** (e.g., "152 ongoing")

    - ✔ **Completion Rate** (progress bars per project)

    - ✔ **On-Progress vs. Finished** (color-coded for quick scanning).

- Advanced Data Visualization:

    - 📊 **S-Curve Reports** (performance trends over time) – Built with **ApexCharts.**

    - 🗓️ **Milestone Timelines** (Gantt-style tracking).

*Performance Optimization:*

Initial data loading took **8+ seconds** due to unoptimized PostgreSQL queries. After adding **indexing** and **caching**, load times dropped to **1.2 seconds**.

---

**2️⃣ Project Management Module**

This module allowed granular control over projects, including:

- **Smart Filtering & Search**

    - Filter by: Status (Active/Delayed/Completed), Region, Budget.

    - Dynamic column sorting (e.g., sort by "Deadline" or "Vendor").

- **Approval Workflow**

    - **3-Level E-Signature Flow** (with PDF audit trails).

    - Automated email/Slack notifications at each stage.

- **Bulk Operations**

    - 📤 **Import/Export** (Excel/CSV) for mass updates.

    - 🔄 **Auto-Sync** with PLN’s legacy SAP system.

*Impact:*

- Reduced approval delays from **2 weeks → 3 days**.

- Eliminated **80% of manual data entry errors**.

---

> ### Tech Stack

Frontend: Vue.js + Pinia (state management)

Data Visual: Chart.js

Backend: Laravel

Database: PostgreSQL

Auth: JWT

---

> ### Lessons Learned

- Perfomance matters

    - **Problem:** Initial dashboard loads were sluggish.

    - **Fix:** Implemented **lazy loading** for charts and **pagination** for project lists.

- User Experience > Fancy features

    - Vendors struggled with complex filters.

    - Added **tooltips** and a "Quick Search" bar.

- Expect Edge Cases

    - Some approvers tried to **skip levels**.

    - Solution: Added **sequential approval validation**.

---

> ### Screenshot

![A image](https://res.cloudinary.com/dxlmdzryf/image/upload/v1780664609/project/1780664604_338ac7b9-da4f-4a34-b6c2-1cd0e42db683.png)

![A image](https://res.cloudinary.com/dxlmdzryf/image/upload/v1780664673/project/1780664673_d01e39df-25dc-4be8-ba47-856d9a39ad06.png)

![A image](https://res.cloudinary.com/dxlmdzryf/image/upload/v1780664688/project/1780664688_75b6c7cc-6598-417c-b97b-5cd6605a82e5.png)

![A image](https://res.cloudinary.com/dxlmdzryf/image/upload/v1780664717/project/1780664716_2c86ee9a-08c8-4ec0-abdf-18679ada7b8c.png)

![A image](https://res.cloudinary.com/dxlmdzryf/image/upload/v1780664730/project/1780664730_d620e3a0-22e5-430b-a9e2-4657fd9a1ade.png)

![A image](https://res.cloudinary.com/dxlmdzryf/image/upload/v1780664742/project/1780664741_f4a7cc85-2c2a-4b38-86b5-4f42e677e1f7.png)

![A image](https://res.cloudinary.com/dxlmdzryf/image/upload/v1780664753/project/1780664753_ce8b2a77-68d5-45ff-b4a4-97d5cfc73d12.png)
