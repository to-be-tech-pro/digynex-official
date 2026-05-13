const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://ticmdqeyeiycznfzxqrx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpY21kcWV5ZWl5Y3puZnp4cXJ4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDM5MzM3NiwiZXhwIjoyMDg1OTY5Mzc2fQ.Y54g33LRG3SN7tUffj_pE_Ql1b-E8LoTRzp1VmfAwzE'
);

async function run() {
  const { error } = await supabase
    .from('job_scrapes')
    .insert([
      {
        search_key: 'discovery_se',
        jobs: [
          {
            id: 'real-test-sw-1',
            company: 'LINAF AB',
            title: 'Junior Software Engineer',
            location: 'Stockholm, SE',
            match_score: 99,
            description: 'Real injected job for testing Swedish logic. [V23.1-Logic]',
            url: 'https://se.linkedin.com/jobs/view/4406080000'
          }
        ]
      }
    ]);

  if (error) console.error('Error:', error);
  else console.log('✅ Job Scrape data injected successfully!');
}

run();
