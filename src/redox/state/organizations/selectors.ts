import { Organization } from './types';
import { RootState } from '@/state/store';

export const selectOrganizationsStatus = (state: RootState) =>
  state.organizations.status;

export const selectAllOrganizations = (state: RootState): Organization[] =>
  Object.values(state.organizations.data);

export const selectOrganization = (
  state: RootState,
  organizationId: number,
): Organization | null =>
  organizationId in state.organizations.data
    ? state.organizations.data[organizationId]
    : null;
