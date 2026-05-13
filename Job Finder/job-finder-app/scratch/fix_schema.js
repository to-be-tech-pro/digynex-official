import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://ticmdqeyeiycznfzxqrx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpY21kcWV5ZWl5Y3puZnp4cXJ4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDM5MzM3NiwiZXhwIjoyMDg1OTY5Mzc2fQ.Y54g33LRG3SN7tUffj_pE_Ql1b-E8LoTRzp1VmfAwzE'
);

async function fixSchema() {
  console.log('Attempting to add column via RPC...');
  // Note: This requires the 'sql' RPC function to be enabled in Supabase
  const { data, error } = await supabase.rpc('sql', {
    query: 'ALTER TABLE profiles ADD COLUMN IF NOT EXISTS linkedin_session TEXT;'
  });

  if (error) {
    console.error('RPC Error:', error);
    console.log('Trying alternative: checking if column exists...');
  } else {
    console.log('✅ Column added successfully via RPC!');
  }
}

fixSchema();
