const https = require('https');

const payload = JSON.stringify({
  action: 'QUICK_APPLY',
  user_id: 'amilawijayantha858@gmail.com',
  details: {
    job_url: 'https://teceze.com/careers', // Real test URL provided by user
    role: 'Test Automation Engineer',
    company: 'Teceze'
  }
});

const options = {
  hostname: 'n8n.digynex.se',
  path: '/webhook/neural-bridge',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': payload.length
  }
};

const req = https.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
});

req.write(payload);
req.end();
