const http = require('http');
const https = require('https');

const PORT = 3000;
const TARGET_HOST = 'n8n.digynex.se';

const server = http.createServer((req, res) => {
    // Enable CORS for our local app
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            console.log(`\n--- [PROXY] Incoming Request ---`);
            console.log(`Path: ${req.url}`);
            
            // CLEAN HEADERS: Match the working script exactly
            const cleanHeaders = {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(body),
                'User-Agent': 'Neural-Bridge-Agent/1.0' // Custom agent
            };

            console.log(`Sending Headers to n8n:`, cleanHeaders);

            const options = {
                hostname: TARGET_HOST,
                path: req.url,
                method: 'POST',
                headers: cleanHeaders
            };

            const proxyReq = https.request(options, (proxyRes) => {
                console.log(`[PROXY] n8n Response Code: ${proxyRes.statusCode}`);
                
                let resBody = '';
                proxyRes.on('data', d => { resBody += d; });
                proxyRes.on('end', () => {
                    console.log(`[PROXY] n8n Response Body: ${resBody}`);
                    
                    res.writeHead(proxyRes.statusCode, proxyRes.headers);
                    res.end(resBody);
                });
            });

            proxyReq.on('error', (e) => {
                console.error(`[PROXY] ERROR:`, e.message);
                res.writeHead(500);
                res.end(e.message);
            });

            proxyReq.write(body);
            proxyReq.end();
        });
    } else {
        res.writeHead(404);
        res.end();
    }
});

server.listen(PORT, () => {
    console.log(`🚀 Neural Bridge Proxy (Hardened) running at http://localhost:${PORT}`);
    console.log(`Target: https://${TARGET_HOST}`);
    console.log(`Time: ${new Date().toLocaleString('sv-SE', { timeZone: 'Europe/Stockholm' })} (Stockholm Time)`);
});
