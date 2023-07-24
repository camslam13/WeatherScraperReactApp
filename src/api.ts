import axios from 'axios';
import { WaveTideData } from './types';

export const getWavesTideInfo = async (location: string): Promise<WaveTideData> => {
  try {
    const response = await axios.get(`/api/waves-tide-info?location=${encodeURIComponent(location)}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching data from the server.');
  }
};
