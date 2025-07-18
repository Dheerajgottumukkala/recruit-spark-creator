// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://taaaolqjyaxhpyrhzcpt.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhYWFvbHFqeWF4aHB5cmh6Y3B0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2NzE3NTYsImV4cCI6MjA2ODI0Nzc1Nn0.l-MEPITeMlh4Dk_rJp3p0FUCbaN0sZGus8erpk-I-44";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});