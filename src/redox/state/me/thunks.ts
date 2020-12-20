import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '@/api';

type AsyncThunkBaseParams = {
  token: string;
};

export const getMe = createAsyncThunk(
  'healthProfessional/getMe',
  async ({ token }: AsyncThunkBaseParams) => {
    const me = await API(token).get('me/');
    return me.data;
  },
);
