/**
 * 🌌 DIGYNEX NEURAL ENGINE: HEADLESS EXECUTOR (V18.6 - Neural Ghost)
 * --------------------------------------------------------------------------
 * @project DigyNex Job Finder
 * @version 18.6
 * @architecture Browserless Sidecar (ws://browserless:3000)
 * @description This script automates job applications by navigating to target URLs, 
 * filling forms (including iframes/shadow DOM), uploading CVs, and capturing 
 * proof of submission via screenshots for AI verification.
 */

(async () => {
    const { url, cv, name, email, cl, phone, location } = args;
    const timestamp = Date.now();
    const screenshotName = `apply_${timestamp}.png`;
    const screenshotPath = `/automation/temp/${screenshotName}`;

    // 1. ARGUMENT VALIDATION
    if (!url || !cv) {
        console.error(JSON.stringify({ status: "ERROR", message: "Missing required arguments: --url or --cv" }));
        process.exit(1);
    }

    let browser;
    try {
        /**
         * 🌐 BROWSER INITIALIZATION
         * Connects to the Browserless container to ensure stable, isolated execution.
         */
        browser = await puppeteer.connect({
            browserWSEndpoint: 'ws://browserless:3000',
            defaultViewport: { width: 1280, height: 800 }
        });

        const page = await browser.newPage();
        
        // Use a realistic User-Agent to avoid basic bot detection
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36');
        
        process.stderr.write(`[PROGRESS] Navigating to ${url}\n`);
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

        /**
         * 📝 RECURSIVE FORM FILLER
         * Targets input fields, dropdowns, and file uploads.
         * Navigates through iFrames and handles Shadow DOM complexity.
         * 
         * @param {Object} frame - The Puppeteer page or frame object to process.
         */
        async function fillForm(frame) {
            const fieldMapping = [
                { key: 'name', value: name, selectors: ['input[name*="name"]', 'input[id*="name"]', 'input[placeholder*="Name"]', 'input[aria-label*="Name"]'] },
                { key: 'email', value: email, selectors: ['input[type="email"]', 'input[name*="email"]', 'input[id*="email"]', 'input[placeholder*="Email"]'] },
                { key: 'phone', value: phone, selectors: ['input[type="tel"]', 'input[name*="phone"]', 'input[id*="phone"]', 'input[placeholder*="Phone"]'] },
                { key: 'location', value: location, selectors: ['input[name*="city"]', 'input[id*="location"]', 'input[placeholder*="City"]', 'input[name*="address"]'] },
                { key: 'cl', value: cl, selectors: ['textarea[name*="cover"]', 'textarea[id*="cover"]', 'textarea[placeholder*="Cover"]', 'textarea[name*="msg"]'] }
            ];

            // A. Fill Text Inputs with human-like typing delay
            for (const field of fieldMapping) {
                if (!field.value) continue;
                for (const selector of field.selectors) {
                    try {
                        const element = await frame.$(selector);
                        if (element) {
                            await element.click({ clickCount: 3 }); // Clear existing text
                            await element.press('Backspace');
                            await element.type(field.value, { delay: 20 });
                            break; 
                        }
                    } catch (e) {}
                }
            }

            // B. Handle Dropdowns (Selects) - Prefers Country/Location matching
            const selects = await frame.$$('select');
            for (const select of selects) {
                try {
                    const nameAttr = await (await select.getProperty('name')).jsonValue();
                    if (nameAttr.includes('country') || nameAttr.includes('state')) {
                        await select.select(location || 'Sweden'); 
                    } else {
                        const options = await select.$$('option');
                        if (options.length > 1) await select.select(await (await options[1].getProperty('value')).jsonValue());
                    }
                } catch (e) {}
            }

            // C. Inject CV Specimen (File Upload)
            const fileInputs = await frame.$$('input[type="file"]');
            for (const input of fileInputs) {
                try {
                    const nameAttr = (await (await input.getProperty('name')).jsonValue()).toLowerCase();
                    if (nameAttr.includes('resume') || nameAttr.includes('cv') || fileInputs.length === 1) {
                        await input.uploadFile(cv);
                        break;
                    }
                } catch (e) {}
            }
        }

        // START FILLING (Main Page + All Sub-frames)
        await fillForm(page);
        const frames = page.frames();
        for (const frame of frames) {
            await fillForm(frame);
        }

        /**
         * ⚡ KINETIC ACTION: SUBMISSION
         * Scans the viewport for the most likely 'Submit' or 'Apply' button.
         * 
         * @returns {String|null} - The text content of the button clicked.
         */
        const attemptSubmission = async () => {
            return await page.evaluate(() => {
                const buttons = Array.from(document.querySelectorAll('button, input[type="submit"], a.btn'));
                const submitBtn = buttons.find(btn => {
                    const txt = btn.textContent.toLowerCase();
                    return txt.includes('apply') || txt.includes('submit') || txt.includes('next') || txt.includes('continue');
                });
                if (submitBtn) {
                    submitBtn.click();
                    return submitBtn.textContent.trim();
                }
                return null;
            });
        };

        const actionTaken = await attemptSubmission();
        process.stderr.write(`[PROGRESS] Action taken: ${actionTaken}\n`);

        // Wait for page stabilization/navigation after click
        await new Promise(r => setTimeout(r, 6000));
        
        /**
         * 📸 NEURAL VISION CAPTURE
         * Takes a full-page screenshot to serve as proof for the AI Vision layer.
         */
        if (!fs.existsSync('/automation/temp')) {
            fs.mkdirSync('/automation/temp', { recursive: true });
        }
        await page.screenshot({ path: screenshotPath, fullPage: true });

        // 🔍 HEURISTIC SUCCESS CHECK
        const content = await page.content();
        const isSuccess = content.toLowerCase().includes('thank you') || 
                          content.toLowerCase().includes('received') || 
                          content.toLowerCase().includes('success');

        /**
         * 🏁 RESULT EMISSION
         * Outputs a clean JSON string to stdout for n8n consumption.
         */
        const result = {
            status: (isSuccess || actionTaken === 'Submit') ? "SUCCESS" : "MANUAL_REQUIRED",
            neural_charge: (isSuccess || actionTaken === 'Submit'), 
            url: url,
            screenshot: screenshotName,
            full_screenshot_path: screenshotPath,
            timestamp: new Date().toISOString(),
            action: actionTaken,
            version: "V18.6 (Neural Ghost)"
        };

        console.log(JSON.stringify(result));

    } catch (error) {
        // ERROR LOGGING (n8n will capture this)
        console.log(JSON.stringify({ 
            status: "ERROR", 
            message: error.message,
            timestamp: new Date().toISOString()
        }));
    } finally {
        if (browser) await browser.disconnect();
    }
})();
