import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '@/api';

type AsyncThunkParams = {
  token: string;
  id: number;
  data?: unknown;
};

export const getPatient = createAsyncThunk(
  'patients/getPatient',
  async ({ token, id }: AsyncThunkParams) => {
    const response = await API(token).get(`patients/${id}/`);
    return response.data;
  },
);

export const patchPatient = createAsyncThunk(
  'patients/patchPatient',
  async ({ token, id, data }: AsyncThunkParams) => {
    const response = await API(token).patch(`patients/${id}/`, data);
    return response.data;
  },
);

export const getPatientsOfHealthProfessional = createAsyncThunk(
  'patients/getPatientsOfHealthProfessional',
  async ({ token, id }: AsyncThunkParams) => {
    const response = await API(token).get(
      `health_professionals/${id}/patients/`,
    );
    return response.data;
  },
);
