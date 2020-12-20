import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '@/api';
import { PatientParameters } from './types';

type AsyncThunkBaseParams = {
  token: string;
  id: number;
};

type AsyncThunkWithRangeParams = AsyncThunkBaseParams & {
  startDate: string;
  endDate: string;
};

type AsyncThunkPatchParams = AsyncThunkBaseParams & {
  paramsID: number;
  data: PatientParameters;
};

export const getPatientDataViz = createAsyncThunk(
  'data/getDiabetesData',
  async ({ token, id, startDate, endDate }: AsyncThunkWithRangeParams) => {
    const response = await API(token).get(`patients/${id}/dataviz/`, {
      params: { from: startDate, to: endDate },
    });
    return response.data;
  },
);

export const getGlobalStats = createAsyncThunk(
  'data/getGlobalStats',
  async ({ token, id, startDate, endDate }: AsyncThunkWithRangeParams) => {
    const response = await API(token).get(
      `patients/${id}/stats/global_stats/`,
      {
        params: { date_min: startDate, date_max: endDate },
      },
    );
    return response.data;
  },
);

export const getTargetDurationStats = createAsyncThunk(
  'data/getTargetDurationStats',
  async ({ token, id, startDate, endDate }: AsyncThunkWithRangeParams) => {
    const response = await API(token).get(
      `patients/${id}/stats/target_duration_stats/`,
      {
        params: { date_min: startDate, date_max: endDate },
      },
    );
    return response.data;
  },
);

export const getDiabetesParameters = createAsyncThunk(
  'data/getDiabetesParameters',
  async ({ token, id }: AsyncThunkBaseParams) => {
    const response = await API(token).get(
      `patients/${id}/diabetes-parameters/`,
    );
    return response.data[0];
  },
);

export const patchDiabetesParameters = createAsyncThunk(
  'data/patchDiabetesParameters',
  async ({ token, id, paramsID, data }: AsyncThunkPatchParams) => {
    const response = await API(token).patch(
      `patients/${id}/diabetes-parameters/${paramsID}/`,
      data,
    );
    return response.data;
  },
);
