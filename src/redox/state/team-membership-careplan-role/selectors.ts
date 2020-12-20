import { RootState } from '@/state/store';
import { TeamMembershipCarePlanRole } from './types';

export const selectTeamMembershipCarePlanRolesStatus = (state: RootState) =>
  state.teamMembershipCarePlanRoles.status;

export const selectTeamMembershipCarePlanRoles = (
  state: RootState,
  carePlanId: number,
): TeamMembershipCarePlanRole[] =>
  carePlanId in state.teamMembershipCarePlanRoles.data
    ? state.teamMembershipCarePlanRoles.data[carePlanId]
    : [];
