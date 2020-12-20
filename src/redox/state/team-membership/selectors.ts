import { RootState } from '@/state/store';

export const selectTeamMembershipStatus = (state: RootState) =>
  state.teamMemberships.status;

export const selectAllTeamMemberships = (state: RootState) =>
  state.teamMemberships.data;

export const selectHealthProfessionalTeamMemberships = (
  state: RootState,
  hpID: number,
) => state.teamMemberships.data[hpID] ?? null;
