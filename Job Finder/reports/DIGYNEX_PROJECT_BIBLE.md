# 🌌 DigyNex Job Finder: The Neural Project Bible (V18.6)
**"Job Apply Automation as a Service" (JAAAAS)**

This document is the definitive **Technical Design Document (TDD)** and Single Source of Truth for the DigyNex Neural Engine. It is designed for high-trust maintenance and architectural scaling.

---

## 🏛️ 1. ARCHITECTURAL OVERVIEW
The system operates on a **"Neural Pulse"** model, where the frontend captures intent and the backend (n8n + Puppeteer) executes high-fidelity automation in a headless environment.

| Component | Technology | Role |
| :--- | :--- | :--- |
| **Frontend** | Vue.js 3 + Vite | User Identity & Focus Hub |
| **Database** | Supabase (PostgreSQL) | Identity Vault & Activity Ledger |
| **Automation** | n8n | Strategic Signal Router |
| **Execution** | Puppeteer + Browserless | Headless Application Engine |
| **Intelligence** | Gemini 1.5 Flash/Pro | Visual Verification & Parsing |

---

## 📂 2. FOLDER STRUCTURE (The Anatomy)

| Path | Purpose |
| :--- | :--- |
| `/src/views` | High-fidelity UI Hubs (Matches, Dashboard, Profile). |
| `/src/services` | Logic layers for Quota, Profile, and Supabase sync. |
| `/backend-services` | Core automation scripts (The Engine). |
| `/reports` | Strategic blueprints, checkpoints, and TDDs. |
| `/automation` | (Production only) Mounted volume for scripts & screenshots. |

---

## 🗄️ 3. DATABASE SCHEMA (Supabase Vault)

### **Table: `profiles`**
_The identity core for every candidate._
- `id`: UUID (Primary Key)
- `email`: String (Unique)
- `full_name`: String
- `cv_limit`: Integer (Current application quota)
- `plan_type`: Integer (0: Free, 1: Pro, 2: Elite)
- `doc_status`: String (Draft, Pending_Approval, Verified)

### **Table: `user_activity`**
_The neural ledger tracking every signal._
- `id`: BigInt
- `user_id`: UUID (FK to profiles)
- `action`: String (e.g., `JOB_APPLY`, `SUCCESSFUL_APPLY`)
- `details`: JSONB (Metadata: Role, Company, URL, Results)
- `status`: String (pending, processed, error)

---

## 🔌 4. API & WEBHOOK REGISTRY

| Endpoint | Method | Workflow | Strategic Goal |
| :--- | :--- | :--- | :--- |
| `/webhook/neural-bridge` | POST | Workflow B | Master Router: Signal traffic control. |
| `/webhook/headless-executor` | POST | Workflow E | Executor: Auto-apply form filling. |
| `/webhook/temp/:filename` | GET | Image Proxy | Serves application screenshots to AI. |

---

## 🤖 5. THE NEURAL PROTOCOLS

### **A. Adaptive Jitter (V18.6)**
To bypass anti-bot detection, the system implements a randomized wait window (45s - 180s) before every application dispatch.

### **B. Gemini-Vision (Planned)**
The system takes a full-page screenshot after submission and dispatches it to Gemini AI for 100% visual success confirmation.

### **C. Post-Charge Quota**
Quotas are deducted **only** upon a confirmed `SUCCESS` signal, ensuring the product feels premium and fair to the user.

---

## 🛠️ 6. SETUP & MAINTENANCE
1. **Environment**: Ensure `.env` contains `VITE_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.
2. **Server**: Run `docker-compose up -d` to spin up n8n and Browserless.
3. **Deployment**: All scripts must be located in `/automation/` for n8n to execute correctly.

---

**© 2026 DigyNex Official. Confidential Architectural Registry.**
