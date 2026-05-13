const https = require('https');

const data = JSON.stringify({
  action: "JOB_APPLY",
  user_id: "amilawijayantha858@gmail.com",
  applicant_email: "amilawijayantha858@gmail.com",
  job_url: "https://www.linkedin.com/jobs/view/4410161187/",
  cookie: "AQEDARLKNjgBQdnXAAABniNKdQcAAAGeR1b5B00AyE92ihlrtXUdOOUPkNKP6gDjQ5rqm0lF0gV3UFyhGPisHzmKte_jaZhQ0e5a3GN261mj0luTLPxaDndg_b9tODbfFER-nAr9Tf1YLqDCy-f-ZDlX",
  jsessionid: "ajax:5644994953927313839",
  details: {
    role: "Information Technology Support Specialist",
    company: "Tech People 247",
    job_url: "https://www.linkedin.com/jobs/view/4410161187/",
    location: "Sweden",
    linkedin_session: "AQEDARLKNjgBQdnXAAABniNKdQcAAAGeR1b5B00AyE92ihlrtXUdOOUPkNKP6gDjQ5rqm0lF0gV3UFyhGPisHzmKte_jaZhQ0e5a3GN261mj0luTLPxaDndg_b9tODbfFER-nAr9Tf1YLqDCy-f-ZDlX",
    linkedin_jsessionid: "ajax:5644994953927313839"
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

console.log('🚀 Dispatching LIVE Neural Test Signal (MOBILE EMULATION MODE)...');

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
