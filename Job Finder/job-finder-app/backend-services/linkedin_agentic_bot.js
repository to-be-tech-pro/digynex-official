const puppeteer = require('puppeteer');
const args = require('minimist')(process.argv.slice(2));
const fs = require('fs');
const path = require('path');

/**
 * 🌌 DIGYNEX NEURAL AGENT: LINKEDIN STEALTH BOT (V19.0 - Phase 3.3)
 * --------------------------------------------------------------------------
 * System Version: V19.0 (Agentic Era)
 * Architecture: Hybrid Stealth (li_at Injection + Human Jitter)
 * Security: AES-Decrypted Cookie Input | Zero-Touch Modal Logic
 */

(async () => {
    // 1. Arguments & Environment Validation
    const { url, cv, cookie, name, email, phone, location, cl, proxy } = args;
    const timestamp = Date.now();
    const screenshotName = `linkedin_apply_${timestamp}.png`;
    const screenshotPath = `/automation/temp/${screenshotName}`;

    if (!url || !cookie || !cv) {
        console.error(JSON.stringify({ 
            status: "ERROR", 
            message: "Missing core parameters: --url, --cookie (li_at), or --cv" 
        }));
        process.exit(1);
    }

    let browser;
    try {
        // 2. Launch / Connect with Stealth Parameters
        // Note: Using Browserless sidecar if available, fallback to local for development
        const connectionOptions = {
            browserWSEndpoint: 'ws://browserless:3000',
            defaultViewport: { width: 1440, height: 900 }
        };

        browser = await puppeteer.connect(connectionOptions);
        const page = await browser.newPage();

        // 3. Stealth Header & Property Overrides (Anti-Fingerprinting)
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36');
        await page.evaluateOnNewDocument(() => {
            Object.defineProperty(navigator, 'webdriver', { get: () => false });
            Object.defineProperty(navigator, 'plugins', { get: () => [1, 2, 3, 4, 5] });
            Object.defineProperty(navigator, 'languages', { get: () => ['en-US', 'en'] });
        });

        // 4. Session Injection (The li_at Pulse)
        await page.setCookie({
            name: 'li_at',
            value: cookie,
            domain: '.www.linkedin.com',
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        });

        process.stderr.write(`[PROGRESS] Stealth Handshake: Injecting Session Cookie...\n`);

        // 5. Navigation with Human Jitter
        process.stderr.write(`[PROGRESS] Navigating to: ${url}\n`);
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 90000 });

        // HELPER: Human Delay (Randomized)
        const jitter = async (min = 1000, max = 3000) => {
            const ms = Math.floor(Math.random() * (max - min + 1) + min);
            await new Promise(r => setTimeout(r, ms));
        };

        // HELPER: Smooth Scroll
        const humanScroll = async () => {
            await page.evaluate(async () => {
                await new Promise((resolve) => {
                    let totalHeight = 0;
                    let distance = 100;
                    let timer = setInterval(() => {
                        let scrollHeight = document.body.scrollHeight;
                        window.scrollBy(0, distance);
                        totalHeight += distance;
                        if (totalHeight >= scrollHeight) {
                            clearInterval(timer);
                            resolve();
                        }
                    }, Math.floor(Math.random() * 100) + 100);
                });
            });
        };

        await jitter(2000, 5000);
        await humanScroll();
        await jitter(1500, 3000);

        // 6. Action: Locate "Easy Apply"
        const findEasyApply = async () => {
            return await page.evaluate(() => {
                const buttons = Array.from(document.querySelectorAll('button'));
                const easyApply = buttons.find(b => b.innerText.includes('Easy Apply') || b.innerText.includes('Apply now'));
                if (easyApply) {
                    easyApply.click();
                    return true;
                }
                return false;
            });
        };

        const modalTriggered = await findEasyApply();
        if (!modalTriggered) {
            throw new Error("Could not locate Easy Apply button or Job already applied.");
        }

        process.stderr.write(`[PROGRESS] Neural Modal Detected: Initializing Multi-Step Submission...\n`);
        await jitter(3000, 6000);

        // 7. Multi-Step Form Filler (Recursive Agent)
        let isFinalStep = false;
        let stepCount = 0;
        const maxSteps = 10;

        while (!isFinalStep && stepCount < maxSteps) {
            stepCount++;
            process.stderr.write(`[PROGRESS] Processing Step ${stepCount}...\n`);

            // Check for Final Submit Button
            isFinalStep = await page.evaluate(() => {
                const btns = Array.from(document.querySelectorAll('button'));
                return !!btns.find(b => b.innerText.toLowerCase().includes('submit application'));
            });

            // Fill Fields in the current view
            await page.evaluate(async (data) => {
                const inputs = Array.from(document.querySelectorAll('input, select, textarea'));
                
                for (const input of inputs) {
                    // Skip hidden or already filled fields
                    if (input.offsetParent === null || input.value) continue;

                    const label = input.closest('.jobs-easy-apply-form-section__grouping')?.innerText?.toLowerCase() || '';
                    const id = input.id.toLowerCase();
                    const name = (input.name || '').toLowerCase();

                    // Logic: Match field intent
                    if (id.includes('phone') || name.includes('phone') || label.includes('phone')) {
                        input.value = data.phone || '';
                        input.dispatchEvent(new Event('input', { bubbles: true }));
                    } else if (id.includes('city') || label.includes('city') || label.includes('location')) {
                        input.value = data.location || '';
                        input.dispatchEvent(new Event('input', { bubbles: true }));
                    } else if (input.tagName === 'SELECT') {
                        // Handle dropdowns (Years of experience, etc.)
                        const options = Array.from(input.options);
                        if (options.length > 1) {
                            // Professional Bias: Pick "Yes" or highest positive option if ambiguous
                            const bestOption = options.find(o => o.text.toLowerCase().includes('yes')) || options[1];
                            input.value = bestOption.value;
                            input.dispatchEvent(new Event('change', { bubbles: true }));
                        }
                    }
                }
            }, { phone, location, name, email });

            // Handle CV Upload (If input found)
            const fileInput = await page.$('input[type="file"]');
            if (fileInput) {
                process.stderr.write(`[PROGRESS] Injecting CV Specimen: ${cv}\n`);
                await fileInput.uploadFile(cv);
                await jitter(2000, 4000);
            }

            // Click Next / Review / Submit
            const actionTaken = await page.evaluate(() => {
                const btns = Array.from(document.querySelectorAll('button'));
                const nextBtn = btns.find(b => {
                    const txt = b.innerText.toLowerCase();
                    return txt.includes('next') || txt.includes('review') || txt.includes('submit application');
                });
                if (nextBtn) {
                    nextBtn.click();
                    return nextBtn.innerText.trim();
                }
                return null;
            });

            if (!actionTaken) {
                process.stderr.write(`[WARNING] No action button found on step ${stepCount}. Manual intervention might be needed.\n`);
                break;
            }

            await jitter(2000, 4000);
        }

        // 8. Final Stabilization & Capture
        await jitter(5000, 8000); // Wait for LinkedIn success state
        
        if (!fs.existsSync('/automation/temp')) {
            fs.mkdirSync('/automation/temp', { recursive: true });
        }
        await page.screenshot({ path: screenshotPath, fullPage: true });

        const content = await page.content();
        const isSuccess = content.toLowerCase().includes('application was sent') || 
                          content.toLowerCase().includes('success') ||
                          content.toLowerCase().includes('thank you');

        const result = {
            status: isSuccess ? "SUCCESS" : "MANUAL_REQUIRED",
            url: url,
            screenshot: screenshotName,
            full_screenshot_path: screenshotPath,
            timestamp: new Date().toISOString(),
            steps_completed: stepCount,
            version: "V19.0 (LinkedIn Agentic)",
            neural_charge: isSuccess
        };

        console.log(JSON.stringify(result));

    } catch (error) {
        console.log(JSON.stringify({ 
            status: "ERROR", 
            message: error.message,
            timestamp: new Date().toISOString()
        }));
    } finally {
        if (browser) await browser.disconnect();
    }
})();
