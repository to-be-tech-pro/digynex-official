# 🚀 DigyNex Viral Hub: N8N Workflow Implementation Guide

> [!IMPORTANT]
> **Dynamic SMTP Placement (Workflow 2):** Add the SMTP Node immediately after the "Approved" branch in Workflow 2. Ensure it fetches its credentials from the `organizations` table using the `{{ $json.org_id }}` (as outlined in Workflow 3 below).

---

**Status:** DRAFT | **Focus:** AI Automated Lead Generation & Dual-Channel Approval Ecosystem

මචං, මේක තමයි අපි අලුතින් හදපු "AI Social Viral Hub" (BI Dashboard) එකෙන් එන දත්ත අරගෙන n8n හරහා Leads හොයන සහ Telegram හරහා Approve කරන සම්පූර්ණ workflow එක. මේක බලාගෙන ඔයාට n8n එකේ nodes ටික පිළිවෙලට හදාගෙන යන්න පුළුවන්.

---

## 🏗️ Workflow 1: Daily Target Ingestion & AI Scraping (උදෑසන Lead සෙවීම)

මෙමගින් උදේ 8.00 ට BI Dashboard එකේ "7-Day Matrix" එකෙන් දවසේ Keyword එක අරගෙන, සමාජ ජාල වලින් Leads හොයාගෙන AI එකෙන් message එකක් ලියලා Telegram එකට Approve කරන්න යවනවා.

### Node 1: Schedule Trigger (Cron Job)

- **Schedule:** `Everyday at 8:00 AM`
- **Purpose:** දවසට අදාල scraping process එක පටන් ගන්න.

### Node 2: Supabase (Fetch Daily Strategy)

- **Operation:** `Get Many`
- **Table:** `viral_matrix_settings`
- **Purpose:** අද දවසට (e.g., Monday) අදාල `keyword` සහ `volume_limit` එක (`is_active = true`) Database එකෙන් ෆිල්ටර් කරලා එලියට ගන්න.

### Node 3: 'Set' Node (Real Manual Data Injection)

- **Node Type:** `Set` (හෝ Code Node)
- **Purpose:** අර මුලින් තිබ්බ බොරු "Mock Scraper" එකයි "Parse JSON" එකයි "Limit" එකයි සම්පූර්ණයෙන්ම අයින් කරන්න. ඒවගේ බොරු Data වෙනුවට මෙතන Set Node එකක් දාලා, ඔයාගේ යාළුවෝ 5 දෙනෙක්ගේ ඇත්ත විස්තර (නම, කම්පැණි එක, LinkedIn URL එක) Array එකක් විදිහට එකතු කරන්න. මෙතනින් අපිට සම්පූර්ණ System එකම ඇත්තටම ටෙස්ට් කරන්න පුළුවන්.

### Node 3.5: HTTP Request (Hunter.io Data Enrichment)

- **Node Type:** `HTTP Request`
- **Method:** `GET`
- **URL:** `https://api.hunter.io/v2/email-finder`
- **Parameters:** Query Parameters විදිහට මේ ටික යවන්න:
  - `company`: `{{ $json.company }}`
  - `first_name`: `{{ $json.first_name }}`
  - `last_name`: `{{ $json.last_name }}`
  - `api_key`: `ඔයාගේ Hunter.io API Key එක` (⚠️ දැනට ටෙස්ට් කරන්න Query එකේ දැම්මට, Production යද්දි මේක අනිවාර්යයෙන්ම n8n Credentials Vault එකට දාලා Secure කරන්න ඕනේ!)
- **Purpose:** මේක තමයි Data Enrichment. යාළුවන්ගේ නමයි කම්පැණි එකයි දීලා එයාලගේ සැබෑ Business Email එක Hunter කෙන් අදිනවා. ඊට පස්සේ ඒ සැබෑ Email එක Database එකට Save කරලා අගදි මැසේජ් එක යවනවා.

### Node 4: AI Agent / HTTP Request (Gemini API - Copywriter)

- **Model:** `gemini-1.5-pro` (හෝ අදාල AI node එක)
- **Prompt:**
  ```text
  You are an elite Sales Copywriter for DigyNex. Look at this LinkedIn/FB profile data: {{ $json.profiles }}
  1. Write a compelling, very short direct message in English to pitch our SaaS.
  2. Calculate an 'intent_score' (1-100) based on how likely they are to buy.
  ```
- **Purpose:** Lead ගේ විස්තර කියවලා හොදම Message එකයි, Probability Score එකයි (Eg: 85%) හදන්න.

### Node 5: Omni-Channel Approval Dispatch (Telegram & WhatsApp)

- **Purpose:** Telegram Group එකට විතරක් නෙවෙයි, Dashboard එකේ අපි Config කරපු WhatsApp Execs ලා දෙන්නටත් (Exec 1 & Exec 2) Approval Message එක යවන්න.
- **Node 5.1 (Telegram Bot):**
  - **Chat ID:** `{{ $json.telegram_group_id }}` (BI එකෙන් එන ID එක)
  - **Message:** "🤖 AI Draft Message..." 
  - **Buttons:** Inline Approval Buttons (✅ Approve, ♻️ Regenerate, ❌ Reject).
- **Node 5.2 (WhatsApp Business API / Meta - Exec 1):**
  - **Phone Number:** `{{ $json.wa_node_1 }}`
  - **Message / Template:** Telegram එකට යවන Message එකම WhatsApp Interactive Buttons (Approve / Reject) එක්ක.
- **Node 5.3 (WhatsApp Business API / Meta - Exec 2):**
  - **Phone Number:** `{{ $json.wa_node_2 }}`
  - **Message / Template:** අදාල Lead එකේ විස්තර සහ Approval Buttons එක්ක.

---

## 🏗️ Workflow 2: Approval Webhook Receiver (Telegram Click Action)

මෙමගින් අර යවපු Telegram message එකේ කවුරුහරි "✅ Approve" Button එක click කලොත් ඒක අල්ලගෙන අදාල Lead එකට Message එක යවලා CMS Database එක Update කරනවා.

### Node 1: Webhook (The Safest Way for Production)

- **HTTP Method:** `POST`
- **Path:** `/viral-hub-approval`
- **Respond:** `Immediately Respond` (අනිවාර්යයි)

_(සටහන: ඔයාගේ n8n UI එකේ `http://localhost:5678` කියලා පෙන්නුවත් බයවෙන්න එපා. ඔයාගේ ඇත්ත URL එක `https://n8n.digynex.se` නිසා, මේ Webhook එකේ නියම URL එක වෙන්නේ: `https://n8n.digynex.se/webhook-test/viral-hub-approval`)_

### Node 2: Switch Node (Check Action Type)

- **Property 1 (`approve`):** `{{ $json.body.callback_query.data }} == '{"action":"approve"}'` (හරි JSON property එක match කරන්න)
- **Property 2 (`regenerate`):** `{{ $json.body.callback_query.data }} == '{"action":"regenerate"}'`
- **Property 3 (`reject`):** `{{ $json.body.callback_query.data }} == '{"action":"reject"}'`

### Node 3 (If Approve): Send Email (Gmail/SMTP) හෝ WhatsApp Node

- **Node Type:** `Send Email` හෝ `WhatsApp Business`
- **Purpose:** අර අමාරුවෙන් එකතු කරපු "Get Settings", "Get many rows" සහ "HTTP Request (Facebook)" කියන Nodes ඔක්කොම සම්පූර්ණයෙන්ම Delete කරලා දාන්න. ඒ වෙනුවට Switch එකේ Approve පැත්තෙන් මේ Node එක දාලා ඔයාගේ Database එකේ තියෙන අර Apollo එකෙන් හොයාගත්ත ඇත්ත Email එකට (හෝ Number එකට) කෙලින්ම AI ලියපු Message එක යවන්න.

### Node 4 (If Approve): Supabase (Update Processed Lead)

- **Operation:** `Update` (Insert නෙවෙයි, මොකද Lead කලින්ම DB එකේ ඉන්න නිසා).
- **Match By:** `id` සමානයි `{{ $node["Code in JavaScript"].json.lead_id }}`
- **Fields to Update:**
  - `status`: `Approved and Contacted`
  - `authorized_by`: `{{ $json.body.callback_query.from.first_name }}`

### Node 5 (If Approve): Telegram (Update Original Message)

- **Operation:** `Edit Message Text`
- **Chat ID:** `{{ $node["Webhook"].json.body.callback_query.message.chat.id }}`
- **Message ID:** `{{ $node["Webhook"].json.body.callback_query.message.message_id }}`
- **New Text:**
  ```text
  ✅ APPROVED & SENT TO CRM by {{ $json.body.callback_query.from.first_name }}
  ```
- **Purpose:** අර මුල් මැසේජ් එක update කරනවා Button ටික අයින් කරලා Approve කරලා Email එක ගියා කියලා පෙන්නන්න.

---

## 🏗️ Workflow 3: Dynamic Multi-Tenant Email Gateway (SaaS Optimization)

දැන් හැම client ගෙම email යන්නේ අපේ Gmail එකෙන් නෙවෙයි. BI Dashboard එකේ "Integrations" ටැබ් එකේ client සෙට් කරන SMTP settings (Host, Port, User, Pass) n8n එකට අරගෙන ඒකෙන් email එක යවන විදිහ මෙන්න.

### 📍 Placement in Workflow 2 (Lead Dispatch):
**Workflow 2** එකේ, "Approved" path එකේ AI copy එක FB/LinkedIn වලට යවන්න කළින් (හෝ පස්සේ), මේ SMTP Node එක දාලා client ගේ settings හරහා email එක මෙතනින් යවන්න.

### Node 1: Supabase (Fetch Org Email Settings)
-   **Operation:** `Get`
-   **Table:** `organizations`
-   **ID:** `{{ $json.org_id }}` (මෙතන lead එකේ අයිතිකාර org එකේ ID එක දෙන්න).
-   **Purpose:** අදාල client ගේ SMTP credentials ටික database එකෙන් ඇදලා ගන්න.

### Node 2: SMTP Node (Dynamic Configuration)
-   **Node Type:** `SMTP`
-   **Connection Type:** `Manual Configuration`
-   **Host:** `{{ $node["Supabase"].json.smtp_host }}`
-   **Port:** `{{ $node["Supabase"].json.smtp_port }}`
-   **User:** `{{ $node["Supabase"].json.smtp_user }}`
-   **Password:** `{{ $node["Supabase"].json.smtp_pass }}`
-   **From Name:** `{{ $node["Supabase"].json.email_from_name }}`
-   **From Email:** `{{ $node["Supabase"].json.email_from_address }}`
-   **Purpose:** Client ගේම සැබෑ business mail එකකින් white-label විදිහට email යැවීම.

---

## 🛡️ Critical Points for Workflow Execution

1. **Telegram Webhooks:** Telegram bot එක හදලා ඒකේ webhook eka n8n 'Workflow 2' එකේ url එකට සෙට් කරන්නම ඕනේ. (`https://api.telegram.org/bot<TOKEN>/setWebhook?url=<N8N_URL>`)
2. **Database Link:** CMS එකේ Sales Dashboard එකට පෙන්නන්න ඕනේ නිසා, 'Workflow 2' එකේ 'Node 4' (Supabase Insert) එක හරියටම CMS Data schema එකට match වෙන්න ලියන්න.
3. **Redundancy Validation:** එක lead එකක් දෙපාරක් යන්නේ නැති වෙන්න DB එකේ `prevent_duplicates` logic එකක් හරි Unique ID එකක් හරි අනිවාර්යයෙන් තියාගන්න.

---

## 📝 Current Status & Next Steps (Paused Session Checkpoint)

**Project Stage:** Implementing n8n Workflow 1 & Workflow 2 with Multi-tenant Supabase Integration (Solution 2 - Enterprise DB Route).

✅ **What We Just Finished:**
✅ **What We Just Finished:**
1. **Supabase Schema Updates:** Modified `viral_matrix_settings` and `organizations` (Added dynamic SMTP columns).
2. **Multi-tenant Integration UI:** Added "Integrations" tab to `SettingsView.vue` for customers to configure their own SMTP/Gateway settings.
3. **Linked Backend:** UI fully synchronized with Supabase for one-click gateway configuration.

▶️ **Where We Paused (Next Immediate Steps For Next Session):**
* **In Workflow 2:** Test the Webhook + Switch logic for real-world approval dispatch.
* **In Workflow 3 (Dynamic SMTP):** Implement the **Fallback Logic** (using DigyNex Master if Org Settings are empty).
* **AI Stability Fix:** Configure timeouts (60s) and error-branching in Gemini nodes to prevent the "Busy/Hanging" issue.

*(Note: We will continue exactly from testing the Workflow 1 Database Insert and the JSON button payload fix when we resume! 🔥)*

---

මචං, මේ ගයිඩ් එක බලාගෙන ඔයාට Workflow 1 සහ Workflow 2 විදිහට n8n පැත්තේ වැඩේ හදාගෙන යන්න පුළුවන්. හදද්දි කොතනම හරි හිර උනොත් එහෙමම්ම මගෙන් අහන්න, මම Code එක/Logic එක හදලා දෙන්නම්! 🚀

---

## 🛠️ Data Enrichment & Scraper Tools (Free Tiers for Testing & Scaling)

Client ලා එන්න කලින් අපිට System එක ඇත්තටම දුවවන්න පාවිච්චි කරන්න පුළුවන් Free Tools ලිස්ට් එකක් මෙන්න:

### 1. Data Enrichment API (Lead ගේ Email/Phone හොයන ක්‍රම)
*   **Apollo.io:** ගොඩක් දුරට ලෝකේ හොඳම එක. Free Account එක හැදුවම මාසෙට **Credits 50 ක්** නිකන් දෙනවා. අනිවාර්යයෙන්ම අපි පලවෙනියට මේක පාවිච්චි කරන්නේ මේකයි.
*   **Hunter.io:** මෙයාලා මාසෙට **Free Searches 25 ක්** දෙනවා. (Apollo එකේ නැත්තම් Fallback එකට මේකට යමු).
*   **Lusha / Snov.io:** Lusha එකෙන් Email වලට වඩා Phone Numbers හොයාගන්න ලේසියි. මාසෙට Credits 5ක් දෙනවා. Snov.io එකෙන් මාසෙට Credits 50ක් දෙනවා.

### 2. Lead Scrapers (LinkedIn / FB වල Leads එකතු කරන ක්‍රම)
*   **Apify.com:** මෙයාලගේ Free Account එක හැදුවම හැම මාසෙම **$5 ක Free Credits** දෙනවා හැමදාටම! මේ $5 න් අපිට මාසෙකට Leads 500කට වඩා ලේසියෙන්ම Scrape කරගන්න පුළුවන් (Google Maps, LinkedIn).
*   **Browse AI:** මෙයාලත් මාසෙට Tasks 50ක් Free දෙනවා. Custom Website තියෙනවනම් Scrape කරන්න මේකත් පාවිච්චි කරන්න පුළුවන්.
