// --- DIGYNEX NEURAL MOBILE INJECTION ENGINE (V25.8) ---
// MODE: NEURAL_DOMINANCE_ACTIVE + SUCCESS_BRIDGE
 
(function() {
    const STATE = {
        isRunning: true,
        interval: 3000,
        successDetected: false,
        userData: window.DIGYNEX_IDENTITY || {
            name: "DIGYNEX NEURAL PRO",
            email: "neural.verify@digynex.se",
            phone: "+46 790 522 874"
        }
    };
 
    console.log("%c 🌌 DIGYNEX NEURAL DOMINANCE ACTIVE ", "background: #0A2647; color: #C1A172; font-weight: bold; font-size: 18px; padding: 10px; border-radius: 8px;");
    console.log(`[IDENTITY] Synced: ${STATE.userData.email}`);

    const triggerEvents = (el) => {
        ['input', 'change', 'blur'].forEach(evtType => {
            el.dispatchEvent(new Event(evtType, { bubbles: true, cancelable: true }));
        });
    };

    const detectSuccess = () => {
        if (STATE.successDetected) return;

        const successSelectors = [
            '.artdeco-inline-feedback--success',
            '[aria-label="Success"]',
            '.jobs-post-apply-footer',
            '.jp-post-apply-section'
        ];

        const pageText = document.body.innerText.toLowerCase();
        const hasSuccessText = pageText.includes('application submitted') || 
                             pageText.includes('application sent') ||
                             pageText.includes('tack för din ansökan');

        const successEl = successSelectors.find(sel => document.querySelector(sel));

        if (successEl || hasSuccessText) {
            STATE.successDetected = true;
            console.log("%c 🏆 NEURAL HANDSHAKE COMPLETE: SUCCESS DETECTED ", "background: #73BBA3; color: #0A2647; font-weight: bold; font-size: 14px; padding: 5px;");
            
            // SIGNAL: Dispatch to n8n/Supabase Bridge
            const payload = { 
                action: 'JOB_APPLY_SUCCESS',
                user_id: STATE.userData.email, 
                details: {
                    status: 'SUCCESS',
                    method: 'NEURAL_MOBILE_INJECTION',
                    timestamp: new Date().toISOString()
                } 
            };

            // 1. Direct Webhook Dispatch (Kinetic)
            if (window.DIGYNEX_WEBHOOK) {
                fetch(window.DIGYNEX_WEBHOOK, {
                    method: 'POST',
                    mode: 'no-cors', // Bypass CORS for simple fire-and-forget
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                }).catch(e => console.warn("[DIGYNEX] Webhook failed (expected if no-cors)", e));
            }

            // 2. Event Dispatch (Internal)
            window.dispatchEvent(new CustomEvent('DIGYNEX_SUCCESS', { detail: payload }));
        }
    };
 
    const findAndInject = () => {
        if (STATE.successDetected) return;

        const inputs = document.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            const id = (input.id || "").toLowerCase();
            const nameAttr = (input.name || "").toLowerCase();
            const labelEl = document.querySelector(`label[for="${input.id}"]`);
            const labelText = (labelEl ? labelEl.textContent : "").toLowerCase();
            const placeholder = (input.getAttribute('placeholder') || "").toLowerCase();
            
            const fullHint = `${id} ${nameAttr} ${labelText} ${placeholder}`;
 
            // 1. NAME INJECTION
            if (fullHint.includes('name') || fullHint.includes('first')) {
                if (input.value !== STATE.userData.name) {
                    input.focus();
                    input.value = STATE.userData.name;
                    triggerEvents(input);
                    input.style.border = '3px solid #C1A172';
                    input.style.boxShadow = '0 0 15px #C1A172';
                }
            }
 
            // 2. PHONE/EMAIL INJECTION
            if (fullHint.includes('phone') || fullHint.includes('telefon')) {
                if (!input.value || input.value.length < 5) {
                    input.value = STATE.userData.phone;
                    triggerEvents(input);
                }
            }
        });
 
        // 3. SHIELD UPDATE
        const modal = document.querySelector('.jobs-easy-apply-modal, .artdeco-modal');
        if (modal && !document.getElementById('digynex-shield')) {
            const shield = document.createElement('div');
            shield.id = 'digynex-shield';
            shield.innerHTML = '🛡️ NEURAL DOMINANCE: ON';
            shield.style = 'position: absolute; bottom: 80px; left: 50%; transform: translateX(-50%); background: #0A2647; color: #C1A172; font-size: 10px; font-weight: 900; padding: 8px 25px; border-radius: 12px; z-index: 10000; border: 2px solid #C1A172; box-shadow: 0 0 40px rgba(193,161,114,0.6); animation: pulse 2s infinite;';
            modal.appendChild(shield);
        }

        detectSuccess();
    };
 
    const style = document.createElement('style');
    style.innerHTML = '@keyframes pulse { 0% { opacity: 0.8; } 50% { opacity: 1; } 100% { opacity: 0.8; } }';
    document.head.appendChild(style);
 
    setInterval(findAndInject, STATE.interval);
})();
