const https = require('https');

const jobs = [
  { role: 'Full Stack Developer', company: 'DigyNex Test 1', url: 'https://www.linkedin.com/jobs/view/3910300651/' },
  { role: 'Automation Engineer', company: 'DigyNex Test 2', url: 'https://www.linkedin.com/jobs/view/3910300652/' },
  { role: 'Backend Dev', company: 'DigyNex Test 3', url: 'https://www.linkedin.com/jobs/view/3910300653/' }
];

const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpY21kcWV5ZWl5Y3puZnp4cXJ4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDM5MzM3NiwiZXhwIjoyMDg1OTY5Mzc2fQ.Y54g33LRG3SN7tUffj_pE_Ql1b-E8LoTRzp1VmfAwzE';
const HOST = 'ticmdqeyeiycznfzxqrx.supabase.co';

async function setup() {
  // 1. Update CV limit to 10
  const updateData = JSON.stringify({ cv_limit: 10 });
  await request('PATCH', `/rest/v1/profiles?email=eq.amilawijayantha858@gmail.com`, updateData);
  console.log('Profile Quota Updated.');

  // 2. Inject 3 jobs
  for (const job of jobs) {
    const jobData = JSON.stringify({
      user_id: 'amilawijayantha858@gmail.com',
      action: 'JOB_QUEUED',
      details: {
        job_url: job.url,
        role: job.role,
        company: job.company,
        status: 'pending'
      }
    });
    await request('POST', '/rest/v1/user_activity', jobData);
    console.log(`Job Injected: ${job.role}`);
  }
}

function request(method, path, body) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: HOST,
      path: path,
      method: method,
      headers: {
        'apikey': API_KEY,
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': body.length
      }
    };
    const req = https.request(options, (res) => resolve(res.statusCode));
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

setup();
