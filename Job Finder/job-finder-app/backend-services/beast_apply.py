import os
import sys
import json
import asyncio
import argparse
from playwright.async_api import async_playwright
import google.generativeai as genai

# --- DIGYNEX NEURAL ENGINE: BEAST MODE (V1.1) ---
# Logic: Playwright-Stealth + Gemini 2.0 Dynamic Parsing
# ---------------------------------------------------

async def run_beast(args):
    job_url = args.url
    cookies_raw = args.cookies
    cv_path = args.cv
    user_data = json.loads(args.data)
    gemini_key = args.gemini_key or os.getenv('GEMINI_API_KEY')
    proxy_server = args.proxy

    # 🛡️ STEALTH: Initialize Gemini
    if gemini_key:
        genai.configure(api_key=gemini_key)
        model = genai.GenerativeModel('gemini-1.5-flash') 
    else:
        model = None
        print("[WARNING] Gemini Key missing. Falling back to basic selectors.")

    async with async_playwright() as p:
        browser = await p.chromium.launch(
            headless=True,
            args=['--disable-blink-features=AutomationControlled', '--no-sandbox']
        )

        # Emulate iPhone 14 Pro Max for minimal detection footprint
        iphone = p.devices['iPhone 14 Pro Max']
        context = await browser.new_context(
            **iphone,
            locale='en-US',
            timezone_id='Europe/Stockholm',
            proxy={'server': proxy_server} if proxy_server else None
        )

        # Inject Session
        await context.add_cookies(json.loads(cookies_raw))
        page = await context.new_page()
        
        # 🛡️ MASKING
        await page.add_init_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")

        print(f"[DIGYNEX BEAST] Engine Engaged: {job_url}")
        
        try:
            await page.goto(job_url, wait_until='domcontentloaded', timeout=60000)
            await asyncio.sleep(4)

            # Detect Easy Apply
            apply_btn = await page.query_selector('button:has-text("Apply"), button:has-text("Easy Apply"), button:has-text("Ansök")')
            if not apply_btn:
                print(json.dumps({"status": "FAILED", "reason": "Apply button missing or sequence already completed."}))
                return

            await apply_btn.click()
            await asyncio.sleep(2)

            # --- DYNAMIC MULTI-STEP FLOW ---
            for _ in range(15): # Max 15 steps per application
                # 1. Check for CV Upload Field
                file_input = await page.query_selector('input[type="file"]')
                if file_input and cv_path and os.path.exists(cv_path):
                    print("[DIGYNEX] Injecting CV Specimen...")
                    await file_input.set_input_files(cv_path)
                    await asyncio.sleep(2)

                # 2. AI Form Interaction (The Brain)
                if model:
                    form_content = await page.content()
                    prompt = f"Analyze this LinkedIn form. User: {json.dumps(user_data)}. Return JSON of CSS selectors and values to fill. Example: {{'input[id*=\"phone\"]': '0701234567'}}. HTML: {form_content[:4000]}"
                    try:
                        response = model.generate_content(prompt)
                        # Clean JSON response
                        clean_json = response.text.strip().replace('```json', '').replace('```', '')
                        actions = json.loads(clean_json)
                        
                        for selector, val in actions.items():
                            try:
                                el = await page.query_selector(selector)
                                if el:
                                    if val == "click": await el.click()
                                    else: await el.fill(str(val))
                            except: pass
                    except:
                        print("[DEBUG] AI Parse skipped for this step.")

                # 3. Progress to Next Step
                next_btn = await page.query_selector('button:has-text("Next"), button:has-text("Review"), button:has-text("Submit"), button:has-text("Nästa"), button:has-text("Granska"), button:has-text("Skicka")')
                
                if not next_btn: break
                
                btn_text = await next_btn.inner_text()
                await next_btn.click()
                await asyncio.sleep(2)
                
                if "Submit" in btn_text or "Skicka" in btn_text or "Finalizar" in btn_text:
                    print(json.dumps({"status": "SUCCESS", "message": "Neural Transmission Complete"}))
                    return

            print(json.dumps({"status": "TIMEOUT", "message": "Max steps reached without final submission"}))

        except Exception as e:
            print(json.dumps({"status": "ERROR", "message": str(e)}))
        finally:
            await browser.close()

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--url", required=True)
    parser.add_argument("--cookies", required=True)
    parser.add_argument("--cv", required=True)
    parser.add_argument("--data", required=True)
    parser.add_argument("--gemini-key", required=False)
    parser.add_argument("--proxy", required=False)
    asyncio.run(run_beast(parser.parse_args()))
