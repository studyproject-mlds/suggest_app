import { Role, RoleData } from './types';
import { RootState } from '@/state/store';

export const selectOrganizationsStatus = (state: RootState) =>
  state.roles.status;

export const selectAllRoles = (state: RootState): RoleData => state.roles.data;

export const selectRole = (state: RootState, roleId: number): Role =>
  state.roles.data[roleId];
