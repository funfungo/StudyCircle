ALTER TABLE registrations ADD COLUMN IF NOT EXISTS confirmed boolean DEFAULT false;

CREATE POLICY "Allow authenticated update" ON registrations
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
