# 🏗️ DigyNex n8n: Master Workflow Library (V13.3 - Bulletproof)
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

## ⚡ Step 6: Executor Pipeline (QUICK_APPLY / JOB_APPLY)
This is the core workforce of the neural engine. It handles both manual "Normal Applies" and automated "Quick Applies".

**Standardized Processing Chain:**
1.  **Signal Input:** Receives job context and user identity.
2.  **Quota Fetch:** Retrieves real-time `cv_limit` and `plan_type` from Supabase.
3.  **Neural Quota Auditor (V13.8):** 
    - Analyzes tier limits.
    - Determines if the apply is **INSTANT** or needs **STRATEGIC QUEUING**.
4.  **Logical Split (If Node):**
    - **TRUE Path (Dispatch):** Sends application to ATS + Logs `SUCCESSFUL_APPLY` + **Decrements `cv_limit`**.
    - **FALSE Path (Queue):** Logs `JOB_QUEUED` with a `pending` status for Step 7 processing.

**Logic Engine (Neural Quota Auditor V13.8):**
```javascript
const profile = $json; 
const now = new Date();
const planType = profile.plan_type || 'free';
const role = profile.role || 'staff';
let plan = (planType === 'pro' || planType === 'growth') ? 1 : 0;
if (planType === 'elite' || role === 'super_admin') plan = 2;
const balance = profile.cv_limit || 0;

if (plan < 2 && balance <= 0) {
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

## 🕒 Step 7: DigyNex Neural Cron: Global Strategic Dispatcher (V1.0)
The "Invisible Force" that handles queued applications during optimal recruiter peak hours.

**Operational Sequence:**
1.  **Cron Trigger (00:01 AM):** Daily wake-up call to scan for pending tasks.
2.  **Fetch Pending Buffer:** `SELECT * FROM user_activity WHERE action = 'JOB_QUEUED' AND details->>'status' = 'pending'`.
3.  **Neural Delay Engine:** 
    - Calculated wait time to ensure dispatch occurs between **06:00 AM and 08:30 AM**.
    - Randomized "Jitter" (5-10 mins) between applications to bypass bot detection.
4.  **Identity Hydration:** Fetches latest profile data to ensure `doc_status` is still "Verified".
5.  **Kinetic Dispatch:** Calls the ATS endpoint with saved payload from the `details` field.
6.  **Cycle Completion:** 
    - Updates `user_activity` status to `processed`.
    - Decrements user `cv_limit` via Supabase Update.

**Guardrail:** If a user manually applies and hits zero before the Cron runs, the Cron skips that user to prevent negative quota.

---

## 🔱 Summary of Data Mapping
All nodes MUST use `{{ $node["UI Signal Webhook"].json.body }}` as the root to ensure stability even if intermediate nodes change.
