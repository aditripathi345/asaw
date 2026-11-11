import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ENV } from './env';

export let supabaseClient: SupabaseClient | null = null;
export let supabaseAdmin: SupabaseClient | null = null;

if (ENV.SUPABASE_URL && ENV.SUPABASE_ANON_KEY) {
  supabaseClient = createClient(ENV.SUPABASE_URL, ENV.SUPABASE_ANON_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

if (ENV.SUPABASE_URL && (ENV.SUPABASE_SERVICE_ROLE_KEY || ENV.SUPABASE_ANON_KEY)) {
  const adminKey = ENV.SUPABASE_SERVICE_ROLE_KEY || ENV.SUPABASE_ANON_KEY;
  supabaseAdmin = createClient(ENV.SUPABASE_URL, adminKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export const isSupabaseConfigured = (): boolean => {
  return Boolean(ENV.SUPABASE_URL && ENV.SUPABASE_ANON_KEY);
};
