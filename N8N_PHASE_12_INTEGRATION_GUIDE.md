# 🚀 DigyNex TMS/CRM - n8n Phase 12 Integration Guide
**Status:** DRAFT | **Focus:** Global Partner & Lead Ingestion Ecosystem

මෙම මාර්ගෝපදේශය මගින් අපගේ වෙබ් අඩවියේ (Landing Page) සිට සහ Dashboard එකේ සිට එන සියලුම අළුත් දත්ත (Leads/Partners) n8n හරහා සජීවීව දැනුම්දීම් (Alerts) සහ Database එකට ඇතුල් කිරීම සිදු කරයි.

---

## 🏗️ Workflow 1: Global Partner Application (අළුත් හවුල්කරුවන් ලියාපදිංචිය)
මෙමගින් වෙබ් අඩවියේ පල්ලෙහා ඇති "Partnership Program" form එකෙන් එන දත්ත process කරයි.

### Node 1: Webhook (Partner Webhook)
- **HTTP Method:** `POST`
- **Path:** `partner-registration`
- **Respond:** `Using 'Respond to Webhook' Node`

### Node 2: WhatsApp / Telegram (Admin Alert)
- **Recipient:** Amila (Admin)
- **Message:** 
  ```text
  🤝 DigyNex: New Partner Application!
  Name: {{ $json.body.name }}
  Country: {{ $json.body.country }}
  Email: {{ $json.body.email }}
  Company: {{ $json.body.company || 'N/A' }}
  Status: Pending Review
  ```

### Node 3: Supabase (Upsert Partner)
- **Operation:** `Insert`
- **Table:** `partners`
- **Data to Send:**
  - `name`: `{{ $json.body.name }}`
  - `email`: `{{ $json.body.email }}`
  - `phone`: `{{ $json.body.phone }}`
  - `company_name`: `{{ $json.body.company }}`
  - `status`: `pending`

---

## 🏗️ Workflow 2: Lead Ingestion Engine (ක්ලයන්ට් ලියාපදිංචිය)
මෙමගින් වෙබ් අඩවියේ ඇති "Get Started" හෝ "Contact" buttons වලින් එන Leads හසුරුවයි.

### Node 1: Webhook (Lead Webhook)
- **HTTP Method:** `POST`
- **Path:** `lead-ingestion`
- **Respond:** `Using 'Respond to Webhook' Node`

### Node 2: WhatsApp (Instant Alert)
- **Message:** 
  ```text
  🔥 New Potential Client Lead!
  Name: {{ $json.body.name }}
  Product: {{ $json.body.product }}
  Phone: {{ $json.body.phone }}
  Email: {{ $json.body.email }}
  Requirement: {{ $json.body.requirement }}
  ```

### Node 3: Supabase (Insert Client)
- **Operation:** `Insert`
- **Table:** `clients`
- **Data:**
  - `name`: `{{ $json.body.name }}`
  - `email`: `{{ $json.body.email }}`
  - `phone`: `{{ $json.body.phone }}`
  - `status`: `Lead`

---

## 🏗️ Workflow 4: Security Identity Alert (භාරකාර පද්ධතිය)
මෙමගින් Dashboard එකේ කවුරුහරි Personnel identity එකක් වෙනස් කළහොත් Admin හට දැනුම් දෙයි.

### Node 1: Webhook (Identity Webhook)
- **HTTP Method:** `POST`
- **Path:** `identity-alert`

### Node 2: Telegram (Security Node)
- **Message:** 
  ```text
  ⚠️ SECURITY ALERT: DigyNex 360
  Event: Identity Index Updated
  Updated By: Manager/Admin
  Node Impacted: Personnel Hub
  Action: Review required in Dashboard.
  ```

---

## 🛡️ Critical Security Settings for n8n
1.  **Webhook Authentication:** සෑම Webhook එකකටම `Header Auth` හෝ `Secret Token` එකක් දාන්න. (Check: `DIGYNEX_OFFICIAL_SECURITY_GUIDANCE.md`)
2.  **Environment Variables:** Supabase Keys කිසිම වෙලාවක "Plain Text" විදිහට Nodes ඇතුලේ තියන්න එපා. Credentials මගින් පමණක් භාවිතා කරන්න.
3.  **Respond to Webhook:** සෑම workflow එකකම අන්තිමට `Success: true` යනුවෙන් Response එකක් යවන්න.

---

මචං, මේ ගයිඩ් එක බලලා ඔයාට ඒ Node එකින් එක n8n එකේ හදන්න පුළුවන්. ඕනෑම උදව්වක් ඕනේ නම් කියන්න! 🚀
