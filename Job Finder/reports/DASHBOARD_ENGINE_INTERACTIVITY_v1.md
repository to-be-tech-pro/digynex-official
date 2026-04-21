# DASHBOARD_ENGINE_INTERACTIVITY (V1.0 - Production)

This document defines the step-by-step neural signal propagation when a user interacts with the DigyNex Dashboard UI.

---

## ⚡ Core Interactivity Mapping

### 1. QUICK APPLY / NORMAL APPLY ⚡
- **User Action:** Clicks the Flash icon (⚡) or Standard Apply button.
- **Frontend Phase:** 
  1. Calls `quotaService.canPerformAction(profile, 'QUICK_APPLY')`. 
- **Neural Phase (n8n):**
  1. **Auditor Pulse:** Checks for available `cv_limit`.
  2. **Success (Instant):** Dispatches to ATS immediately.
  3. **Depleted (Strategic):** Logs to `JOB_QUEUED` table. User sees "Application Queued for Optimal Time" toast.
  4. **Cleanup:** Decrements `cv_limit` ONLY on instant success.

### 2. TAILOR CV & COVER LETTER (Neural Synthesis) 🪄
- **User Action:** Clicks "Tailor Context" (🪄) in the job detail view.
- **Frontend Phase:**
  1. Checks `tier.ai_magic` authorization.
  2. If Pass: Opens `SynthesisReview` overlay.
  3. Clicking "Approve & Dispatch" calls `quotaService.canPerformAction(profile, 'CL_EXPORT')`.
- **Neural Phase (n8n):**
  1. Receiver: `Neural Signal Switch` (Output 1).
  2. Action: Logs Synthesis event and decrements `cv_limit`.

### 3. FOUNDER PASS UPGRADE (Revenue Gateway) 💎
- **User Action:** Clicks "Upgrade" or any "Quota Reached" nudge.
- **Frontend Phase:**
  1. Triggers `handleDashboardAction('upgrade')`.
  2. Opens the `FounderPassOverlay` (Persistent center-screen modal).
- **Neural Phase:** (Passive) Analytics tracking of upgrade intent in `user_activity`.

### 4. STRATEGIC COUNTRY SELECTOR (Targeting) 🌍
- **User Action:** Adds a country in the Matches lab.
- **Frontend Phase:**
  1. Checks `quotaService.getCountryLimit(plan_type)`.
  2. Blocks addition if limit (1 for Free, 3 for Pro) is reached.
  3. UI Toast: "Quota Reached: Upgrade for global expansion."

---

## 🛠️ Internal Status Reference

| Status | UX Feedback | Neural Action |
| :--- | :--- | :--- |
| `DISPATCH_INSTANT` | Success Toast (Green) | Immediate ATS Submission |
| `QUEUE_STRATEGIC` | Info Toast (Blue) | Store in `user_activity` for Step 7 Cron |
| `LIMIT_REACHED` | Warning Toast (Amber) | Forced Upgrade Nudge |
| `VERIFICATION_REQ` | Guardrail Toast (Purple) | Trigger WhatsApp/Telegram Handshake |

---
**Custodian:** DigyNex Neural Core (2026)
