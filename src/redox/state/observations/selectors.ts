import { RootState } from '@/state/store';

export const selectObservationsStatus = (state: RootState) =>
  state.observations.status;

export const selectPatientObservations = (
  state: RootState,
  patientId: number,
) =>
  patientId in state.observations.data
    ? state.observations.data[patientId]
    : null;
