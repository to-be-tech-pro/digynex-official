const http = require('http');

const data = JSON.stringify({
  user_id: "amilawijayantha858@gmail.com",       // Match both legacy and new names
  applicant_email: "amilawijayantha858@gmail.com",
  job_url: "https://www.linkedin.com/jobs/view/391456789/",
  role: "Neural Automation Specialist",
  company: "DigyNex AI"
});

const options = {
  hostname: '161.97.120.185',
  port: 5678,
  path: '/webhook-test/headless-executor',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

console.log('🦾 Launching Direct Headless Executor Test (Dual-Field Path)...');

const req = http.request(options, (res) => {
  console.log(`📡 Status Code: ${res.statusCode}`);
  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (error) => {
  console.error('❌ Error sending signal:', error);
});

req.write(data);
req.end();
