const { createClient } = require('@supabase/supabase-js')
const dotenv = require('dotenv')

dotenv.config()

// These must be set in Vercel Environment Variables
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_PUBLISHABLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.warn('Missing SUPABASE_URL or SUPABASE_SECRET_KEY environment variables')
}

// We use the SECRET_KEY to bypass RLS in the backend (similar to Prisma's full access)
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

module.exports = supabase
