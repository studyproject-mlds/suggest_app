import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '@/api';

type AsyncThunkBaseParams = {
  token: string;
  id: number;
};

type AsyncThunkPostParams = AsyncThunkBaseParams & {
  data: unknown;
  consentId: number;
};

export const getConsents = createAsyncThunk(
  'patients/getConsents',
  async ({ token, id }: AsyncThunkBaseParams) => {
    const response = await API(token).get(`users/${id}/consents/`);
    return { patientId: id, consents: response.data };
  },
);

export const patchConsent = createAsyncThunk(
  'patients/patchConsent',
  async ({ token, id, consentId, data }: AsyncThunkPostParams) => {
    const response = await API(token).patch(
      `users/${id}/consents/${consentId}/`,
      data,
    );
    return { patientId: id, consent: response.data };
  },
);
