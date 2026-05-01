# CareerNexus: Ultimate Unified Blueprint (2026)
**Version:** V16.9 (The Hyper-Local Pulse)
**Status:** DEFINITIVE PRODUCTION MASTER — FULLY SYNCHRONIZED

This is the **Single Source of Truth** for the DigyNex Neural Engine. It consolidates all technical nuances, backend scripts, and frontend interactivity logic into one massive operative document.

---

## 🏛️ 1. Core JAAAAS Engine & CV Studio (Status: ⚡ Neural Active)
- [x] **Neural CV Ingestion (Step 3):** Bridge `aiService.js` to strategic extraction logic.
- [x] **ATS Stealth Mode (The "Magic" Line):** 
    - [x] **Injection:** 1px black-line keyword masking embedded in CV section separators.
    - [x] **Neural Glow:** Interactive glow effect in CV Studio when line-injection is active (Tier 3).
    - [x] **Indicator:** "AI Stealth Divider Active" dynamic status message in CV Studio viewport.
- [x] **AI Suggester Hub:** 
    - [x] UI section for AI-driven keyword suggestions based on target job description.
    - [x] **Tier Check:** Explicit "Upgrade to Pro for AI Keywords" gate for Tier 1 users.
- [x] **Multilingual Logic:** Auto-tailor experience and summary content into 16 Core Global Locales.
- [x] **Neural Density Balancer (V12.9.2):** Enforces 2-page professional standard with smart font scaling.
- [x] **Identity Override Engine (V13.0):** Supports distinct application emails and SMTP bridging.

---

## 💰 2. Monetization & Tier Enforcement (plan_type: 0, 1, 2)
### Tier Logic Guardrails:
- [x] **Tier 1 (Free):** 2 CVs/week. Access to Basic Colors (Black, Blue, Grey).
- [x] **Tier 2 ($19/mo):** 6 CVs/week (Daily Cap: 3). Access to Pro Palettes.
- [x] **Tier 3 ($49/mo):** Unlimited Access. AI Keywords + Neural Suggester Enabled.
- [x] **Founder's Lifetime Pass ($149):** Strategic FOMO slot counter + shimmer CTA.

---

## 🔗 3. The 7-Step n8n Neural Ecosystem (Backend Master Map)
| Step | Action ID | n8n Workflow | Strategic Goal | Status |
| :--- | :--- | :--- | :--- | :--- |
| Step 1 | `UI_SIGNAL` | **Master Switch** | Central signal routing hub. | ✅ COMPLETE |
| **Step 2** | `RECALIBRATE` | **Workflow R** | AI-driven skill profile optimization. | ⏳ PENDING |
| **Step 3** | `DOC_INGEST` | **Workflow J** | PDF-to-JSON Neural Mapping. | ✅ COMPLETE |
| **Step 4** | `PURGE` | **Workflow P** | GDPR-compliant 14-day asset cleanup. | ✅ COMPLETE |
| **Step 5** | `STRIPE_SYNC` | **Workflow S** | Syncing billing status to plan_type. | ⏳ PENDING |
| **Step 6** | `JOB_APPLY` | **Workflow E** | Headless Auto-Submit (Puppeteer). | ✅ **WIRED** |
| **Step 7** | `SCRAPE` | **Workflow G** | 24h Surgical Cache Discovery. | ✅ **ACTIVE** |

---

## 🌎 4. Global Discovery: Workflow G (The Surgical Scraper)
**Status:** ✅ **PROD READY (Hybrid Integration Active)**
**Objective:** Zero-drift cache-first discovery with 100% Global coverage.

### **The Technical Operation (Hybrid Engine):**
1.  **Incoming Trigger:** User Search (`ENTER` key) dispatches a webhook signal.
2.  **Surgical Cache Audit:** Queries `job_scrapes` for `{keywords}_{country}` match. (Cost: $0 API Hits).
3.  **Hybrid Provider Matrix (If Cache Miss):**
    -   **Tier 1 (Major 20):** **Adzuna V1** (High-fidelity detailed structured data).
    -   **Tier 2 (Global Reach):** **Careerjet V4** (Covers 90+ Countries like Maldives, Uzbekistan, Ireland).
    -   **Tier 3 (Professional Vectors):** 
        -   **Apify (LinkedIn/Indeed Scrapers):** High-fidelity enterprise data extraction.
        -   **SerpAPI (Google Jobs):** Universal universal coverage for niche regions.
    -   **Provider Select Logic:** If country in Adzuna -> Adzuna. Else if in Careerjet -> Careerjet. Else -> Google Jobs.
4.  **Neural Translation Bridge:** 
    -   **Translation Engine:** On-the-fly translation of specimens into any target language (Uzbek, Dhivehi, French, etc.) via AI integration.
    -   **Strategy:** "Apply anywhere, in any language, with local-standard fidelity."
5.  **Action Persistence:** Saves fresh scrape to `job_scrapes` for future user sharing.

### **4.5. Hyper-Local Satellite Strategy (The City Precision):**
- **Dynamic Variable Injection**: ✅ DISPATCHED. `city` parameter synchronized across Frontend (v-model), Job Service (URL Params), and n8n (Query Params).
- **Provider Mapping**:
    - **Adzuna**: `where={city}`
    - **Careerjet**: `location={city}`
- **Neural Expansion Logic**: If city-level results < 5, the engine automatically triggers a second "Country-Wide Burst" and returns a combined payload with a `expansion_notice` flag.
- **UI Logic**: Displays "Satellite Focus: {City}" with a "View Country-Wide Pulse" toggle if total matches across the region exceed city matches.

---

## 🤖 5. Master Workflow Details (The Scripts)

### **A. Workflow E: Headless Auto-Apply (Puppeteer)**
**Status:** ⏳ **ENVISIONED (Frontend Wired / n8n Script Pending)**
*Performed after Workflow D mobile verification.*
```javascript
const { url, userData } = items[0].json;
const puppeteer = require('puppeteer');
const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.goto(url, { waitUntil: 'networkidle2' });
// Neural Mapping: Injects fullName, email, and verified CV PDF.
await page.type('input[name*="name"]', userData.fullName);
const fileInput = await page.$('input[type="file"]');
if (fileInput) await fileInput.uploadFile('/tmp/verified_cv.pdf');
await page.click('button[type="submit"]');
await browser.close();
```

### **B. Workflow Q: Global strategic Dispatch (The 08:00 AM Cron)**
- **Trigger:** Daily at `00:01`.
- **Logic:** Sorts `user_activity` by `match_score` (Top matches first).
- **Execution:** Determines target timezone and waits until **08:00 AM local time** before triggering Step 6.

### **C. Workflow J: Neural CV Ingestion**
- **Engine:** Gemini 1.5 Pro.
- **Action:** Transforms raw PDF text into a structured JSON Master Identity (Experiences, Skills, Bio).

---

## 🕹️ 6. UI Button & Signal Mapping (The Cheat Sheet)
| Frontend Component | Interaction | Neural Signal | n8n Outcome |
| :--- | :--- | :--- | :--- |
| **"Apply Now" (Matches)** | Click | `QUICK_APPLY` | Instant dispatch to Puppeteer Executor. |
| **"Search Bar" (Matches)** | `ENTER` | `JOB_SCRAPE_REQUEST` | Triggers 24h Scraper / Cache Lookup. |
| **"Commit & Preview"** | Click | `DOC_APPROVAL_PENDING` | Initiates WhatsApp Guardrail Verification. |
| **"Export CV" (Toolkit)** | Click | `DOC_EXPORT_REQUEST` | Generates PDF specimen + Deducts Quota. |
| **"Sync LinkedIn"** | Click | `LINKEDIN_SYNC_REQUESTED` | Dispatches Scrapers to build identity from URL. |

---

## 🛡️ 7. Guardrail Rules & System Governance
1.  **Verification Rule:** No application is dispatched unless `doc_status === 'Verified'`.
2.  **Trust Window:** Verification status expires after 30 days or upon major `resume_data` mutation.
3.  **Data Purity:** All logging signals MUST use pure JSONB objects. Never stringify payload blobs.
4.  **Admin Override:** Super Admins (Tier Alpha: 8580) can force-verify any account or reset quotas.

---

## 📋 Production Checklist (Status Sync)
- [x] **Neural Scraper (V16.8)** - Sequential logic with Surgical Fallback deployed.
- [x] **AI Auto-Suggestion Layer** - Role prediction and spelling correction active.
- [x] **Global Discovery Engine** - Dynamic country unlock enabled.
- [x] **City Satellite Focus** - Surgical precision wiring COMPLETED.
- [x] **Global Neural City Discovery** - Dynamic API-driven search ACTIVE.
- [x] **Hard Validation Guardrail** - Country-match verification ACTIVE.
- [ ] **Stripe Gateway** - Production keys pending.

---
**Authority:** DigyNex Strategic Oversight | **Prepared By:** Antigravity AI
**Final Update:** 2026-04-26 | **Aesthetic Status:** V16.9 Global Neural Discovery Focus
