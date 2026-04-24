## 🏛️ 1. Expert Identity Wizard (The Master Entry Point)
| Component | Action | Signal/Trigger | Engine Outcome |
| :--- | :--- | :--- | :--- |
| **Identity Step 1** | Form Input | Local Profile Ref | Updates `masterProfile` state for real-time reactivity. |
| **"Sync LinkedIn"** | Button Click | `LINKEDIN_SYNC_REQUESTED` | Triggers **Workflow L**. Dispatches scrapers to build identity from LinkedIn URL. |
| **Experience/Skills** | "Add/Remove" | Array Mutation | Directly syncs with Supabase `profiles.resume_data` via `profileService`. |
| **"Commit & Preview"** | Button Click | `DOC_APPROVAL_PENDING` | Triggers **Workflow D (Guardrail)**. Initiates mobile verify handshake. |
| **"Back" Button** | Click | State Pointer | Navigates steps in the Vue wizard flow. |
| **"Cancel Verify"** | Click | DB State Update | Resets `doc_status` to 'Draft'. Unlocks the profile for editing. |

---

## ⚡ 2. Live Sync Cards (Main Intelligence Hub)
| Card/Button | Interaction | Logic Engine | Dashboard Response |
| :--- | :--- | :--- | :--- |
| **Neural Glow Dot** | Auto-Render | `doc_status` Check | Pulsing Gold = Verified 🛡️. Grey = Pending ⏳. |
| **"→" Arrow (Identity)** | Click | Tab Switcher | Fast-tracks the user into the Expert Profile Wizard. |
| **"Refresh Status"** | Icon Click | Supabase Polling | Re-syncs status without page reload if user verified via phone. |
| **Status Card (Text)** | Dynamic Text | Locale Ingestion | Displays "Status: Verified" or "Identity Draft" based on DB state. |

---

## 🌎 3. Matches Hub (Neural Discovery Stream)
| Element | Interaction | Neural Signal | n8n / Backend Outcome |
| :--- | :--- | :--- | :--- |
| **Search Input** | Press `ENTER` | `JOB_SCRAPE_REQUEST` | **NEW:** Checks `job_scrapes` first (24h Cache). If miss, hits Adzuna/Careerjet. |
| **Search Icon** | Click | Same as ENTER | Dispatches search request to Neural Hub. |
| **Country Filter** | Click | State Filter | Pivots the discovery context to the selected region/Adzuna parameter. |
| **Job Result Card** | Click | Detail Overlay | Hydrates `selectedJob` ref to show full description/meta. |
| **"Apply Now"** | Button Click | `QUICK_APPLY` | Dispatches job details to **Workflow E (Executor)** for headless submission. |
| **"Tailor"** | Button Click | `DOC_TAILOR_REQUEST` | Triggers AI to rebuild resume keywords for the specific job post. |

---

## 🛠️ 4. Expert Manual Toolkit (Premium Context)
| Toolkit Action | Interaction | Engine Pulse | n8n / Local Outcome |
| :--- | :--- | :--- | :--- |
| **"CV (PDF)"** | Button Click | `DOC_EXPORT_REQUEST` | Deducts 1 Quota unit. Generates High-Fidelity Master PDF. |
| **"CL (Letter)"** | Button Click | `DOC_EXPORT_REQUEST` | Generates context-aware Cover Letter PDF. |
| **"Magic Wand"** | Icon Toggle | AI Suggester | Injects AI-optimized keywords into the spec based on JD. |
| **"Neural Purge"** | Button Click | `ADMIN_DATA_PURGE` | Triggers **Workflow P**. Wipes all temporary PDF specimens. |

---

## 🧬 5. Dashboard Internal Governance
- **Lazy Loading (4-by-4):** Matches the user's scroll speed. Only renders 4 cards initially to conserve memory and API data.
- **Global Data Pooling:** Searches across the entire system's cache before hitting external APIs (Maximizes performance, Zero cost).
- **Quota Feedback:** If `cv_limit` < 1, the export buttons auto-disable and trigger a "Quota Exceeded" Neural Toast.
- **System Sync:** High-trust indicators ensure 100% data parity between the Dashboard UI and Supabase Realtime vault.
