import { RootState } from '@/state/store';
import { PatientWithUserProfile } from './types';

export const selectPatientStatus = (state: RootState) => state.patients.status;

export const selectPatientDataById = (state: RootState, patientId: number) =>
  state.patients.data[patientId];

export const selectAllPatients = (state: RootState) =>
  Object.values(state.patients.data).map(patient => ({
    ...patient,
    ...state.users.data[patient.user],
  })) as PatientWithUserProfile[];
