import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '@/api';

type AsyncThunkBaseParams = {
  token: string;
};

type AsyncThunkGetParams = AsyncThunkBaseParams & {
  id: number;
};

type AsyncThunkPostParams = AsyncThunkBaseParams & {
  data: unknown;
};

export const postOrganization = createAsyncThunk(
  'organization/postOrganization',
  async ({ token, data }: AsyncThunkPostParams) => {
    const organization = await API(token).post(`organizations/`, data);
    return organization.data;
  },
);

export const getOrganization = createAsyncThunk(
  'organization/getOrganization',
  async ({ token, id }: AsyncThunkGetParams) => {
    const organization = await API(token).get(`organizations/${id}/`);
    return organization.data;
  },
);
