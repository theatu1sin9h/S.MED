export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  bloodGroup: string;
  aadhaarNumber?: string;
  role: UserRole;
  specialization?: string;
  licenseNumber?: string;
  hospitalAffiliation?: string;
  profileImage?: string;
  verified: boolean;
}

export type UserRole = 'patient' | 'doctor' | 'admin';

export interface FamilyMember {
  id: string;
  name: string;
  bloodGroup: string;
  phone: string;
  relationship: string;
  aadhaarNumber?: string;
}

export interface HealthRecord {
  id: string;
  date: string;
  patientName: string;
  patientId: string;
  symptoms: string[];
  diagnosis: string;
  medicines: Medicine[];
  doctorName: string;
  doctorId: string;
  hospitalName: string;
  hospitalId: string;
  digitalSignature: string;
  attachments?: Attachment[];
  followUpDate?: string;
  prescriptionQR?: string;
}

export interface Medicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
}

export interface Attachment {
  id: string;
  type: 'report' | 'prescription' | 'image' | 'other';
  url: string;
  name: string;
  uploadedAt: string;
}

export interface Hospital {
  id: string;
  name: string;
  category: HospitalCategory;
  address: string;
  city: string;
  state: string;
  pincode: string;
  location: {
    lat: number;
    lng: number;
  };
  registrationFee: number;
  doctorAvailability: string;
  contactNumber: string;
  emergencyNumber?: string;
  facilities: string[];
  specialties: string[];
  accreditation?: string[];
  images?: string[];
  currentQueueNumber?: number;
  estimatedWaitTime?: number;
}

export type HospitalCategory = 
  | 'Government'
  | 'Private'
  | 'Teaching'
  | 'Specialty'
  | 'Community Health Center'
  | 'Primary Health Center'
  | 'Multi-Specialty'
  | 'AYUSH';

export interface DiagnosticResult {
  possibleDiagnosis: string;
  reasons: string[];
  precautions: string[];
  remedies: string[];
  bodySystem: BodySystem;
  severity: 'low' | 'medium' | 'high';
  recommendedSpecialist?: string;
}

export type BodySystem = 
  | 'Cardiovascular'
  | 'Respiratory'
  | 'Digestive'
  | 'Nervous'
  | 'Muscular'
  | 'Skeletal'
  | 'Integumentary'
  | 'Endocrine'
  | 'Lymphatic'
  | 'Urinary'
  | 'Reproductive';

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  hospitalId: string;
  date: string;
  time: string;
  type: 'in-person' | 'video';
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  qrCode?: string;
  queueNumber?: number;
  reason: string;
  department?: string;
  followUp?: boolean;
}

export interface VideoCall {
  id: string;
  appointmentId: string;
  patientId: string;
  doctorId: string;
  status: 'waiting' | 'ongoing' | 'completed';
  startTime?: string;
  endTime?: string;
  channelName: string;
  token: string;
}

export interface QueueStatus {
  hospitalId: string;
  departmentId: string;
  currentNumber: number;
  totalWaiting: number;
  averageWaitTime: number;
  lastUpdated: string;
}

export interface AadhaarVerification {
  status: 'pending' | 'verified' | 'failed';
  aadhaarNumber: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  photo: string;
  verifiedAt?: string;
}

export interface DoctorVerification {
  status: 'pending' | 'verified' | 'rejected';
  doctorId: string;
  licenseNumber: string;
  documents: {
    medicalDegree?: string;
    licenseProof?: string;
    identityProof?: string;
  };
  verifiedAt?: string;
  verifiedBy?: string;
  comments?: string;
}

export interface AdminDashboardStats {
  totalPatients: number;
  totalDoctors: number;
  totalHospitals: number;
  activeAppointments: number;
  pendingVerifications: number;
  recentRegistrations: User[];
  appointmentsByType: {
    inPerson: number;
    video: number;
  };
  appointmentsByStatus: {
    scheduled: number;
    completed: number;
    cancelled: number;
  };
}