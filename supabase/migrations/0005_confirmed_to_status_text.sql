ALTER TABLE registrations
  ALTER COLUMN confirmed TYPE text
  USING CASE WHEN confirmed = true THEN 'confirmed' ELSE NULL END;

ALTER TABLE registrations
  ALTER COLUMN confirmed SET DEFAULT NULL;
