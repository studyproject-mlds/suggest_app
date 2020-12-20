import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '@/api';

type AsyncThunkBaseParams = {
  token: string;
};

type AsyncThunkParams = AsyncThunkBaseParams & {
  id: number;
  data?: unknown;
};

export const getHealthProfessional = createAsyncThunk(
  'health_professionals/getHealthProfessional',
  async ({ token, id }: AsyncThunkParams) => {
    const response = await API(token).get(`health_professionals/${id}/`);
    return response.data;
  },
);

export const patchHealthProfessional = createAsyncThunk(
  'health_professionals/patchHealthProfessional',
  async ({ token, id, data }: AsyncThunkParams) => {
    const response = await API(token).patch(
      `health_professionals/${id}/`,
      data,
    );
    return response.data;
  },
);

export const getHealthProfessionalTeamMemberships = createAsyncThunk(
  'health_professionals/getHealthProfessionalTeamMemberships',
  async ({ token, id }: AsyncThunkParams) => {
    const response = await API(token).get(
      `health_professionals/${id}/memberships/`,
    );
    return response.data;
  },
);
