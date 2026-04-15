# 🎮 DigyNex Job Finder: UI Interactive Master Catalog (V11.0)
**Doc Ref:** DASHBOARD_ENGINE_INTERACTIVITY_v11.0 (Neural Master Sync)
**Status:** PRODUCTION COMPLETE

This document serves as the single source of truth for every interactive component within the DigyNex universe. It maps every button, card, and trigger to its technical logic and backend Ripple Effect.

---

## 🏗️ 1. Global Core Mechanics

### A. Neural Toggle (Maintenance Mode)
- **UI:** Gold toggle in `AdminHub.vue`.
- **Logic:** Persists `maintenance_mode` setting to `system_config` table.
- **Ripple:** Broadcasts a real-time signal to all active users via Supabase Realtime, immediately locking the UI with a "System Recalibration" overlay.

### B. Strategic Action Hub (`handleDashboardAction`)
- **UI:** Central dispatcher in `App.vue`.
- **Logic:** Every major button (Apply, Tailor, Sync) passes an `actionId` through this controller.
- **Enforcement:** Checks `plan_type` quotas (Weekly/Daily) from the backend `masterConfig` before dispatching signals.

---

## 🏠 2. The Main Dashboard (Discovery Hub)

### A. Matches Hub (Job Cards)
- **Card Click:** Opens `JobDetailOverlay.vue`.
- **Quick Apply Button:** 
    - **Logic:** `handleDashboardAction('quick_apply')`.
    - **Tier Check:** Requires available quota.
    - **Action:** Dispatches job ID to n8n Signal Dispatcher for automation.

### B. Analytics Card (The "Pulse")
- **Skill Gap Radar:** Visual representation of user profile vs. market demand.
- **Recalibrate Button:** 
    - **Logic:** Triggers `ExpertProfileWizard`.
    - **Action:** Resets neural vectors for a fresh profile analysis.

### C. Real-time Notification Bed
- **Bell Icon:** Toggles the "Signal Pulse" popup.
- **Item Click:** Navigation trigger. If it's a job alert, it deep-links directly to the `JobDetailOverlay`.

---

## 🎨 3. CV Studio: Identity Orchestration

### A. Template Gallery Carousel
- **UI:** Snap-scrolling horizontal cards.
- **Button: Maximize:** Opens a high-fidelity zoom view of the specimen.
- **Logic:** Updates reactive `selectedTemplate` id.

### B. Neural Keyword Vault (Stealth Hub)
- **UI:** Dynamic keyword chips.
- **Button: Add Keyword:** 
    - **Tier Gate:** Free users limited to 5 manual keywords.
    - **Action:** Injects ATS Stealth Masking (1px Black-Line) into the PDF structure.

### C. Live HD Viewport (Master Preview)
- **UI:** Auto-scaling A4 preview.
- **Logic:** Real-time HTML→PDF simulation using Gotenberg architecture.
- **Button: Export PDF:** Triggers `pdfService.js`. Checks tier permissions before compilation.

---

## 🛡️ 4. Neural Master Control (Admin Dashboard)

### A. Financial Telemetry Cards
- **Logic:** Visualizes MRR, Active Subscribers, and AI Burn. 
- **Button: Refresh:** Pulls latest metrics from Supabase analytics view.

### B. Strategic Engine Config (V6.5)
- **UI:** Card-based JSON editor for Tier Logic.
- **Logic:** Edit Weekly limits, Daily caps, and Prices per tier.
- **Button: COMMIT CHANGES:** 
    - **Action:** Upserts `tiered_quotas` JSON to `system_config`.
    - **Ripple:** All active users immediately adhere to the new quotas without app restart.

### C. Active Specimen Management (User Table)
- **Button: Tier Override (Sparkles):** Opens mini-popup to promote users to Pro/Elite.
- **Button: Identity Edit:** Manual profile override.
- **Button: Freeze Specimen:** Toggles account suspension.

---

## ⚡ 5. Executive CTA Overlays

### A. Founder's Pass Shimmer
- **Button: Establish Neural Link:**
    - **Logic:** Redirects to Stripe Checkout (Owner set one-time link).
    - **Action:** Triggers "Lifetime" plan upgrade.

### B. Tier Upgrade Popups
- **Logic:** Dynamic conversion funnels.
- **Action:** Redirects to Stripe Subscription Portal ($19/$49).

---

**Authority:** DigyNex Strategic Oversight | **Prepared By:** Antigravity AI
**Strict Rules:** Verified Modular Separation | **Engine Version:** V11.0 Neural Sync
