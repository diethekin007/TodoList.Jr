const { createClient } = require('@supabase/supabase-js')
const dotenv = require('dotenv')

dotenv.config()

let supabaseInstance = null;

const getSupabase = () => {
  if (supabaseInstance) return supabaseInstance;

  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_PUBLISHABLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase Configuration Missing: Please set SUPABASE_URL and SUPABASE_SECRET_KEY in Vercel Environment Variables.')
  }

  supabaseInstance = createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
  
  return supabaseInstance;
}

// Use a Proxy so we don't crash on Vercel cold boot if Env Vars are missing
const supabaseProxy = new Proxy({}, {
  get: function(target, prop) {
    return getSupabase()[prop];
  }
});

module.exports = supabaseProxy
