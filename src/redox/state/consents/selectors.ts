import { RootState } from '@/state/store';

export const selectConsentsStatus = (state: RootState) => state.consents.status;

export const selectPatientConsents = (state: RootState, patientId: number) =>
  patientId in state.consents.data ? state.consents.data[patientId] : null;
