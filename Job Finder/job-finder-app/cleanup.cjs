const https = require('https');

const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpY21kcWV5ZWl5Y3puZnp4cXJ4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDM5MzM3NiwiZXhwIjoyMDg1OTY5Mzc2fQ.Y54g33LRG3SN7tUffj_pE_Ql1b-E8LoTRzp1VmfAwzE';
const HOST = 'ticmdqeyeiycznfzxqrx.supabase.co';

async function cleanup() {
  const options = {
    hostname: HOST,
    path: `/rest/v1/user_activity?user_id=eq.amilawijayanthaperera@gmail.com&action=eq.JOB_QUEUED`,
    method: 'DELETE',
    headers: {
      'apikey': API_KEY,
      'Authorization': `Bearer ${API_KEY}`
    }
  };

  const req = https.request(options, (res) => {
    console.log(`Cleanup Status: ${res.statusCode}`);
  });
  req.on('error', console.error);
  req.end();
}

cleanup();
