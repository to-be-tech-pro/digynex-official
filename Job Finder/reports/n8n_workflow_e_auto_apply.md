# 🤖 DigyNex Neural Engine: Workflow E (Neural Executor)

_Production Documentation - V3.0 (Agentic Preparations)_

## 📝 Overview

Workflow E is the final engine that executes the job application process. It uses a **Browserless Sidecar** for headless rendering to ensure stability within hardened Docker environments. Currently relying on a static Puppeteer script, it is scheduled for a Phase 3 upgrade to an AI Agentic Executor to handle complex ATS portals (Workday, Taleo).

---

## 🛠️ Node Configuration Details

### 1. Webhook: Apply Request

- **Method:** `POST`
- **Path:** `headless-executor`
- **Input Data:** Receives the Single-Body JSON payload from the Router.

### 2. Supabase: Get Profile

- **Resource:** `Row` | **Operation:** `Get`
- **Table:** `profiles`
- **Filter:** `email` equals `{{ $json.body.applicant_email }}`
- **Role:** Retrieves the `cv_path` for the candidate.

### 3. Supabase: Download CV (HTTP Request)

- **Type:** `HTTP Request`
- **Method:** `GET`
- **URL:** `https://ticmdqeyeiycznfzxqrx.supabase.co/storage/v1/object/authenticated/cv_specimens/{{ $node["Supabase: Get Profile"].json.id }}.pdf`
- **Headers (Secure Method):**
  - `Authorization`: `Bearer {{ $env["SUPABASE_KEY"] }}`
  - `apikey`: `{{ $env["SUPABASE_KEY"] }}`
- **Response Format:** `File`

### 4. Write Binary File: CV

- **File Name:** `/automation/cv_{{ $execution.id }}.pdf`
- **Property Name:** `data`
- **Role:** Saves the PDF to a local disk location for the Puppeteer script to access.

### 5. Node: Execute Command (The Headless Executor)

- **Requirement:** `N8N_ENABLE_EXECUTE_COMMAND=true` and `NODES_EXCLUDE=[]` in Docker environment.
- **Command:**
  ```bash
  node "/automation/apply_script.js" --url="{{ $node["Webhook: Apply Request"].json.body.job_url }}" --cv="/automation/cv_{{ $execution.id }}.pdf" --name="{{ $node["Supabase: Get Profile"].json.name }}" --email="{{ $node["Supabase: Get Profile"].json.email }}" --cl="{{ $node["Supabase: Get Profile"].json.cover_letter }}" --phone="{{ $node["Supabase: Get Profile"].json.phone || '' }}" --location="{{ $node["Supabase: Get Profile"].json.country_code || 'Sweden' }}"
  ```
- **Execute Once:** ON
- **Role:** Launches Puppeteer and connects to `ws://browserless:3000` to perform the application. (Pending Phase 3 AI Agent upgrade).

### 6. Code: Parse Result & Sequential Routing

- **Logic:** Extracts JSON from `stdout`.
- **Routing:** Uses `If` node logic:
  - **SUCCESS:** Triggers Gemini Vision (`Analyze an image`) to visually verify the success page before hitting the Quota Decrement.
  - **MANUAL_REQUIRED:** Bypasses Gemini and routes directly to User Manual Alert nodes via WhatsApp/Telegram.

### 7. Supabase: Log Activity

- **Operation:** `Create`
- **Table:** `user_activity`
- **Mapping:**
  - `user_id`: `{{ $node["Webhook: Apply Request"].json.body.applicant_email }}`
  - `action`: `JOB_APPLIED`
  - `details`: `{{ JSON.stringify($node["Code: Parse Result"].json) }}`

---

## ⚠️ Critical Maintenance Rules

1.  **Environment Variables:**
    - `N8N_ENABLE_EXECUTE_COMMAND=true`
    - `NODES_EXCLUDE=[]`
    - `N8N_BLOCK_ENV_ACCESS_IN_EXPRESSIONS=false`
2.  **Browser Connectivity:** Ensure the `browserless` container is running and reachable via the Docker network.
3.  **File Permissions:** The `/automation` folder must have `777` permissions.
4.  **Path Consistency:** The script is located at `/automation/apply_script.js`.
