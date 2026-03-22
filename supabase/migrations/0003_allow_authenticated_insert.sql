CREATE POLICY "Allow authenticated insert" ON registrations FOR INSERT TO authenticated WITH CHECK (true);
