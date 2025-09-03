import { createClient, ClientConfig } from 'agora-rtc-sdk-ng';

const config: ClientConfig = {
  mode: 'rtc',
  codec: 'vp8',
};

export const agoraClient = createClient(config);

export const getAgoraToken = async (channelName: string, uid: string): Promise<string> => {
  const response = await fetch(`/api/agora-token?channelName=${channelName}&uid=${uid}`);
  const data = await response.json();
  return data.token;
};