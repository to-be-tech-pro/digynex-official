const puppeteer = require('puppeteer');
const args = require('minimist')(process.argv.slice(2));
const fs = require('fs');

/**
 * 🌌 DIGYNEX NEURAL ENGINE: AGENTIC MASTER (V25.0 - Worldwide Sovereign)
 * --------------------------------------------------------------------------
 * Logic: JSESSIONID CSRF Injection + Resource Interception + Neural Wipe.
 */

(async () => {
    const { url, cv, name, email, phone, cookie, jsessionid, location } = args;
    const screenshotPath = `/home/node/.n8n-files/apply_${Date.now()}.png`;

    let browser;
    let cleanser;
    try {
        browser = await puppeteer.connect({
            browserWSEndpoint: 'ws://browserless:3000',
            defaultViewport: { width: 1280, height: 1000 }
        });

        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

        // --- ⚡ RESOURCE INTERCEPTION (COST OPTIMIZATION) ---
        await page.setRequestInterception(true);
        page.on('request', (req) => {
            if (['image', 'font', 'media'].includes(req.resourceType())) {
                req.abort();
            } else {
                req.continue();
            }
        });

        // --- 🔐 SURGICAL SESSION INJECTION ---
        if (cookie) {
            const domains = ['.linkedin.com', 'se.linkedin.com', 'www.linkedin.com'];
            for (const d of domains) {
                await page.setCookie({ 
                    name: 'li_at', 
                    value: cookie, 
                    domain: d,
                    path: '/',
                    secure: true,
                    httpOnly: true,
                    sameSite: 'None'
                });
                
                if (jsessionid) {
                    const cleanId = jsessionid.replace(/"/g, '');
                    await page.setCookie({ 
                        name: 'JSESSIONID', 
                        value: cleanId, 
                        domain: d,
                        path: '/',
                        secure: true,
                        httpOnly: false,
                        sameSite: 'None'
                    });
                }
            }
        }

        // --- 🛡️ REDIRECT LOOP GUARD ---
        console.log(`[V25.0] Navigating to: ${url}`);
        const response = await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
        if (response.status() === 404) throw new Error("JOB_NOT_FOUND: LinkedIn returned 404.");

        // DYNAMIC TIMEZONE LOCALIZATION
        const localizationMap = {
            'SE': 'Europe/Stockholm', 'DE': 'Europe/Berlin', 'GB': 'Europe/London',
            'UK': 'Europe/London', 'US': 'America/New_York', 'FR': 'Europe/Paris'
        };
        await page.emulateTimezone(localizationMap[location?.toUpperCase()] || 'Europe/Stockholm');

        const performNeuralWipe = async (frame) => {
            try {
                await frame.evaluate(() => {
                    const elements = document.querySelectorAll('*');
                    elements.forEach(el => {
                        const cls = (el.className || '').toString().toLowerCase();
                        if ((cls.includes('cookie') || cls.includes('banner')) && !el.closest('.jobs-easy-apply-modal')) {
                            el.remove();
                        }
                    });
                });
            } catch (e) {}
        };

        cleanser = setInterval(async () => { try { await performNeuralWipe(page); } catch (e) {} }, 3000);

        async function fillFields(frame) {
            const inputs = await frame.$$('input, select, textarea');
            for (const input of inputs) {
                const id = (await (await input.getProperty('id')).jsonValue() || "").toLowerCase();
                const type = await (await input.getProperty('type')).jsonValue();
                const aria = (await frame.evaluate(el => el.getAttribute('aria-label'), input) || "").toLowerCase();
                const labelText = await frame.evaluate(el => {
                    const label = document.querySelector(`label[for="${el.id}"]`);
                    return label ? label.textContent.toLowerCase() : "";
                }, input);

                if (id.includes('phone') || type === 'tel' || aria.includes('telefon')) {
                    await input.focus();
                    await input.click({ clickCount: 3 });
                    await input.type(phone || "0701234567", { delay: 20 });
                } else if (id.includes('email') || type === 'email' || aria.includes('e-post')) {
                    await input.focus();
                    await input.click({ clickCount: 3 });
                    await input.type(email, { delay: 20 });
                } else if (type === 'file') {
                    await input.uploadFile(cv);
                } else if (type === 'checkbox' || type === 'radio') {
                    if (labelText.includes('yes') || labelText.includes('ja') || labelText.includes('agree') || labelText.includes('consent')) {
                        const checked = await frame.evaluate(el => el.checked, input);
                        if (!checked) await input.click();
                    }
                }
            }
        }

        let applicationFinished = false;
        let attempts = 0;
        await page.waitForSelector('.jobs-easy-apply-content, .jobs-apply-button', { timeout: 10000 }).catch(() => {});

        while (!applicationFinished && attempts < 12) {
            attempts++;
            await fillFields(page);
            for (const f of page.frames()) { await fillFields(f); }

            const buttons = await page.$$('button, input[type="submit"]');
            let clicked = false;
            for (const btn of buttons) {
                const text = (await page.evaluate(el => el.textContent, btn) || "").trim();
                const aria = (await page.evaluate(el => el.getAttribute('aria-label'), btn) || "").trim();

                if (text.match(/Submit|Done|Finish|Skicka|Lämna|Klar/i) || aria.match(/Submit/i)) {
                    await page.evaluate(el => { el.scrollIntoView(); el.click(); }, btn);
                    applicationFinished = true;
                    clicked = true;
                    await new Promise(r => setTimeout(r, 8000));
                    break;
                } else if (text.match(/Next|Continue|Review|Nästa|Granska|Fortsätt/i) || aria.match(/Next|Review/i)) {
                    await page.evaluate(el => { el.scrollIntoView(); el.click(); }, btn);
                    clicked = true;
                    await new Promise(r => setTimeout(r, 4000));
                    break;
                }
            }
            if (!clicked) break;
        }

        const finalContent = await page.content();
        const success = /thank you|received|success|submitted|tack|mottagits|skickat/i.test(finalContent);
        if (!fs.existsSync('/home/node/.n8n-files')) fs.mkdirSync('/home/node/.n8n-files', { recursive: true });
        await page.screenshot({ path: screenshotPath, fullPage: true });

        console.log(JSON.stringify({
            status: success ? "SUCCESS" : "MANUAL_REQUIRED",
            screenshot: screenshotPath.split('/').pop(),
            version: "V25.0 (Worldwide Sovereign)"
        }));

    } catch (error) {
        console.log(JSON.stringify({ status: "ERROR", message: error.message }));
        try { 
            if (browser && !browser.disconnected) {
               const p = (await browser.pages())[0];
               if (p) await p.screenshot({ path: screenshotPath, fullPage: true }); 
            }
        } catch (e) {}
    } finally {
        if (cleanser) clearInterval(cleanser);
        if (browser) await browser.close();
    }
})();
