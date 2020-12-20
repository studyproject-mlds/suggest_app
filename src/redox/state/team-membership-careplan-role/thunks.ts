import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '@/api';

type AsyncThunkBaseParams = {
  token: string;
};

type AsyncThunkGetParams = AsyncThunkBaseParams & {
  patientId: number;
  carePlanId: number;
  roleId: number;
};

type AsyncThunkPostParams = AsyncThunkBaseParams & {
  patientId: number;
  carePlanId: number;
  data: unknown;
};

type AsyncThunkDeleteParams = AsyncThunkBaseParams & {
  patientId: number;
  carePlanId: number;
  roleId: number;
};

export const postTeamMembershipCarePlanRole = createAsyncThunk(
  'healthProfessional/postTeamMembershipCarePlanRole',
  async ({ token, patientId, carePlanId, data }: AsyncThunkPostParams) => {
    const response = await API(token).post(
      `patients/${patientId}/care_plans/${carePlanId}/roles/`,
      data,
    );
    return response.data;
  },
);

export const getTeamMembershipCarePlanRoles = createAsyncThunk(
  'healthProfessional/getTeamMembershipCarePlanRole',
  async ({ token, patientId, carePlanId }: AsyncThunkGetParams) => {
    const response = await API(token).get(
      `patients/${patientId}/care_plans/${carePlanId}/roles/`,
    );
    return response.data;
  },
);

export const deleteTeamMembershipCarePlanRole = createAsyncThunk(
  'healthProfessional/deleteTeamMembershipCarePlanRole',
  async ({ token, patientId, carePlanId, roleId }: AsyncThunkDeleteParams) => {
    await API(token).delete(
      `patients/${patientId}/care_plans/${carePlanId}/roles/${roleId}/`,
    );
    return { carePlanId, roleId };
  },
);
