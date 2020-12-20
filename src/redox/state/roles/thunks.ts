import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '@/api';

type AsyncThunkBaseParams = {
  token: string;
};

type AsyncThunkPostParams = AsyncThunkBaseParams & {
  data: unknown;
};

export const postRole = createAsyncThunk(
  'healthProfessional/postRole',
  async ({ token, data }: AsyncThunkPostParams) => {
    const role = await API(token).post(`roles/`, data);
    return role.data;
  },
);

export const getRoles = createAsyncThunk(
  'healthProfessional/getRole',
  async ({ token }: AsyncThunkBaseParams) => {
    const roles = await API(token).get(`roles/`);
    return roles.data;
  },
);
