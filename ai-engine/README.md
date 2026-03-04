# DigyNex AI Engine 🤖

Welcome to the **AI-Powered Managed Service** framework. This module allows you to deploy intelligent AI agents for various businesses and integrate them directly with the DigyNex CMS/TMS ecosystem.

## 🚀 Business Model: How to Monetize

1. **Setup Fee ($/LKR):** Charge for initial knowledge training and bot persona setup.
2. **Integration Fee:** Charge per channel (WhatsApp, FB, Web Chat).
3. **Monthly Managed Service:** Charge for hosting, updates, and maintenance.
4. **Pay-Per-Lead:** Charge for প্রত্যেক successful lead captured by the AI.

## 🛠 Setup Instructions

1. **Import Workflow:** Copy `workflows/digynex-master-agent.json` and import it into your **n8n** instance.
2. **Configure AI:** Connect your **Google Gemini API Key** to the Gemini Node.
3. **Connect Database:** Update the **Supabase Node** with your CMS project URL and API key to sync leads automatically.
4. **Knowledge Training:** Add business-specific details to the "System Message" in the AI Agent node.

## 📈 Supported Channels

- Web Chat Widget
- WhatsApp Business
- Telegram
- Facebook / Instagram Messenger

## 🚀 Future Roadmap (Pro Features)

These are high-value features that can be up-sold as "Pro" or "Enterprise" tiers:

1. **Multilingual (Singlish & Sinhala):** Seamlessly handle mixed-language inquiries and respond in the user's preferred language.
2. **Voice-to-Text Integration:** Support for WhatsApp Voice Notes using OpenAI Whisper for instant processing of audio messages.
3. **Human-in-the-Loop (Handoff):** Automatic escalation to a human agent via Telegram/WhatsApp when the AI encounters complex queries (e.g., Discount requests).
4. **Proactive Follow-ups:** Automated engagement messages sent 24-48 hours after the initial inquiry to improve conversion rates.
5. **AI Analytics Dashboard:** Real-time visualization of query types, lead quality, and bot performance insights integrated into the DigyNex CMS.

---

Created by DigyNex AI Systems
