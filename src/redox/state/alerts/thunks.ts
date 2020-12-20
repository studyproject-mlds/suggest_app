import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '@/api';

type AsyncThunkBaseParams = {
  token: string;
  id: number;
};

type AsyncThunkDeleteParams = AsyncThunkBaseParams & {
  alertId: number;
};

export const getPatientAlerts = createAsyncThunk(
  'patients/getPatientAlerts',
  async ({ token, id }: AsyncThunkBaseParams) => {
    const response = await API(token).get(`patients/${id}/alerts/`);
    return { patientId: id, alerts: response.data };
  },
);

// anciennement 'patchPatientAlert'
// mais appel un delete donc je l'ai renomme
export const deletePatientAlert = createAsyncThunk(
  'patients/deletePatientAlert',
  async ({ token, id, alertId }: AsyncThunkDeleteParams) => {
    await API(token).delete(`patients/${id}/alerts/${alertId}/`);
    return { patientId: id, alertId };
  },
);

export const getPhysicianAlerts = createAsyncThunk(
  'health_professionals/getPatientAlerts',
  async ({ token, id }: AsyncThunkBaseParams) => {
    const response = await API(token).get(
      `health_professionals/${id}/active-alerts/`,
    );
    return { hpId: id, alerts: response.data };
  },
);
