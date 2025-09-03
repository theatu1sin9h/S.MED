import { QRCodeSVG } from 'qrcode.react';
import { format } from 'date-fns';
import type { Appointment, QueueStatus } from '../types';
import { supabase } from '../config/supabase';

export const generateQRCode = (appointment: Appointment): string => {
  const qrData = {
    appointmentId: appointment.id,
    patientId: appointment.patientId,
    hospitalId: appointment.hospitalId,
    queueNumber: appointment.queueNumber,
    date: appointment.date,
    time: appointment.time
  };

  return JSON.stringify(qrData);
};

export const getQueueStatus = async (
  hospitalId: string,
  departmentId: string
): Promise<QueueStatus> => {
  const { data, error } = await supabase
    .from('queue_status')
    .select('*')
    .eq('hospital_id', hospitalId)
    .eq('department_id', departmentId)
    .single();

  if (error) throw error;

  return {
    hospitalId: data.hospital_id,
    departmentId: data.department_id,
    currentNumber: data.current_number,
    totalWaiting: data.total_waiting,
    averageWaitTime: data.average_wait_time,
    lastUpdated: data.last_updated
  };
};

export const estimateWaitTime = (
  currentNumber: number,
  yourNumber: number,
  averageTimePerPatient: number
): number => {
  const patientsAhead = yourNumber - currentNumber;
  return Math.max(0, patientsAhead * averageTimePerPatient);
};

export const formatWaitTime = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} minutes`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours} hour${hours > 1 ? 's' : ''} ${
    remainingMinutes > 0 ? `${remainingMinutes} minutes` : ''
  }`;
};