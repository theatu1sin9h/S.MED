import { agoraClient, getAgoraToken } from '../config/agora';
import type { VideoCall } from '../types';
import { supabase } from '../config/supabase';

export const initializeVideoCall = async (
  appointmentId: string,
  patientId: string,
  doctorId: string
): Promise<VideoCall> => {
  const channelName = `smed_${appointmentId}`;
  const uid = Date.now().toString();
  
  try {
    const token = await getAgoraToken(channelName, uid);
    
    const { data, error } = await supabase
      .from('video_calls')
      .insert({
        appointment_id: appointmentId,
        patient_id: patientId,
        doctor_id: doctorId,
        status: 'waiting',
        channel_name: channelName,
        token
      })
      .select()
      .single();
      
    if (error) throw error;
    
    return {
      id: data.id,
      appointmentId: data.appointment_id,
      patientId: data.patient_id,
      doctorId: data.doctor_id,
      status: data.status,
      channelName: data.channel_name,
      token: data.token
    };
  } catch (error) {
    console.error('Failed to initialize video call:', error);
    throw new Error('Failed to initialize video call');
  }
};

export const joinVideoCall = async (channelName: string, token: string) => {
  try {
    await agoraClient.join(
      import.meta.env.VITE_AGORA_APP_ID,
      channelName,
      token
    );
    
    const localAudioTrack = await agoraClient.createMicrophoneAudioTrack();
    const localVideoTrack = await agoraClient.createCameraVideoTrack();
    
    await agoraClient.publish([localAudioTrack, localVideoTrack]);
    
    return {
      localAudioTrack,
      localVideoTrack
    };
  } catch (error) {
    console.error('Failed to join video call:', error);
    throw new Error('Failed to join video call');
  }
};

export const leaveVideoCall = async () => {
  try {
    agoraClient.remoteUsers.forEach((user) => {
      const playerContainer = document.getElementById(`player-${user.uid}`);
      playerContainer?.remove();
    });
    
    await agoraClient.leave();
  } catch (error) {
    console.error('Failed to leave video call:', error);
    throw new Error('Failed to leave video call');
  }
};