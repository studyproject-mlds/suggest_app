import { RootState } from '@/state/store';

export const selectCarePlansStatus = (state: RootState) =>
  state.carePlans.status;

export const selectPatientCarePlans = (state: RootState, patientId: number) =>
  patientId in state.carePlans.data ? state.carePlans.data[patientId] : [];
