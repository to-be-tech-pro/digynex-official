# 🏗️ DigyNex n8n: Master Workflow Library (V16.9 - Bulletproof)
**Doc Ref:** N8N_MASTER_WORKFLOW_LIBRARY.md
**Logic:** Explicit Node Referencing (Ensures data is always fetched from the root Webhook)

---

## 🛠️ Step 1: The Neural Switch
Routes root signals. No changes needed here.

---

## 🚀 Step 2: Executor Pipeline (JOB_APPLY)
Uses explicit referencing for ATS submission.

```json
{
  "nodes": [
    {
      "parameters": {
        "method": "POST",
        "url": "https://httpbin.org/post",
        "sendBody": true,
        "bodyParameters": {
          "parameters": [
            { "name": "applicant_email", "value": "={{ $node[\"UI Signal Webhook\"].json.body.user_id }}" },
            { "name": "job_role", "value": "={{ $node[\"UI Signal Webhook\"].json.body.details.role }}" },
            { "name": "company", "value": "={{ $node[\"UI Signal Webhook\"].json.body.details.company }}" }
          ]
        }
      },
      "name": "Send Application to ATS",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.1,
      "position": [1100, -100]
    }
  ]
}
```

---

## 🛰️ Step 3: Guardrail Engine (Telegram Approval)
Uses explicit referencing for messaging.

```json
{
  "nodes": [
    {
      "parameters": {
        "chatId": "YOUR_CHAT_ID",
        "text": "=🚀 **DigyNex AI: Approval Required**\n\nHello! Our AI is ready to submit your application for:\n\n📍 **Role:** {{ $node[\"UI Signal Webhook\"].json.body.details.role }}\n🏢 **Company:** {{ $node[\"UI Signal Webhook\"].json.body.details.company }}\n\nPlease review your documents. If everything looks good, reply **YES** to this message to initiate the expert submission.",
        "additionalFields": { "parse_mode": "Markdown" }
      },
      "name": "Telegram: Guardrail Approval",
      "type": "n8n-nodes-base.telegram",
      "typeVersion": 1,
      "position": [1100, 400]
    }
  ]
}
```

---

## 📊 Step 4: Quota Logger (CV_EXPORT)
Uses explicit referencing for identification and decrementing.

```json
{
  "nodes": [
    {
      "parameters": {
        "operation": "getMany",
        "table": "profiles",
        "filters": {
          "conditions": [
            {
              "key": "email",
              "value": "={{ $node[\"UI Signal Webhook\"].json.body.user_id }}"
            }
          ]
        }
      },
      "name": "Supabase: Fetch Current Quota",
      "type": "n8n-nodes-base.supabase",
      "typeVersion": 1,
      "position": [1100, 150]
    },
    {
      "parameters": {
        "operation": "update",
        "table": "profiles",
        "id": "={{ $node[\"Supabase: Fetch Current Quota\"].json.id }}",
        "data": {
          "cv_limit": "={{ $node[\"Supabase: Fetch Current Quota\"].json.cv_limit - 1 }}"
        }
      },
      "name": "Supabase: Decrement Quota",
      "type": "n8n-nodes-base.supabase",
      "typeVersion": 1,
      "position": [1300, 150]
    }
  ]
}
```

---

## 📢 Step 5: Broadcast Engine (ADMIN_BROADCAST)
Synchronizes global alerts across the frontend and notifies the team.

```json
{
  "nodes": [
    {
      "parameters": {
        "operation": "update",
        "table": "system_config",
        "selectType": "buildManually",
        "mustMatch": "anySelectCondition",
        "selectConditions": {
          "conditions": [
            {
              "key": "key",
              "value": "global_broadcast"
            }
          ]
        },
        "data": {
          "value": "={{ $node[\"UI Signal Webhook\"].json.body.details }}"
        }
      },
      "name": "Supabase: Sync Global Broadcast",
      "type": "n8n-nodes-base.supabase",
      "typeVersion": 1,
      "position": [1100, 600]
    },
    {
      "parameters": {
        "chatId": "YOUR_ADMIN_CHAT_ID",
        "text": "=📢 **DIGYNEX GLOBAL BROADCAST**\n\n**Status:** {{ $node[\"UI Signal Webhook\"].json.body.details.active ? '🔴 ACTIVE' : '⚪ INACTIVE' }}\n**Type:** {{ $node[\"UI Signal Webhook\"].json.body.details.type.toUpperCase() }}\n\n**Message:**\n{{ $node[\"UI Signal Webhook\"].json.body.details.message }}\n\n*Strategic Pulse: Neural Master Hub*",
        "additionalFields": {
          "parse_mode": "Markdown"
        }
      },
      "name": "Telegram: Broadcast Log",
      "type": "n8n-nodes-base.telegram",
      "typeVersion": 1,
      "position": [1300, 600]
    }
  ]
}
```

---

## ⚡ Step 6: Executor Pipeline (Workflow E: APY-AUTO-APPLY V16.9)
**Strategic Goal:** Stealth form-filling via Apify Actors to bypass bot detection.

**Operational Parameters:**
- **Trigger:** `QUICK_APPLY` / `JOB_APPLY` signals from Vue.js.
- **Identity Source:** Supabase `profiles` (Verified PDF + Resume JSON).
- **Execution Engine:** Apify `contact-form-submitter` or Custom Puppeteer Actor.

### 🛠️ Execution Logic (The Neural Handshake)
1.  **Identity Enrichment (Supabase):** 
    - Fetch the user's **Verified PDF URL** from `storage.objects`.
    - Fetch the **Cover Letter** and **Basic Info** from the `profiles` table.
2.  **Apify Handshake (HTTP Request):**
    - Dispatch a POST request to Apify API.
    - **Payload:**
      ```json
      {
        "url": "{{$json.job_url}}",
        "proxy": { "useApifyProxy": true },
        "formFields": {
          "name": "{{$json.fullName}}",
          "email": "{{$json.email}}",
          "cv_url": "{{$json.pdf_url}}",
          "message": "{{$json.cover_letter}}"
        }
      }
      ```
3.  **Atomic Quota Audit (Post-Success):**
    - **SQL Query:** `UPDATE profiles SET cv_limit = cv_limit - 1 WHERE email = '{{$json.email}}'`
    - Ensures no quota leakage even with multi-session activity.
4.  **Mobile Confirmation:** Send WhatsApp: "Elite Dispatch: Your application for {Role} at {Company} is COMPLETE. 🚀"

**Logic Engine (Neural Quota Auditor V13.8):**
```javascript
const profile = $json; 
const now = new Date();
const planType = (profile.plan_type || 'free').toLowerCase();
const role = (profile.role || 'user').toLowerCase();

let plan = (planType === 'pro' || planType === 'growth') ? 1 : 0;
if (planType === 'elite' || role === 'super_admin') plan = 2;

const balance = profile.cv_limit || 0;

// ELITE/ADMIN: Instant Dispatch (Step 2)
if (plan >= 2) return { status: 'DISPATCH_INSTANT', ui_type: 'success', next_available: 'Available Now' };

// FREE/PRO: Check Balance
if (balance <= 0) {
    let nextDate = new Date();
    if (plan === 0) { // Free: Next Monday Reset
        const day = now.getDay();
        const diff = (day === 0 ? 1 : 8 - day);
        nextDate.setDate(now.getDate() + diff);
        nextDate.setHours(0, 1, 0, 0); 
    } else { // Pro/Growth: Tomorrow 06:00 AM Strategic Window
        nextDate.setDate(now.getDate() + 1);
        nextDate.setHours(6, 0, 0, 0);
    }
    return { status: 'QUEUE_STRATEGIC', ui_type: 'info', next_available: nextDate.toLocaleString('en-GB') };
}

return { status: 'DISPATCH_INSTANT', ui_type: 'success', next_available: 'Available Now' };
```

---

## 🕒 Step 7: DigyNex Neural Cron: Global Strategic Dispatcher (V13.5 - Bulletproof)
The "Invisible Force" that handles queued applications during optimal recruiter peak hours.

**Operational Sequence:**
1.  **Cron Trigger (00:01 AM):** Daily wake-up call to scan for pending tasks.
2.  **High-Performance Buffer Fetch:** Uses `pending_strategic_queue` View.
3.  **Neural Prioritization (Top Matches First):** 
    - Sorts the queue by **`match_score` DESC**.
    - This ensures the jobs that fit the user best are applied for first within their daily limit.
4.  **Manual-to-Queue Intercept:** 
    - If a user manually clicked apply but was over-limit, the frontend sent it here with `status: 'pending'`. 
    - These are processed alongside automated matches.
5.  **Strategic Delay:** 
    - AI determines the target country's timezone.
    - Waits until **08:00 AM** local time before starting the submission.
6.  **Action:** Sequentially triggers **Step 6 (Headless Executor)**.
7.  **Finalization:** 
    - Updates `user_activity` status to `processed`.
    - Decrements `cv_limit` in the `profiles` table.
    - Sends WhatsApp: "Elite Pulse: Your top matches have been dispatched! 🚀"

---

## ⚡ Step 8: Global Verification Handshake (Workflow D: GUARDRAIL)
This is the "Neural Gateway" that prevents unauthorized job applications.

### **The Mobile Protocol (WhatsApp Handshake)**
1.  **Incoming Pulse**: Detects `DOC_APPROVAL_PENDING`.
2.  **Payload Security**: Must extract `user_phone`, `role`, and `company` from the `details` object.
3.  **The Message Window**:
    -   If 24h window is open: Send **Free Text** message.
    -   If 24h window is closed: Call **WhatsApp Template** (`cv_approval_request`).
4.  **The Intercept**:
    -   n8n waits for **User Reply (Wait Node)**.
    -   If reply contains **"YES"** (Case Insensitive): 
        -   **DB UPDATE**: `profiles.doc_status = 'Verified'`.
        -   **UI SYNC**: Sends a confirmation message: "Identity Verified 🛡️. Global Submission Unlocked."
    -   If reply contains **"NO"**: 
        -   **DB UPDATE**: `profiles.doc_status = 'Draft'`.

---

## 🕵️ Step 9: Workflow G (Neural Job Scraper V15.0 - Final Sequential)
**Strategic Goal:** Professional Global Discovery with zero-drift cache-first persistence.

**Operational Parameters (Adzuna/Careerjet):**
- **Results Per Page:** 10 (Surgical focus to minimize payload weight).
- **Pagination Sync:** Matches the Frontend "4-by-4" or "10-by-10" lazy loading requirement.
- **Cache TTL:** 24 Hours (Global pooling).

**Sequence of Actions (Strict Serial Order):**
1.  **Incoming Request:** Receives `q` (keyword), `country`, `email`, and `city`.
2.  **Step 1: Code: Map Country (The Neural Mapper):**
    - **Logic:** 
      ```javascript
      const inputKeyword = $node["Webhook: Job Request"].json.query.q || '';
      const inputCountry = $node["Webhook: Job Request"].json.query.country || 'sweden';
      const inputCity = $node["Webhook: Job Request"].json.query.city || '';
      // Construction: Ensure 100% cache accuracy
      const searchKey = `${inputKeyword}_${countryCode}_${inputCity}`.replace(/__+/g, '_');
      ```
3.  **Step 2: Check Supabase (The Cache Trap):** 
    - Queries `job_scrapes` table where `search_key = {{ $json["search_key"] }}`.
    - **Logic:** If data exists and is < 24h old, serves the **Shared Intelligence** cache instantly.
4.  **Step 3: HTTP Fetch (Adzuna/Careerjet):**
    - Dispatches HTTP Request to the selected provider.
    - **Query Params:** `what: {{$json["keyword"]}}`, `where: {{$json["city"]}}`.
5.  **Step 4: Save & Format:** 
    - Save the fresh array directly to Supabase `job_scrapes` with the new `search_key`.
    - **Data Purity:** Ensure results are stored as a pure JSONB array.
6.  **Step 5: Final Response:** Return the formatted JSON to the Vue.js client.

---

## 🔱 Global Discovery Strategy (Data Pooling)
- **Shared Intelligence:** If multiple users search the same role in the same region, the system serves the **Shared Cache**. This mathematically reduces API consumption as the user base grows.
- **Neural Matching:** High-intent jobs (Score >= 95%) are flagged for Step 6 (Headless Executor) status: `queued`.

---

## 🔱 Summary of Global Integration
- **Root Webhook**: Must always use `{{ $node["UI Signal Webhook"].json.body }}`.
- **Signal Integrity**: All signal data flows into Section 7 (The Dispatcher) for final queuing.
- **Production URL**: `https://n8n.digynex.se/webhook/neural-bridge`

---
