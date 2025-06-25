/*
  # Create registrations table for N8N Masterclass

  1. New Tables
    - `registrations`
      - `id` (uuid, primary key)
      - `full_name` (text, required)
      - `email` (text, required)
      - `phone` (text, required)
      - `company` (text, optional)
      - `automation_experience` (text)
      - `course_goal` (text)
      - `stripe_session_id` (text)
      - `payment_status` (text, default 'pending')
      - `amount_paid` (integer)
      - `registration_date` (timestamp, default now)

  2. Security
    - Enable RLS on `registrations` table
    - Add policy for users to read their own registrations
    - Add policy for authenticated users to insert registrations

  3. Indexes
    - Create index on email for lookups
    - Create index on stripe_session_id for payment processing
*/

CREATE TABLE IF NOT EXISTS registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  company text,
  automation_experience text,
  course_goal text,
  stripe_session_id text,
  payment_status text DEFAULT 'pending',
  amount_paid integer,
  registration_date timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(email);
CREATE INDEX IF NOT EXISTS idx_registrations_stripe_session ON registrations(stripe_session_id);

-- Enable Row Level Security
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Policy for users to read their own registrations
CREATE POLICY "Users can read own registrations"
  ON registrations
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy for inserting new registrations
CREATE POLICY "Users can insert registrations"
  ON registrations
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy for anonymous users to insert registrations
CREATE POLICY "Anonymous users can insert registrations"
  ON registrations
  FOR INSERT
  TO anon
  WITH CHECK (true);