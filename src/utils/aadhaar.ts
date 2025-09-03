import { supabase } from '../config/supabase';
import type { AadhaarVerification } from '../types';

export const verifyAadhaar = async (aadhaarNumber: string): Promise<AadhaarVerification> => {
  try {
    // This would connect to the actual UIDAI API in production
    // For demo purposes, we'll simulate the verification
    const mockVerification: AadhaarVerification = {
      status: 'verified',
      aadhaarNumber,
      name: 'John Doe',
      dateOfBirth: '1990-01-01',
      gender: 'M',
      address: '123 Main St, Mumbai, Maharashtra',
      photo: 'https://example.com/photo.jpg',
      verifiedAt: new Date().toISOString()
    };

    // Store verification result
    await supabase
      .from('aadhaar_verifications')
      .insert({
        aadhaar_number: aadhaarNumber,
        status: mockVerification.status,
        name: mockVerification.name,
        date_of_birth: mockVerification.dateOfBirth,
        gender: mockVerification.gender,
        address: mockVerification.address,
        photo: mockVerification.photo,
        verified_at: mockVerification.verifiedAt
      });

    return mockVerification;
  } catch (error) {
    console.error('Aadhaar verification failed:', error);
    throw new Error('Aadhaar verification failed');
  }
};

export const validateAadhaarNumber = (aadhaarNumber: string): boolean => {
  // Basic validation for 12-digit number
  return /^\d{12}$/.test(aadhaarNumber);
};