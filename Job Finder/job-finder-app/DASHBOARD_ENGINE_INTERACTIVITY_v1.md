# DigyNex Dashboard: Engine Interactivity (2026)

**Version:** V2.0 (The Unified Interaction Model)
**Status:** PRODUCTION STABLE

This document maps every UI interaction in the Dashboard to its underlying Neural Engine logic and n8n outcomes.

---

## ⚡ 1. Matches Hub (Neural Discovery & Action)

| Element | Interaction | Neural Signal | n8n / Backend Outcome |
| :--- | :--- | :--- | :--- |
| **"Apply Now"** | Click | `QUICK_APPLY` | Dispatches to **Workflow B (Router)** -> **Workflow E (Executor)**. |
| **Search Input** | `ENTER` | `JOB_SCRAPE_REQUEST` | Checks `job_scrapes` cache first. If miss, triggers **Workflow G (Scraper)**. |
| **"Tailor"** | Click | `DOC_TAILOR_REQUEST` | AI rebuilds CV keywords based on specific Job Description. |

---

## 🤖 2. Workflow E: The Neural Execution Logic (V3.0 Agentic Prep)

| Logic Layer | Specification | Strategic Outcome |
| :--- | :--- | :--- |
| **Trigger Signal** | Webhook (Neural Bridge) | Zero-latency dispatch to headless executor. |
| **Quota Gate** | `cv_limit > 0` | Prevents over-utilization of the neural engine. |
| **Sidecar Engine** | **Browserless (ws://browserless:3000)** | Offloads rendering for 100% stability.<br>- **Execute Command:** Runs `node /automation/apply_script.js` (Transitioning to Phase 3 AI Agent).<br>- **Parse Result:** Extracts JSON status. |
| **Sequential Routing** | **If Node Logic** | Prevents parallel execution bugs. Ensures Gemini Vision only runs if Puppeteer declares SUCCESS. |

### **Response Matrix**
- **`SUCCESS`**: Triggers **Gemini Vision** to visually verify the screenshot. If verified, Increments `applications_count`, **Decrements `cv_limit` (Charge)**, notifies User (WA/TG with Screenshot).
- **`MANUAL_REQUIRED`**: Bypasses Gemini. Notifies user via WA/TG to "Finalize Manually" on the external site. **(No Charge)**.
- **`ERROR`**: Fallback routing. Triggers Admin Alert for dev audit. **(No Charge)**.

---

## 📋 3. System Governance Rules
- **Lazy Loading:** UI renders 4 cards initially to conserve API data.
- **Global Data Pooling:** Always checks system cache before hitting external APIs.
- **Neural Density Balancer:** Enforces professional PDF standards during generation.
- **Quota Feedback:** Export/Apply buttons auto-disable when `cv_limit` < 1.

---

## 🛠️ 4. Phase 4.5: Signal Bridge Stabilization (May 13, 2026)

| Optimization | Status | Technical Outcome |
| :--- | :--- | :--- |
| **Identity Hydration** | `COMPLETE` | Resolved `unknown@user.com` via multi-tier fallback (Auth + Profile + UI). |
| **Omnipresent Payload** | `COMPLETE` | Synchronized flat & wrapped JSON structures for universal n8n node compatibility. |
| **CORS Proxy Tunnel** | `COMPLETE` | Re-routed all signals through `/data-sync` to prevent browser-side body stripping. |
| **Navigation Fail-safe**| `COMPLETE` | Implemented fallback URL logic to prevent Puppeteer protocol crashes. |

---

**Authority:** DigyNex Neural Oversight | **System Logic:** V25.3 Sovereign Shield Stable
_Last Updated: May 13, 2026_
