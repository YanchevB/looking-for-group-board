import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient(import.meta.env.VITE_AUTH_URL, import.meta.env.VITE_API_KEY);

export default supabase;