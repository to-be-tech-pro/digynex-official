# DigyNex Job Finder: Surgical Development Gaps
**Status:** Unified Strategic Roadmap (V8.5)

This document tracks the critical deltas between the current modular UI and the high-fidelity commercial production target.

## 1. Core JAAAAS Engine (High Priority)
- [ ] **Neural CV Ingestion:** Replace current mock data in `aiService.js` with real OpenAI/n8n PDF parsing logic to extract Master JSON.
- [ ] **ATS Stealth Mode:** Implement 1px black-line masking for special keywords within CV section separators to bypass top-tier ATS filters.
- [ ] **Multilingual Engine:** Implement logic to auto-tailor CV professional experience into the target country's language (German/Swedish/etc).
- [ ] **Gotenberg HD PDF:** Switch from basic HTML-to-Canvas to LaTeX-quality Gotenberg PDF generation.

## 2. Monetization & Guardrails
- [ ] **Quota Engine Implementation:**
    - [ ] **Tier 1 (Free):** 2 CVs/week. Lock after 14 days.
    - [ ] **Tier 2 ($19):** 6 CVs/week (Max 3/day). 15 Keyword limit.
    - [ ] **Tier 3 ($49):** Unlimited Access + Neural Suggester.
- [ ] **Success Signal Counter:** Add the "Applications Left" visual counter to the `DashboardHub`.
- [ ] **Stripe Transactional Bridge:** Connect the "Upgrade" signals to a live Stripe Checkout flow.

## 3. Admin Command Center
- [ ] **Real-time Revenue Telemetry:** Track Stripe revenue directly in the Admin Hub.
- [ ] **AI Cost Indexing:** Track OpenAI/Gemini token consumption per user to monitor margins.
- [ ] **System Maintenance Toggle:** Implementation of the "Global Maintenance/Recalibration" lock switch.
- [ ] **User Pagination:** High-scale user management UI.

## 4. Compliance & Stability
- [ ] **Legal Document Content:** Replace placeholders with professional English for Privacy, Terms, and Refund policies.
- [ ] **GDPR Auto-Expiry Workflow:** n8n logic to purge user assets/PDFs from the server after 14 days of inactivity.
- [ ] **Robust Error States:** "Neural Sync Failed" UI alerts for API/n8n connection drops.

---
**Last Updated:** 2026-04-14
**Authority:** DigyNex Strategic Oversight
