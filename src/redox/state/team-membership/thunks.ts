import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '@/api';

type AsyncThunkBaseParams = {
  token: string;
};

type AsyncThunkGetParams = AsyncThunkBaseParams & {
  healthProfessionalId: number;
  membershipId?: number;
};

type AsyncThunkPostParams = AsyncThunkBaseParams & {
  data: unknown;
};

export const getTeamMembership = createAsyncThunk(
  'healthProfessional/getTeamMembership',
  async ({ token, membershipId }: AsyncThunkGetParams) => {
    const teamMembership = await API(token).get(
      `team_memberships/${membershipId}/`,
    );
    return teamMembership.data;
  },
);

export const getTeamMemberships = createAsyncThunk(
  'healthProfessional/getTeamMemberships',
  async ({ token }: AsyncThunkBaseParams) => {
    const teamMemberships = await API(token).get(`team_memberships/`);
    return teamMemberships.data;
  },
);

export const postTeamMemberships = createAsyncThunk(
  'healthProfessional/postTeamMemberships',
  async ({ token, data }: AsyncThunkPostParams) => {
    const teamMembership = await API(token).post(`team_memberships/`, data);
    return teamMembership.data;
  },
);
