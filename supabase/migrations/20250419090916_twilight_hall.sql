/*
  # Initial Schema for S.MED India Platform

  1. Tables
    - users
    - family_members
    - health_records
    - hospitals
    - appointments
    - video_calls
    - queue_status
    - aadhaar_verifications
    - doctor_verifications

  2. Security
    - Enable RLS on all tables
    - Add policies for data access
*/

-- Users table
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  address text,
  blood_group text,
  aadhaar_number text UNIQUE,
  role text NOT NULL CHECK (role IN ('patient', 'doctor', 'admin')),
  specialization text,
  license_number text,
  hospital_affiliation text,
  profile_image text,
  verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Family members table
CREATE TABLE family_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  name text NOT NULL,
  blood_group text,
  phone text,
  relationship text NOT NULL,
  aadhaar_number text,
  created_at timestamptz DEFAULT now()
);

-- Health records table
CREATE TABLE health_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES users(id),
  doctor_id uuid REFERENCES users(id),
  hospital_id uuid REFERENCES hospitals(id),
  diagnosis text NOT NULL,
  symptoms text[] NOT NULL,
  medicines jsonb NOT NULL,
  digital_signature text,
  attachments jsonb,
  follow_up_date timestamptz,
  prescription_qr text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Hospitals table
CREATE TABLE hospitals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  pincode text NOT NULL,
  location point NOT NULL,
  registration_fee numeric NOT NULL,
  doctor_availability text,
  contact_number text NOT NULL,
  emergency_number text,
  facilities text[],
  specialties text[],
  accreditation text[],
  images text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Appointments table
CREATE TABLE appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES users(id),
  doctor_id uuid REFERENCES users(id),
  hospital_id uuid REFERENCES hospitals(id),
  appointment_date date NOT NULL,
  appointment_time time NOT NULL,
  type text NOT NULL CHECK (type IN ('in-person', 'video')),
  status text NOT NULL CHECK (status IN ('scheduled', 'confirmed', 'completed', 'cancelled')),
  qr_code text,
  queue_number integer,
  reason text NOT NULL,
  department text,
  follow_up boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Video calls table
CREATE TABLE video_calls (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_id uuid REFERENCES appointments(id),
  patient_id uuid REFERENCES users(id),
  doctor_id uuid REFERENCES users(id),
  status text NOT NULL CHECK (status IN ('waiting', 'ongoing', 'completed')),
  start_time timestamptz,
  end_time timestamptz,
  channel_name text NOT NULL,
  token text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Queue status table
CREATE TABLE queue_status (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hospital_id uuid REFERENCES hospitals(id),
  department_id text NOT NULL,
  current_number integer NOT NULL,
  total_waiting integer NOT NULL,
  average_wait_time interval NOT NULL,
  last_updated timestamptz DEFAULT now()
);

-- Aadhaar verifications table
CREATE TABLE aadhaar_verifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  status text NOT NULL CHECK (status IN ('pending', 'verified', 'failed')),
  aadhaar_number text NOT NULL,
  name text NOT NULL,
  date_of_birth date NOT NULL,
  gender text NOT NULL,
  address text NOT NULL,
  photo text,
  verified_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Doctor verifications table
CREATE TABLE doctor_verifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id uuid REFERENCES users(id),
  status text NOT NULL CHECK (status IN ('pending', 'verified', 'rejected')),
  license_number text NOT NULL,
  documents jsonb NOT NULL,
  verified_at timestamptz,
  verified_by uuid REFERENCES users(id),
  comments text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE hospitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_calls ENABLE ROW LEVEL SECURITY;
ALTER TABLE queue_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE aadhaar_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctor_verifications ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own data"
  ON users
  FOR SELECT
  USING (auth.uid() = id OR role = 'admin');

CREATE POLICY "Users can update their own data"
  ON users
  FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Family members are viewable by owner"
  ON family_members
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Health records are viewable by patient and doctor"
  ON health_records
  FOR SELECT
  USING (
    auth.uid() = patient_id OR 
    auth.uid() = doctor_id OR 
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Hospitals are viewable by all authenticated users"
  ON hospitals
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Appointments are viewable by involved parties"
  ON appointments
  FOR SELECT
  USING (
    auth.uid() = patient_id OR 
    auth.uid() = doctor_id OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create indexes
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_aadhaar ON users(aadhaar_number);
CREATE INDEX idx_health_records_patient ON health_records(patient_id);
CREATE INDEX idx_health_records_doctor ON health_records(doctor_id);
CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_hospitals_location ON hospitals USING gist(location);
CREATE INDEX idx_queue_status_hospital ON queue_status(hospital_id);