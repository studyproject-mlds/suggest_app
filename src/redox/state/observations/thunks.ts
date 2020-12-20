import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '@/api';

type AsyncThunkBaseParams = {
  token: string;
};

type AsyncThunkPostParams = AsyncThunkBaseParams & {
  data: {
    recipient_id: number;
    call_happened?: boolean;
    analysis_description?: string;
    message_text?: string;
  };
};

type AsyncThunkGetParams = AsyncThunkBaseParams & {
  id: number;
};

export const postObservationForPatient = createAsyncThunk(
  'patients/postObservationForPatient',
  async ({ token, data }: AsyncThunkPostParams) => {
    const response = await API(token).post(`observations/`, {
      ...data,
    });
    return { patientId: data.recipient_id, observation: response.data };
  },
);

export const getPatientObservations = createAsyncThunk(
  'patients/getPatientObservations',
  async ({ token, id }: AsyncThunkGetParams) => {
    const observations = await API(token).get(`observations/?recipient=${id}`);
    return { patientId: id, observations: observations.data };
  },
);
