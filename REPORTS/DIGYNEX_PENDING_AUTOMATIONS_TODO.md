# 📋 DigyNex BOS - Master Pending Automations

This document contains the consolidated list of all pending API and n8n automations across the DigyNex 360 ecosystem. 
*Mark the checkboxes [`x`] as each webhook/integration is successfully deployed to production.*

---

## 🎓 1. TMS (Tuition Management System)
- [ ] **Automated Homework Sync:** Writing the n8n webhook integration to log student assignments and link them to the QR scanner.
- [ ] **Real-Time Financial Aggregations:** Replacing the mocked historical charts and outstanding due amounts (`ref(0)`) with live PostgreSQL aggregations.
- [ ] **AI-Generated Insights:** Summary cards for staff based on live data (replacing static mock text).

---

## 🌐 2. CMS & AI Social Viral Hub
- [ ] **Automated Client Onboarding:** Triggering dynamic PDF contract generation and WhatsApp dispatch when a CRM lead status changes to "Won".
- [ ] **Predictive Niche Discovery Engine:** Integrating Gemini Latest API to fetch 10 high-velocity viral niches based on real-time internet trends.
- [ ] **4-Stage Prompt Architect Automation:** Logic to generate professional, scene-locked metadata prompts tailored for Midjourney v6 and Kling.
- [ ] **Maestro Auditory DNA Flow:** Automating the generation of cinematic voiceover scripts (ElevenLabs) and detailed SFX tags.
- [ ] **Multi-Language Translation Pipeline:** Real-time API toggling to translate prompt outputs and UX into English, Sinhala, and Swedish.
- [ ] **External Workflow Hooks:** Linking the internal Viral Architect directly to professional rendering instances (CapCut, Luma, Midjourney) via n8n webhooks.
- [ ] **🚨 COMMERCIAL DEPLOYMENT: Data Enrichment Switch:** Swap the currently active `Hunter.io` (Testing/GET) API to **Apollo.io (Paid Plan)** `POST /v1/people/match` API to accurately scrape contacts without relying solely on web domain resolution.
- [ ] **🚨 COMMERCIAL DEPLOYMENT: Vault Security Lock:** Remove all hardcoded parameters or URL query API keys used for testing (in HTTP Request Nodes) and strictly map them to **n8n Generic Credential Vaults** (Secure Query Auth / Header Auth) before client handover.
- [x] **SaaS Multi-Tenant SMTP Fallback Logic:** Configure n8n to check for client-specific SMTP settings, defaulting to the DigyNex master gateway if empty to ensure continuous outreach testing. (COMPLETED ✅)
- [x] **AI System Stability (Hanging Fix):** Implement 60s Global Timeouts, retry logic (3 attempts), and recursive error paths in all Gemini/AI nodes to prevent workflow hanging and ensure the agent is always responsive. (LOGIC DOCUMENTED & READY ✅)

---

## 📊 3. Enterprise BI Dashboard (DigyNex 360 BOS)
- [ ] **Bulk Manifest Ingestion (ETL Pipeline):** Asynchronous n8n CRON jobs to pull raw data (CSV/PDF) securely into PostgreSQL, automatically mapping AWR/Item codes to internal WBS.
- [ ] **Net Profit Automation v2:** Advanced ROI calculations based on hourly subcontractor rates vs PO value.
- [ ] **Strategic Executive Reporting Hub:** High-fidelity dynamic PDF export triggered via n8n for compiling BI Executive Summaries (Sales Pivot, Pulse) and emailing directly to the CEO.
- [ ] **Document Vault (v1):** Secure PDF/Image storage via Supabase Storage buckets for PO/Invoice compliance.
