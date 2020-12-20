import API from '@/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../store';
import { postTeamMembershipCarePlanRole } from '../team-membership-careplan-role/thunks';
import { getHealthProfessionalTeamMemberships } from '../health-professionals/thunks';
import { patchUserProfile } from '../users/thunks';
import { getCarePlansForPatient } from '../care-plans/thunks';

type AsyncThunkParams = {
  token: string;
  id: number;
  data: unknown;
};

type AsyncThunkSearchParams = {
  token: string;
  data: unknown;
};

type AsyncThunkDesmosParams = {
  token: string;
  patientId: number;
  params: unknown;
};

export const patchUserProfileAndCreateRole = createAsyncThunk<
  void,
  AsyncThunkParams,
  { dispatch: AppDispatch; state: RootState }
>(
  'ui/patchUserProfileAndCreateRole',
  async (
    { token, id: patientId, data: validFormData }: AsyncThunkParams,
    thunkAPI,
  ) => {
    const { dispatch, getState } = thunkAPI;
    await dispatch(
      patchUserProfile({ token, id: patientId, data: validFormData }),
    );
    await dispatch(getCarePlansForPatient({ token, id: patientId }));
    await dispatch(
      getHealthProfessionalTeamMemberships({
        token,
        id: getState().me.data.user,
      }),
    );

    const healthProfessional = getState().me.data.user;
    const carePlans = getState().carePlans.data[patientId];
    const memberships = getState().healthProfessionals.data[healthProfessional]
      .memberships;

    healthProfessional &&
      carePlans &&
      memberships &&
      (await dispatch(
        postTeamMembershipCarePlanRole({
          token,
          patientId,
          carePlanId: carePlans[0].id,
          data: {
            care_plan: carePlans[0].id,
            membership: memberships[0].id,
            role: 1,
          },
        }),
      ));
  },
);

export const searchPatientByEmail = createAsyncThunk(
  'ui/searchPatientByEmail',
  async ({ token, data }: AsyncThunkSearchParams) => {
    const response = await API(token).get(`users/?email=${data}`);
    const patientEmailFound = response.data[0].email === data;
    const patientBeingAdded = response.data;
    return { patientEmailFound, patientBeingAdded };
  },
);

export const checkPatientExistsInDesmos = createAsyncThunk(
  'ui/checkPatientExistsInDesmos',
  async ({ token, patientId, params }: AsyncThunkDesmosParams) => {
    const response = await API(token).get(
      `patients/${patientId}/desmos/check_patient`,
      {
        params,
      },
    );
    return response.data.patient;
  },
);
