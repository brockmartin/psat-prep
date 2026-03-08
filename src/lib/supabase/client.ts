import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const isConfigured = supabaseUrl && supabaseKey && !supabaseUrl.includes('placeholder')

export function createClient() {
  if (!isConfigured) {
    return null
  }
  return createBrowserClient(supabaseUrl, supabaseKey)
}
