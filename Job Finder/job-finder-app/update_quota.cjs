const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function updateQuota() {
  const { data, error } = await supabase
    .from('profiles')
    .update({ cv_limit: 10000 })
    .eq('email', 'amilawijayantha858@gmail.com');

  if (error) {
    console.error('Error updating quota:', error);
  } else {
    console.log('Quota updated successfully to 10000!');
  }
}

updateQuota();
