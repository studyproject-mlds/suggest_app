import { RootState } from '@/state/store';

export const selectCareTeamsStatus = (state: RootState) =>
  state.careTeams.status;

export const selectPatientCareTeams = (state: RootState, carePlanId: number) =>
  state.careTeams.data[carePlanId];

export const selectCareGivers = (state: RootState, carePlanId: number) =>
  carePlanId in state.careTeams.data
    ? state.careTeams.data[carePlanId].healthProfessionals
    : [];
