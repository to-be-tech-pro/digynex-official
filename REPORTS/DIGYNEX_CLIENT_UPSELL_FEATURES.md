# 🚀 DigyNex 360: Premium Client Features & Upsell Roadmap

මෙම ගොනුව වෙන් කර ඇත්තේ DigyNex පද්ධතිය සඳහා අනාගතයේදී සහ දැනටමත් සැලසුම් කර ඇති **"Premium Features"** සහ **"Client Integration Ideas"** ලියා තබා ගැනීමටයි. 
ඔබට Client කෙනෙක් එක්ක කතා කරද්දී, "අපි මේ වගේ දියුණු වැඩ කෑලි හදලා තියෙනවා/හදනවා" කියලා පෙන්නන්න මේ Points ටික පාවිච්චි කරන්න පුළුවන්.

---

## 1. Social Media Engine: "Bring Your Own API" (BYO-API) Architecture 🔗
**Client ට විකුණන විදිහ:** "ඔයාගේ Facebook Page එකේ හරි LinkedIn එකේ හරි Access අපි අපේ සර්වර් වල තියාගන්නේ නෑ. ඔයාටම පුළුවන් ඔයාගේ API Keys අපේ සිස්ටම් එකට ගහන්න."

- **Feature එක:** DigyNex Dashboard එක ඇතුලේ අලුත් "Integrations / Settings" පිටුවක් හදනවා.
- **ක්‍රියාවලිය:** 
  - Customer ට පුළුවන් එයාලගේම Facebook Graph API Token එකයි, LinkedIn Data එකයි මේ Integrations Page එක හරහා Enter කරන්න.
  - ඒ Keys ටික Secure විදිහට Customer ගේ Supabase Account එකේ Save වෙනවා.
  - අපේ n8n AI Engine එකෙන් Leads හදලා, Approve කලාට පස්සේ, අර Customer දීපු ඇත්තම API අරගෙන එයාලගේම Page එකෙන්/Profile එකෙන් පණිවිඩය (DM) යවනවා.
- **වාසිය:** 100% Privacy සහ White-labeling. (Client ගේ කස්ටමර්ස්ලට පේන්නේ හරියටම Client ගේ Account එකෙන් Message ආවා වගේ).

### 🛠️ Real API Integration Plan (Technical Notes)
මෙය Enterprise මට්ටමින් ක්‍රියාත්මක කිරීම සඳහා අවශ්‍ය පියවර:

1. **Meta Developer App (For FB):**
   - අපේ Meta App එකට `pages_manage_posts` සහ `pages_read_engagement` (හෝ messaging සඳහා අවශ්‍ය) Permissions ලබාගත යුතුයි.
   - Customer ගේ Page එක ලින්ක් කළ පසු ලැබෙන Page Access Token එක Supabase එකේ සේව් කරගත යුතුයි.

2. **LinkedIn Developer App:**
   - පුද්ගලික profile තුලින් ක්‍රියාත්මක වීමට `w_member_social` ද, Company page සඳහා `w_organization_social` Permissions අත්‍යාවශ්‍යයි.
   - LinkedIn Access Token / API Keys ලබාගෙන එයද DB එකේ ගබඩා කළ යුතුයි.

3. **Supabase Schema වෙනස්කම්:**
   - `clients` හෝ `user_settings` Table එකට අලුත් අත්‍යාවශ්‍ය Fields එකතු කිරීම: `client_id`, `fb_access_token`, `li_access_token`.

4. **Dynamic n8n Workflows:**
   - **Lead Generation:** ලැබෙන Lead එක අයිති කුමන Customer ටද යන්න `client_id` එක මගින් හඳුනාගැනීම.
   - **Approval & Post:** Telegram එකේ "Approve" බොත්තම එබූ විට, n8n එකෙන් පළමුව Supabase වෙත ගොස් අදාල `client_id` එකට අදාළ Token එක ලබාගෙන, එම Token එකම පාවිච්චි කරමින් Facebook/LinkedIn වලට Actual Post/DM එක යැවීම.

### 🏢 Multi-Tenant SaaS Architecture (Pitching to Clients)
**Client ට විකුණන විදිහ:** "අපේ පද්ධතිය ඇතුලේ Clients ලා දහස් ගණනක් හිටියත්, කිසිම කෙනෙක්ගේ දත්ත (Leads හෝ Messages) එකිනෙකාට පැටලෙන්නේ නෑ. සියලුම Automation ක්‍රියාවලිය සිද්ධ වෙන්නේ තත්පරයෙන් තත්පරයට Update වෙන Dynamic Security Chain එකක් හරහා."

- **Siloed Lead Tracking:** n8n එකෙන් උදෑසන AI මගින් අලුත් Lead එකක් හොයාගත් වහාම, එම Lead එකට අදාළ Customer / Client ව (`client_id` එක මඟින්) Database එකේ ලියාපදිංචි කෙරේ.
- **Secure Payload Tunneling:** Client ගේ Phone එකට Telegram / WhatsApp හරහා එන "Approve" බොත්තම තුළම, අදෘශ්‍යමානව එම Lead එකට අදාළ Unique ID ලබාදේ (Inline callback data: `{"lead_id": "12345"}`).
- **Autonomous Sync Engine (100% Zero-Touch Integration):**
  - Customer විසින් වරක් BI Dashboard (Viral Hub) එකේ අලුත් API Key එකක් යාවත්කාලීන ("Lock Config") කල පසු, එය කෙලින්ම ගබඩා වෙන්නේ අපේ Secure Database එකේ පමණි.
  - Approve බොත්තම එබූ විගස, n8n එකෙන් අර Lead එක කාගේදැයි තහවුරු කරගෙන, **එම තත්පරයේදීම** Database එක තුළ ඇති අලුත්ම API Key එක (`Bearar {{dynamic_token}}`) ලබාගෙන පණිවිඩය යවයි.
  - එනිසා Customer Dashboard එක පැත්තෙන් කරන API වෙනස්කම් ඉබේම Automation Engine එකට Apply වේ.

---

## 2. Omnichannel Human-in-the-Loop (Dual Approval) 📱
**Client ට විකුණන විදිහ:** "AI එක තනියම මැසේජ් යවලා ලෙඩක් දායි කියලා බයවෙන්න දෙයක් නෑ. AI එක මැසේජ් එක යවන්න කලින්, ඔයාගේ සාක්කුවේ තියෙන ෆෝන් එකට Telegram/WhatsApp එකෙන් AI එක ලියපු මැසේජ් එක එනවා. ඔයා Approve කරොත් විතරක් යවනවා."

- **Feature එක:** The DigyNex Approval Gateway
- **ක්‍රියාවලිය:**
  - AI copywriter විසින් ලියන ලද මැසේජ් එක කෙලින්ම යන්නේ නෑ.
  - ඒක Client ගේ Smart Phone එකට (Telegram යෙදුමට) එනවා "Approve", "Regenerate", "Reject" බොත්තම් තුනත් එක්ක.
  - Client "Approve" එබුවොත් විතරක්, CMS එක Update වෙලා Social API එක හරහා ඇත්තම මැසේජ් එක ඔටෝ සෙන්ඩ් වෙනවා.
- **වාසිය:** CEO ලාට/Directors ලාට ගමනේ යෙදෙන ගමන් (On-the-go) තමන්ගේ විකුණුම් කළමනාකරණය කරන්න පුළුවන්.

---

*(මෙම ගොනුව අලුත් Idea එකක් ආපු ගමන්ම Update කරනු ලැබේ)*
