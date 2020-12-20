import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '@/api';

type AsyncThunkBaseParams = {
  token: string;
};

type AsyncThunkPostParams = AsyncThunkBaseParams & {
  data: unknown;
};

type AsyncThunkGetParams = AsyncThunkBaseParams & {
  carePlanId: number;
};

export const getCareTeamHP = createAsyncThunk(
  'patients/getCareTeamHP',
  async ({ token, carePlanId }: AsyncThunkGetParams) => {
    const response = await API(token).get(
      `/care_teams/${carePlanId}/health_professionals/`,
    );
    return { id: carePlanId, healthProfessionals: response.data };
  },
);

export const postCareTeam = createAsyncThunk(
  'patients/postCareTeam',
  async ({ token, data }: AsyncThunkPostParams) => {
    const careTeam = await API(token).post(`care_teams/`, data);
    return careTeam.data;
  },
);
