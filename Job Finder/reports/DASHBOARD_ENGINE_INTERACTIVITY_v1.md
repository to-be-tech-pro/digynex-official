# 🎮 DigyNex Dashboard Engine: Interactivity Map (V1)
**Doc Ref:** DASHBOARD_ENGINE_INTERACTIVITY_v1.md

This document maps all interactive cards and buttons in the CareerNexus Dashboard to their respective **Neural Bridge** signals and n8n Workflows.

---

## 🏗️ 1. Expert Identity Wizard
The gateway to building the Master CV.

| Element | Interaction | Neural Signal | n8n Outcome |
| :--- | :--- | :--- | :--- |
| **"Sync LinkedIn"** | Click | `LINKEDIN_SYNC_REQUESTED` | Triggers **Workflow L**. Scrapes profile data and updates Supabase. |
| **"Commit & Preview"** | Click (Final Step) | `DOC_APPROVAL_PENDING` | Triggers **Workflow D (Guardrail)**. Sends WhatsApp verification. |
| **"Back" Button** | Click | None (Local Navigation) | Navigates wizard steps. |

---

## ⚡ 2. Live Sync Cards (Main Dashboard)
Real-time status indicators and action hubs.

| Element | Interaction | Neural Signal | n8n Outcome |
| :--- | :--- | :--- | :--- |
| **"→" Arrow Button** | Click | None (UI Local) | Opens the Expert Profile Wizard. |
| **"Refresh Status"** | Click | None (DB Polling) | Re-fetches `doc_status` from Supabase to check if WhatsApp was clicked. |

---

## 🛠️ 3. Expert Manual Toolkit
Advanced actions for premium users.

| Element | Interaction | Neural Signal | n8n Outcome |
| :--- | :--- | :--- | :--- |
| **"Export CV"** | Click | `DOC_EXPORT_REQUEST` | Triggers **Workflow E**. Generates PDF and decrements `cv_limit`. |
| **"Export CL"** | Click | `DOC_EXPORT_REQUEST` | Triggers **Workflow E**. Generates Cover Letter PDF. |
| **"Neural Purge"** | Click | `ADMIN_DATA_PURGE` | Triggers **Workflow P**. Securely wipes temporary data. |

---

## 📢 4. Admin Hub (Broadcast)
Global governance for Super Admins.

| Element | Interaction | Neural Signal | n8n Outcome |
| :--- | :--- | :--- | :--- |
| **"Broadcast Info"** | Toggle On | `ADMIN_BROADCAST` | Triggers **Workflow A**. Updates global notice bar across all users. |
| **"Suspend User"** | Toggle | `ADMIN_USER_LOCK` | Directly updates Supabase RLS policies. |

---

## 🧠 Neural Pulse Logic
- **Success Tone**: Green Toast + Console `Status: 200`.
- **Failure Tone**: Red Toast + Console Retry logic enabled.
- **Diagnostic Level**: All pulses are logged with the `[NEURAL_PULSE]` prefix in the developer console.

---
