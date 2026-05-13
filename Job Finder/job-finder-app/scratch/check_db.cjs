const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://ticmdqeyeiycznfzxqrx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpY21kcWV5ZWl5Y3puZnp4cXJ4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDM5MzM3NiwiZXhwIjoyMDg1OTY5Mzc2fQ.Y54g33LRG3SN7tUffj_pE_Ql1b-E8LoTRzp1VmfAwzE'
);

async function run() {
  console.log('🚀 Checking/Adding linkedin_session column...');
  
  // We can't run ALTER TABLE directly via Supabase JS unless we use RPC
  // But we can check if it exists by trying a select
  const { error } = await supabase
    .from('profiles')
    .select('linkedin_session')
    .limit(1);

  if (error && error.code === '42703') {
    console.log('❌ linkedin_session missing. Please run this in Supabase SQL Editor:');
    console.log('ALTER TABLE profiles ADD COLUMN linkedin_session TEXT;');
  } else if (error) {
    console.error('Error:', error);
  } else {
    console.log('✅ linkedin_session column is present.');
  }
}

run();
