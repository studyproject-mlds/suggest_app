import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '@/api';

type AsyncThunkBaseParams = {
  token: string;
};

type AsyncThunkGetParams = AsyncThunkBaseParams & {
  id: number;
};

type AsyncThunkPostParams = AsyncThunkBaseParams & {
  data: { patient: number };
};

export const getCarePlansForPatient = createAsyncThunk(
  'patients/getCarePlansForPatient',
  async ({ token, id }: AsyncThunkGetParams) => {
    const response = await API(token).get(`patients/${id}/care_plans/`);
    return { patientId: id, carePlans: response.data };
  },
);

export const postCarePlanForPatient = createAsyncThunk(
  'patients/postCarePlanForPatient',
  async ({ token, data }: AsyncThunkPostParams) => {
    const response = await API(token).post(`care_plans/`, data);
    return { patientId: data.patient, carePlan: response.data };
  },
);
