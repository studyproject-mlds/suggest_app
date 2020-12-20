import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '@/api';
import { TaskStatus } from './types';

type AsyncThunkBaseParams = {
  token: string;
  id: number;
  status?: TaskStatus;
};

type AsyncThunkPatchParams = AsyncThunkBaseParams & {
  taskID: number;
  data: unknown;
};

export const getPatientTasks = createAsyncThunk(
  'patients/getPatientTasks',
  async ({ token, id, status }: AsyncThunkBaseParams) => {
    let url = `patients/${id}/tasks/`;
    if (status) {
      url = `${url}?status=${status}`;
    }
    const response = await API(token).get(url);
    return { patientId: id, tasks: response.data };
  },
);

// Un seul patch envisageable ??
export const resolvePatientTasks = createAsyncThunk(
  'patients/resolvePatientTasks',
  async ({ token, id, taskID, data }: AsyncThunkPatchParams) => {
    const response = await API(token).patch(
      `patients/${id}/tasks/${taskID}/`,
      data,
    );
    return { patientId: id, task: response.data };
  },
);

export const movePatientTasks = createAsyncThunk(
  'patients/movePatientTasks',
  async ({ token, id, taskID, data }: AsyncThunkPatchParams) => {
    const response = await API(token).patch(
      `patients/${id}/tasks/${taskID}/`,
      data,
    );
    return { patientId: id, task: response.data };
  },
);
