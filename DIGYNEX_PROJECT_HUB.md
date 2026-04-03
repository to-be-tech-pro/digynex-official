# 👑 DIGYNEX PROJECT HUB: Unified SaaS Roadmap

This document serves as the **Single Source of Truth** for the DigyNex Ecosystem. All architectural decisions, pricing models, and development milestones are documented here.

---

## 💰 UNIFIED PRICING STRATEGY (GLOBAL SaaS)

The pricing is designed as a **Hybrid Model**: Full-Suite Platform Pricing vs. Individual Sub-Product Entry Plans.

### 1. Main Platform Pricing (digynex.se/pricing)
*Targeting: Medium-Large Enterprises & Full Business Management*

| Tier | Price (Monthly) | Setup Fee | Active Profiles | Key Value |
| :--- | :--- | :--- | :--- | :--- |
| **STARTER** | **$29** | **$99** | Up to 100 | Basic dashboards & core records. |
| **GROWTH** ⭐ | **$79** | **$199** | Up to 500 | **Nexus AI Business Agent** & full automation. |
| **SCALE** | **$149** | **$499** | Up to 2,000 | **Custom-Trained AI Agent** & multi-org ops. |
| **ENTERPRISE** | **Custom** | **$999+** | Unlimited | Dedicated API & specialized custom models. |

---

### 2. Sub-Product (Micro-SaaS) Entry Pricing
*Targeting: Individual modules (CMS, TMS, FB Nexus)*

| Tier | Price (Monthly) | Setup Fee | Features |
| :--- | :--- | :--- | :--- |
| **STARTER** | **$19** | **$99** | Up to 100 Profiles, Basic CRM, 24/7 Monitoring. |
| **GROWTH** ⭐ | **$29** | **$199** | Up to 500 Profiles, **Nexus AI Business Agent**, n8n. |
| **SCALE** | **$79** | **$499** | Up to 2,000 Profiles, **Custom AI Agent**, White-Label. |

*Upsell CTA: "Unlock the Full Suite for $149/mo (All-in-one)"*

---

### 3. Market Detection & Currency Logic
- **SE (Sweden):** 
  - Monthly: 299 kr / 799 kr / 1499 kr
  - Setup: 999 kr / 1,999 kr / 4,999 kr
- **LK (Sri Lanka):** 
  - Monthly: 2,500 / 12,000 / 18,000 LKR
  - Setup: 12,000 / 18,000 / 30,000 LKR
- **GLOBAL:** 
  - Monthly: $29 / $79 / $149
  - Setup: $99 / $199 / $499

---

## 🎨 VISUAL IMPLEMENTATION PLAN (PREMIUM UI/UX)

Following the Figma Blueprint, we will implement a world-class pricing page on `digynex.se`:

### 1. Hero & Billing Toggle
- **Smooth Toggle:** Monthly vs. Yearly switch (Yearly saves 20%).
- **Clean Headline:** "Simple Pricing. Decision Intelligence."

### 2. The Pricing Grid (Glassmorphism Tier)
- **Design Style:** Translucent dark backgrounds with subtle borders.
- **Micro-Animations:** On hover, cards lift and shadows deepen.
- **Growth Card Glow:** A subtle, pulsating gradient border (Blue-Purple) to drive conversion.
- **Badging:** "Most Popular" for the Growth tier.

### 3. Progressive Disclosure
- **Tooltips:** Information icons for "Active Profiles" explaining the metric simply.
- **Comparison Table:** A minimalist table below the cards for detailed feature comparison.
- **FAQ Section:** Accordion-style section for common queries (Profiles, Upgrades, Trial).

---

## 📊 DIGYNEX 360: BI INTERACTIVITY (EXECUTIVE BOARD)

The Executive Board is a **Decision Intelligence Interface**. Every element is interactive, allowing for deep-dive analysis.

### 1. KPI Card Drill-downs (DrilldownModal)
- **Unified Revenue:** Clicking the main hero card triggers a drill-down into automated subscription fees and batch processing revenue.
- **Net Profit (P&L Context):** Triggers a **High-Fidelity ApexChart** showing Profit vs. Revenue trends over time, alongside specific margin metrics (Peak Margin: 28.4%).
- **Liquidity Radar (Free Cash Flow):** Provides a 30-day cash cycle insight including operational reserves and receivables.
- **Expense Auditor (Op. Expenses):** Breaks down monthly burn into Cloud Infrastructure, Marketing, and Payroll with budget-status indicators.

### 2. Action Engine (Notification System)
- **Top Header Bell:** A pulsating indicator for real-time alerts.
- **Dropdown Interface:** Displays categorized system events:
  - **Anomaly Detection:** WoW revenue drops or unusual expense spikes.
  - **Intelligence Sync:** Confirmation of AI Forecast Path recalculation via Supabase.
  - **Strategic Updates:** Alerts on growth target adjustments based on monthly metrics.
- **Click Actions:** Each notification item is interactive, allowing for "Mark as Read" or "Drill-to-Detail" navigation.

### 3. Executive Export (PDF Reporting)
- **Export Button:** A state-managed button in the header.
- **Process Sequence:** 
  1. Compiling AI Intelligence Report...
  2. Encrypted stream validation.
  3. PDF Graphics generation.
  4. Automatic file download.

---

### 4. Sales Pivot Analysis (Drill-down Ecosystem)

The Sales Pivot page is a **Multi-dimensional Channel Auditor**. It allows for granular tracking of lead sources and conversion efficiency.

#### 📈 Interactive Sales Metrics
- **Avg Order Value:** Clicking triggers a drill-down into higher-tier plan (Platinum/Growth) performance.
- **Conversion Rate:** Insights into channel efficiency (PPC vs. Organic SEO) via a detailed modal.
- **Total Orders:** Audit of order velocity, showing batch-processing success vs. pending transactions.
- **New Customers:** A verified list of corporate vs. individual SaaS signups.

#### 📊 Revenue by Channel (Interactive Chart)
- **Bar Selection:** Clicking any channel (ex: Facebook Ads, Google Search) triggers a **Channel Analysis** modal with specific share metrics and aggregate revenue.
- **Live Sync:** Data is pulsed from Supabase to provide real-time marketing distribution.

#### 🛠 Operational Controls
- **"This Month" (Timeframe Sync):** Resets the data context to the current billing cycle, recalculating MoM (Month-over-Month) trends.
- **Export Report:** Generates a **Sales Intelligence Manifest**, validating channel mix before downloading the PDF.

---

### 5. BI Intelligence Reports (Automation Hub)

The BI Reports page is a **Centralized Automation Workstation** for scheduling and generating executive-grade business intelligence.

#### 🧠 Intelligence Monitoring
- **Intelligence Sync:** Real-time database architecture health monitoring.
- **Automation Pulse:** Tracking active n8n logic hooks and system triggers.
- **Managed Data:** Auditor for the total volume of data points processed by the DigyNex Hub.

#### ⚙️ Custom Report Builder (High-Fidelity)
- **Context Selection:** Allows for "Metric Universe" and "Time Horizon" customization.
- **AI Synthesis Toggle:** Option to inject automated executive summaries into the final PDF.
- **Compilation Workstation:** A dynamic overlay that shows real-time progress (0-100%) through 4 stages:
  1. Authenticating Ledger Access.
  2. Applying AI Heuristics.
  3. Injecting Synthetic Summaries.
  4. Signing Encrypted Manifest.
- **Data Preview:** A mini sparkline and metadata block providing a "pre-flight" look at report density and accuracy.

#### 📅 Automated Schedule Hub
- **Interactive Toggles:** Users can "Active/Pause" specific automation sequences (Monthly Audits, Weekly Pivots) with real-time status indicators.
- **Operational Logs:** Tracks the "Last Run" status for every scheduled job to ensure system reliability.

---

### 6. Operations Command Hub (Tactical AI Engine)

The Operations page is now a **High-Performance Tactical Hub** focused on forensic financial matching and real-time production logging. Strategic management has been moved to Project Nexus.

#### 📡 Forensic AI Matching (Matching Agent)
- **PO/Invoice Matcher:** A high-speed interface that uses AI heuristics to reconcile Inbound Invoices with Active Purchase Orders.
- **Anomaly Detection:** Specifically flags matching confidence levels (Matched vs. Anomaly) to prevent ledger discrepancies.
- **Reconciliation Workstation:** Drill-down access for validating matched transactions and committing them to the final financial ledger.

#### 📊 Daily Operational Log
- **Lifecycle Pulse:** A real-time timeline of operational events (PO Issued, WO Converted, Invoice Synced).
- **Process Integrity:** Tracks the immediate "Outcome" of daily tasks to maintain a high level of operational sovereignty.

#### ⚡ AI Efficiency Protocols
- **Platform Heartbeat:** Real-time monitoring of Platform Uptime, Response Latency, and System Saturation.
- **Multi-threaded Sharding:** An interactive workstation that rebalances worker throughput to maintain a target 12ms latency.

---

### 11. Project Nexus (Strategic Portfolio Hub) 🌟

Project Nexus is the **Executive Command Center** for long-term portfolio strategy, high-volume ingestion, and board-level financial auditing.

#### 🧠 Strategic Intelligence
- **Milestone Matrix:** A high-density KPI grid tracking Budget Burn Rate, Schedule Variance, and AI Risk Factors across the entire project ecosystem.
- **ROI Manifest:** Real-time projection of Project ROI based on live financial commitment levels.

#### 🏗️ Advanced Milestone Health
- **Phase Execution Pulse:** A hierarchical view of project phases (Civil, Structural, MEP) with live physical completion vs. budget burn synchronization.
- **Critical Path Pulse:** AI-driven health monitoring that flags potential delays before they impact the final delivery manifest.

#### 📈 Portfolio Analytics (MS Project Integration)
- **Executive Variance Pulse:** Granular cost variance charts (Actual vs. Baseline) for high-stakes financial auditing.
- **Strategic Burn Projection:** Extrapolation of resource consumption velocity to estimate final project outcomes.

#### 📂 Bulk Ingest Hub (Document Sovereignty)
- **Enterprise Ingestion:** Optimized for **10,000+ line-item manifests** (CSV/PDF).
- **AI Mapping Engine:** Automatically maps external AWR/Item codes to internal Work Breakdown Structures (WBS) with 98% confidence.
- **Dual Context:** Supports both Inbound Client POs and Inbound Subcontractor manifests.

#### ⚖️ Financial Manifest & SCV Audit
- **Strategic Cost Variance (SCV):** A high-fidelity auditing interface for reconciling top-level project budgets with operational expenditure.
- **Ledger Ingestion:** Bulk-commit strategic expenses to the P&L with specific project-context attribution.

---

### 7. Financial Intelligence Vault (Ledger Control)

The Finance page is an **Executive Decision Vault** for managing multi-tenant liquidity and strategic ledger entries.

#### 📊 Quarterly Compliance Audit
- **Executive Reporting Module:** High-fidelity reporting console showing $1.2M Net Revenue, Sector Allocations (Infra, AI Compute), and Growth Projections.
- **Admin Certification:** Integrated "Super Admin" review feature with signed executive notes for quarterly audits.

#### 📜 Strategic Ledger Audit
- **Full History Manifest:** A high-fidelity, full-screen audit interface for reviewing unrestricted transaction history with automated summary statistics (Revenue Sum, Expense Sum).
- **Transaction Sovereignty:** Row-level action menus for verifying integrity via blockchain simulation, downloading secure receipts, and archiving sensitive records.

#### ✍️ Administrative Record Entry
- **Ledger Ingestion Modal:** A premium interface for committing new SaaS revenue or operational expenses to the strategic ledger with immediate KPI synchronization.
- **AI Integrity Validation:** Real-time data validation and encryption protocols for every committed transaction record.

---

#### 🔐 8-A. Personnel Identity Hub (New Phase 10 Core)
- **High-Density Identity Indexing:** A specialized sub-module in Settings for managing 50+ corporate identities (CEO, Manager, Staff, Finance, Subcontractor).
- **Identity Filters (Clustering):** Real-time filtering by Access Cluster (Executives, Operations, Finance, Contractors) for rapid management of large teams.
- **Inline Identity Sync:** Direct inline editing of display names and crypto-verified UUID generation for cross-app (CSM/TSM) synchronization.
- **Executive-Only Controls:** User creation and role modification strictly restricted to CEO and Manager roles via recursive-protected DB policies.

---

### 9. Industry Adaptation (Universal Labeling v2.0)

DigyNex 360 is now a **Multi-Industry Operating System**. Terminology adapts instantly based on the "Industry Vertical" toggle in Settings.

- **Project Mode:** Optimized for Construction, Law, and Engineering (PO, WO, Client).
- **Service Mode:** Optimized for IT, Marketing, and Support (Tickets, Leads, Partner).
- **Education Mode:** Optimized for Academies and Tuition Centers (Academy Hub, Student, Course Fee).
- **Reactive Terminology:** The `brandingStore.labels` object propagates these terminology shifts to all UI headers, charts, and sidebar elements without latency.

---

### 10. Strategic CRM Directory (Partner Index)

The CRM page now functions as a **Dual-Sided Directory** for external stakeholder management.

- **Partner Indexing:** Dedicated tabs for "Strategic Partners" (Clients) and "Subcontractors" (Contractors).
- **Inbound Sync:** Direct Supabase ingestion with activity logging for when a new partner is indexed.
- **Search Engine:** High-speed filtering by Name, Industry sector, or verification status.

---

## 📑 MASTER TAB & FUNCTIONALITY MANIFEST (2026 EDITION)

This section provides the **Definitive Operational Map** of every tab across the DigyNex 360 BOS.

### A. 📊 BI Dashboard (Executive Board)
*   **Main Pulse:** Real-time KPI summary (Revenue, Net Profit, Growth).
*   **Sales Pivot:** Granular breakdown of marketing channel efficiency.
*   **Finance Insights:** Liquidity monitoring and P&L auditing.
*   **Reports Hub:** Automated generation of AI-augmented business intelligence.

### B. 🌟 Project Nexus (Strategic Hub)
*   **Strategic Intelligence:** High-level KPI grid for portfolio-wide budget, risk, and schedule health.
*   **Advanced Milestone Health:** Phase-by-phase physical completion vs. budget burn synchronization.
*   **Portfolio Analytics:** Comparative cost variance and resource burn projections (Baseline vs. Actual).
*   **Bulk Ingest Hub:** High-volume manifest ingestion (10k+ items) with autonomous AWR/WBS mapping.
*   **Financial Manifest:** Strategic ledger ingestion for project-level P&L auditing.

### C. ⚙️ Operations Command (Tactical Engine)
*   **Forensic AI Matching:** Real-time reconciliation of Inbound Invoices against Active Purchase Orders.
*   **Operational Log:** Live lifecycle pulse tracking the outcome of every PO/WO interaction.
*   **System Heartbeat:** Infrastructure health, latency sharding, and worker throughput optimization.

### D. 📜 Project CRM (Stakeholder Directory)
*   **Strategic Partners:** Managing high-value client relationships with integrated lead attribution.
*   **Subcontractor Registry:** Registry of 50+ specialized contractors with automated performance scorecards.
*   **Inbound Hub:** Audit trail for new partner applications coming from `digynex.se`.

### E. 👥 Personnel Identity (Security Gate)
*   **Identity Management:** Executive-only control over Staff, Manager, and Subcontractor roles.
*   **RBAC Enforcement:** Visual indicators of active security clusters to prevent unauthorized access.

---

## 📅 DEVELOPMENT MILESTONES

- [x] **Phase 1-9:** Initial Architecture, Dashboards, and Financial Vault. (READY)
- [x] **Phase 10:** Strict RBAC Security Enforcement (Route & Action Protection). (DONE ✅)
- [x] **Phase 11:** Personnel Identity Hub & ULS v2.0 (Industry Adaptation). (DONE ✅)
- [x] **Phase 12-A**: Partner Program Ecosystem (DB + RBAC + Referral Trigger). (DONE ✅)
- [ ] **Phase 12-B**: n8n Webhook Integration for Partners, Leads, and Operations.
- [x] **Phase 12-C**: Public Partnership Registration Portal (Landing Page + Validation). (DONE ✅)
- [x] **Phase 13**: Project Nexus Strategic Hub (Bulk Ingest + SCV Audit). (DONE ✅)
- [ ] **Phase 14**: Widgetized Workspace (User-customizable dashboard layouts).
- [ ] **Phase 15**: Multi-Currency Live Integration (USD/LKR/SEK).
- [ ] **Phase 16**: TeaAI Visual Grading Pipeline (Agri-Tech Pilot).

---

## 🔗 AUXILIARY DOCUMENTATION REFERENCE
- [Official Security Ledger](DIGYNEX_OFFICIAL_SECURITY_GUIDANCE.md)
- [Agent Rules File](.agent_rules.md)
- [Master AI Prompt](DIGYNEX_MASTER_PROMPT.md)
- [N8N Automation Guide](N8N_AUTOMATION_GUIDE.md)
- [Fiverr Case Study (TMS)](FIVERR_PORTFOLIO_CASE_STUDY.md)
- [Fiverr Case Study (CMS)](FIVERR_PORTFOLIO_CASE_STUDY_CMS.md)
