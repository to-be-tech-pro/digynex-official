const https = require('https');

const data = JSON.stringify({
  action: "JOB_APPLY",
  user_id: "amilawijayantha858@gmail.com",
  applicant_email: "amilawijayantha858@gmail.com",
  job_url: "https://www.linkedin.com/jobs/view/4410161187/",
  cookie: "AQEDARLKNjgCuSi1AAABngbi_QEAAAGeKu-BAU0A0SrLoxdfAw8x_AG_I5cALblbyU_4slzC0X7qgs9rYUpTF0_i-7yH3v0_iW-2yH3v0_iW-2",
  details: {
    role: "Information Technology Support Specialist",
    company: "Tech People 247",
    job_url: "https://www.linkedin.com/jobs/view/4410161187/",
    location: "Sweden",
    linkedin_session: "AQEDARLKNjgCuSi1AAABngbi_QEAAAGeKu-BAU0A0SrLoxdfAw8x_AG_I5cALblbyU_4slzC0X7qgs9rYUpTF0_i-7yH3v0_iW-2yH3v0_iW-2"
  }
});

const options = {
  hostname: 'n8n.digynex.se',
  path: '/webhook/neural-bridge',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

console.log('🚀 Dispatching Neural Test Signal to Master Router...');

const req = https.request(options, (res) => {
  console.log(`📡 Status Code: ${res.statusCode}`);
  res.on('data', (d) => {
    console.log('📥 Response:');
    process.stdout.write(d);
  });
});

req.on('error', (error) => {
  console.error('❌ Error sending signal:', error);
});

req.write(data);
req.end();
