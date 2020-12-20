import { RootState } from '@/state/store';

export const selectCarePlanRoleStatus = (state: RootState) =>
  state.carePlanRole.status;

export const selectPatientCareTeams = (
  state: RootState,
  patientId: number,
  carePlanId: number,
) =>
  patientId in state.carePlanRole.data &&
  carePlanId in state.carePlanRole.data[patientId]
    ? state.carePlanRole.data[patientId][carePlanId]
    : [];

export const selectPatientCarePlanRoles = (
  state: RootState,
  patientId: number,
  carePlanId: number,
) =>
  patientId in state.carePlanRole.data &&
  carePlanId in state.carePlanRole.data[patientId]
    ? state.carePlanRole.data[patientId][carePlanId].map(
        carePlan => carePlan.role,
      )
    : [];

export const selectPatientCarePlanHealthProfessionalRoles = (
  state: RootState,
  patientId: number,
  carePlanId: number,
  membership: number,
) =>
  patientId in state.carePlanRole.data &&
  carePlanId in state.carePlanRole.data[patientId]
    ? state.carePlanRole.data[patientId][carePlanId].filter(
        carePlanRole => carePlanRole.membership === membership,
      )
    : [];
