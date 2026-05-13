const puppeteer = require('puppeteer-core');
const args = require('minimist')(process.argv.slice(2));
const fs = require('fs');

/**
 * 🌌 DIGYNEX NEURAL ENGINE: SOVEREIGN SHIELD (V25.3 - Ultra Stealth)
 * --------------------------------------------------------------------------
 * Logic: Multi-Language Heuristics + JSESSIONID CSRF + Neural Wipe 2.1 + Mobile Emulation.
 * Capabilities: English, Swedish, German, French, Spanish, Italian, Dutch, Portuguese.
 * Improvements: Bypass Redirect Loops, Mask Webdriver, Cost-Effective Resource Handling.
 */

(async () => {
    const { url, cv, name, email, phone, location, cookie, jsessionid, lastActive, proxyUrl } = args;

    // --- 🛡️ STEALTH: PRESENCE DETECTION ---
    if (lastActive) {
        const now = Date.now();
        const activeTime = new Date(lastActive).getTime();
        if ((now - activeTime) / 1000 / 60 < 10) {
            console.log(JSON.stringify({ status: "ABORTED_PRESENCE_DETECTED", message: "Cooldown active." }));
            process.exit(0);
        }
    }

    const screenshotPath = `/home/node/.n8n-files/apply_${Date.now()}.png`;

    let browser;
    let cleanser;
    try {
        let endpoint = 'ws://browserless:3000';
        if (proxyUrl) endpoint += `?--proxy-server=${proxyUrl}`;

        browser = await puppeteer.connect({
            browserWSEndpoint: endpoint,
            defaultViewport: { width: 390, height: 844 }
        });

        const page = await browser.newPage();

        // --- ⚡ SPEED: RESOURCE INTERCEPTION (V1.1 OPTIMIZATION) ---
        await page.setRequestInterception(true);
        page.on('request', (req) => {
            if (['image', 'font', 'media'].includes(req.resourceType())) req.abort();
            else req.continue();
        });

        // --- 🌍 GLOBAL LOCALIZATION & STEALTH ---
        const localizationMap = {
            'SE': 'Europe/Stockholm', 'DE': 'Europe/Berlin', 'UK': 'Europe/London',
            'FR': 'Europe/Paris', 'IT': 'Europe/Rome', 'ES': 'Europe/Madrid',
            'NL': 'Europe/Amsterdam', 'PT': 'Europe/Lisbon', 'US': 'America/New_York'
        };
        await page.emulateTimezone(localizationMap[location?.toUpperCase()] || 'UTC');
        
        // --- 📱 MOBILE EMULATION (ULTRA STEALTH - V25.3) ---
        await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1');
        await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true });

        // --- 🕵️‍♂️ MANUAL STEALTH: MASK SIGNATURES ---
        await page.evaluateOnNewDocument(() => {
            Object.defineProperty(navigator, 'webdriver', { get: () => false });
            window.chrome = { runtime: {} };
            Object.defineProperty(navigator, 'maxTouchPoints', { get: () => 5 });
        });

        // --- 🔐 SESSION INJECTION (CSRF HARDENED) ---
        if (url && cookie) {
            const domains = ['.linkedin.com', 'se.linkedin.com', 'www.linkedin.com'];
            for (const domain of domains) {
                await page.setCookie({ 
                    name: 'li_at', 
                    value: cookie, 
                    domain: domain, 
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
                        domain: domain, 
                        path: '/', 
                        secure: true,
                        httpOnly: false,
                        sameSite: 'None'
                    });
                }
            }
        }

        await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

        // --- 🧹 NEURAL WIPE 2.1 (STABLE CLEANER) ---
        const performNeuralWipe = async (frame) => {
            try {
                if (frame.isDetached()) return;
                await frame.evaluate(() => {
                    const wipe = (root) => {
                        if (!root) return;
                        root.querySelectorAll('*').forEach(el => {
                            const cls = (el.className || '').toString().toLowerCase();
                            const id = (el.id || '').toLowerCase();
                            if ((cls.includes('cookie') || cls.includes('banner') || id.includes('cookie')) && !el.closest('.jobs-easy-apply-modal')) {
                                el.remove();
                            }
                        });
                    };
                    wipe(document);
                });
            } catch (e) {}
        };

        cleanser = setInterval(async () => { try { await performNeuralWipe(page); } catch (e) {} }, 5000);

        // --- 🧠 MULTI-LANGUAGE FIELD RECOGNITION ---
        async function fillFields(frame) {
            try {
                if (frame.isDetached()) return;
                const firstName = name ? name.split(' ')[0] : "";
                const lastName = name ? name.split(' ').slice(1).join(' ') : "";

                const mapping = [
                    { val: firstName, sel: ['input[name*="first" i]', 'input[aria-label*="first" i]', 'input[aria-label*="Förnamn" i]', 'input[aria-label*="Vorname" i]', 'input[aria-label*="Prénom" i]', 'input[aria-label*="Nombre" i]'] },
                    { val: lastName, sel: ['input[name*="last" i]', 'input[aria-label*="last" i]', 'input[aria-label*="Efternamn" i]', 'input[aria-label*="Nachname" i]', 'input[aria-label*="Nom" i]', 'input[aria-label*="Apellido" i]'] },
                    { val: email, sel: ['input[type="email" i]', 'input[name*="email" i]', 'input[aria-label*="E-post" i]', 'input[aria-label*="E-Mail" i]', 'input[aria-label*="Correo" i]'] },
                    { val: phone, sel: ['input[type="tel" i]', 'input[name*="phone" i]', 'input[aria-label*="Telefon" i]', 'input[aria-label*="Phone" i]'] },
                    { val: location, sel: ['input[name*="location" i]', 'input[name*="city" i]', 'input[aria-label*="Stad" i]', 'input[aria-label*="Stadt" i]', 'input[aria-label*="Ville" i]', 'input[aria-label*="Ciudad" i]'] }
                ];

                for (const item of mapping) {
                    if (!item.val) continue;
                    for (const s of item.sel) {
                        try {
                            const el = await frame.$(s);
                            if (el) {
                                await el.scrollIntoView();
                                await el.click({ clickCount: 3 });
                                await el.type(item.val, { delay: 20 });
                                break;
                            }
                        } catch (e) {}
                    }
                }

                // Global Radio Button Logic (Yes/Ja/Oui/Sì/Sí/Sim)
                const radioGroups = await frame.$$('fieldset, .jobs-easy-apply-form-section__grouping');
                for (const group of radioGroups) {
                    try {
                        const yesButton = await group.evaluateHandle(el => {
                            const labels = Array.from(el.querySelectorAll('label'));
                            return labels.find(l => l.textContent.match(/^\s*(yes|ja|oui|sì|sí|sim|agree|godkänn)\s*$/i));
                        });
                        if (yesButton && yesButton.asElement()) await yesButton.asElement().click();
                    } catch (e) {}
                }

                const fileInputs = await frame.$$('input[type="file"]');
                for (const input of fileInputs) {
                    try { await input.uploadFile(cv); } catch (e) {}
                }
            } catch (e) {}
        }

        // --- 🔘 UNIVERSAL NAVIGATION LOGIC ---
        let applicationFinished = false;
        let attempts = 0;
        const submitKeywords = /Submit|Done|Finish|Skicka|Lämna|Klar|Postuler|Enviar|Invia|Senden|Finalizar|Apply|Ansök|Send|Send application/i;
        const nextKeywords = /Next|Continue|Review|Nästa|Granska|Fortsätt|Suivant|Siguiente|Avanti|Weiter|Continuar|Proceed/i;

        while (!applicationFinished && attempts < 15) {
            attempts++;
            await new Promise(r => setTimeout(r, 4000));
            await fillFields(page);
            for (const f of page.frames()) await fillFields(f);

            // Priority: LinkedIn Global Primary Class
            const buttons = await page.$$('button.artdeco-button--primary, button.jobs-apply-button');
            let clicked = false;

            for (const btn of buttons) {
                try {
                    const text = await page.evaluate(el => el.textContent || '', btn);
                    if (text.match(submitKeywords)) {
                        await btn.click();
                        clicked = true;
                        await new Promise(r => setTimeout(r, 10000));
                        break;
                    } else if (text.match(nextKeywords)) {
                        await btn.click();
                        clicked = true;
                        break;
                    }
                } catch (e) {}
            }

            const content = await page.content();
            const successKeywords = /thank you|received|success|submitted|tack|mottagits|skickat|félicitations|enviada|inviata|erfolgreich/i;
            if (successKeywords.test(content)) {
                applicationFinished = true;
                break;
            }
            if (!clicked) break;
        }

        if (!fs.existsSync('/home/node/.n8n-files')) fs.mkdirSync('/home/node/.n8n-files', { recursive: true });
        await page.screenshot({ path: screenshotPath, fullPage: true });

        console.log(JSON.stringify({
            status: applicationFinished ? "SUCCESS" : "MANUAL_REQUIRED",
            screenshot: screenshotPath.split('/').pop(),
            version: "V25.3 (Sovereign Shield)"
        }));

    } catch (error) {
        console.log(JSON.stringify({ status: "ERROR", message: error.message }));
    } finally {
        if (cleanser) clearInterval(cleanser);
        if (browser) await browser.close();

        // --- 🧹 VPS HEALTH: CV CLEANUP ---
        try { if (cv && fs.existsSync(cv)) fs.unlinkSync(cv); } catch (e) {}
    }
})();
