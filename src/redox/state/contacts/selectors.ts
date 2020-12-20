import { RootState } from '@/state/store';

export const selectContactsStatus = (state: RootState) => state.contacts.status;

export const selectPatientContacts = (state: RootState, patientId: number) =>
  patientId in state.contacts.data
    ? state.contacts.data[patientId].contacts
    : null;

export const selectPatientMedicalContacts = (
  state: RootState,
  patientId: number,
) =>
  patientId in state.contacts.data
    ? state.contacts.data[patientId].medicalContacts
    : null;
