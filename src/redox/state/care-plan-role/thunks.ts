import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '@/api';

type AsyncThunkBaseParams = {
  token: string;
  id: number;
  carePlanID: number;
};

type AsyncThunkPostParams = AsyncThunkBaseParams & {
  membershipID: number;
  roleID: number;
};

type AsyncThunkDeleteParams = AsyncThunkBaseParams & {
  carePlanRoleID: number;
  roleID: number;
};

export const getCarePlanRoles = createAsyncThunk(
  'patients/getMembershipRoles',
  async ({ token, id, carePlanID }: AsyncThunkBaseParams) => {
    const roles = await API(token).get(
      `patients/${id}/care_plans/${carePlanID}/roles/`,
    );
    return { patientId: id, carePlanID, roles: roles.data };
  },
);

export const createMembershipRole = createAsyncThunk(
  'patients/createMembershipRole',
  async ({
    token,
    id,
    carePlanID,
    membershipID,
    roleID,
  }: AsyncThunkPostParams) => {
    const role = await API(token).post(
      `patients/${id}/care_plans/${carePlanID}/roles/`,
      {
        membership: membershipID,
        care_plan: carePlanID,
        role: roleID,
      },
    );
    return { patientId: id, carePlanID, role: role.data };
  },
);

export const deleteMembershipRole = createAsyncThunk(
  'patients/deleteMembershipRole',
  async ({
    token,
    id,
    carePlanID,
    carePlanRoleID,
    roleID,
  }: AsyncThunkDeleteParams) => {
    await API(token).delete(
      `patients/${id}/care_plans/${carePlanID}/roles/${carePlanRoleID}/`,
    );
    return { patientId: id, carePlanID, roleID };
  },
);
