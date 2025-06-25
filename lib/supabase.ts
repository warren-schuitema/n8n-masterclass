// Supabase client configuration for N8N Masterclass registration funnel
// Updated: Set up Supabase client with proper configuration

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Registration {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  company?: string;
  automation_experience?: string;
  course_goal?: string;
  stripe_session_id?: string;
  payment_status: 'pending' | 'completed' | 'failed';
  amount_paid?: number;
  registration_date: string;
}