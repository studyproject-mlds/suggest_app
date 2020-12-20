import { UserProfile } from '../users/types';

export type uiData = {
  patientEmailFound?: boolean;
  patientBeingAdded?: UserProfile | null;
  patientExistsInDesmos?: unknown;
};
