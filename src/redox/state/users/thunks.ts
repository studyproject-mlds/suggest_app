import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import API from '@/api';
import { UserProfile } from './types';

type AsyncThunkBaseParams = {
  token: string;
};

type AsyncThunkGetParams = AsyncThunkBaseParams & {
  id: number;
};

type AsyncThunkPatchParams = AsyncThunkBaseParams & {
  id: number;
  data: unknown;
};

export const getUser = createAsyncThunk(
  'users/getUser',
  async ({ token, id }: AsyncThunkGetParams) => {
    const response = await API(token).get(`users/${id}/`);
    return response.data;
  },
);

export const patchUser = createAsyncThunk(
  'users/patchUser',
  async ({ token, id, data }: AsyncThunkPatchParams) => {
    const response = await API(token).patch(`users/${id}/`, data);
    return response.data;
  },
);

export const getUserProfile = createAsyncThunk(
  'users/getUserProfile',
  async ({ token, id }: AsyncThunkGetParams) => {
    const response = await API(token).get(`profiles/${id}/`);
    return response.data;
  },
);

export const patchUserProfile = createAsyncThunk(
  'users/patchUserProfile',
  async ({ token, id, data }: AsyncThunkPatchParams) => {
    const response = await API(token).patch(`profiles/${id}/`, data);
    return response.data;
  },
);

export const getPatientsProfiles = createAsyncThunk<
  UserProfile[],
  AsyncThunkBaseParams,
  { state: RootState }
>(
  'users/getProfilesOfPatients',
  async ({ token }: AsyncThunkBaseParams, thunkApi) => {
    const { getState } = thunkApi;
    const patients = getState().patients.data;

    const responses = await Promise.all(
      Object.values(patients).map(patient =>
        API(token).get(`profiles/${patient.user}/`),
      ),
    );
    return responses.map(response => response.data) as UserProfile[];
  },
);
