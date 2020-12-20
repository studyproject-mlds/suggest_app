import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SliceState } from '@/state/store';

import {
  ContactsData,
  PatientContact,
  PatientContacts,
  PatientContactRemoved,
  PatientMedicalContacts,
  PatientMedicalContact,
} from './types';
import {
  getPatientContacts,
  createPatientContact,
  patchPatientContact,
  deletePatientContact,
  getPatientMedicalContacts,
  createPatientMedicalContact,
  patchPatientMedicalContact,
  deletePatientMedicalContact,
} from './thunks';

const initialState: SliceState<ContactsData> = {
  status: 'idle',
  error: null,
  data: {},
};

// we should better split contact && medContact to keep smthg short
const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getPatientContacts.pending, state => {
        state.status = 'loading';
      })
      .addCase(getPatientContacts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(
        getPatientContacts.fulfilled,
        (state, action: PayloadAction<PatientContacts>) => {
          const { patientId, contacts } = action.payload;

          state.status = 'succeeded';
          if (patientId in state.data) {
            state.data[patientId].contacts = contacts;
          } else {
            state.data[patientId] = { contacts, medicalContacts: [] };
          }
        },
      )

      .addCase(createPatientContact.pending, state => {
        state.status = 'loading';
      })
      .addCase(createPatientContact.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(
        createPatientContact.fulfilled,
        (state, action: PayloadAction<PatientContact>) => {
          const { patientId, contact } = action.payload;

          state.status = 'succeeded';
          if (patientId in state.data) {
            state.data[patientId].contacts = [
              ...state.data[patientId].contacts,
              contact,
            ];
          } else {
            state.data[patientId] = {
              contacts: [contact],
              medicalContacts: [],
            };
          }
        },
      )

      .addCase(patchPatientContact.pending, state => {
        state.status = 'loading';
      })
      .addCase(patchPatientContact.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(
        patchPatientContact.fulfilled,
        (state, action: PayloadAction<PatientContact>) => {
          const { patientId, contact } = action.payload;
          const patchedPatientContacts = state.data[patientId].contacts.map(c =>
            c.id === contact.id ? contact : c,
          );

          state.status = 'succeeded';
          state.data[patientId].contacts = patchedPatientContacts;
        },
      )

      .addCase(deletePatientContact.pending, state => {
        state.status = 'loading';
      })
      .addCase(deletePatientContact.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(
        deletePatientContact.fulfilled,
        (state, action: PayloadAction<PatientContactRemoved>) => {
          const { patientId, contactId } = action.payload;
          const filteredPatientContacts = state.data[patientId].contacts.filter(
            c => c.id !== contactId,
          );

          state.status = 'succeeded';
          state.data[patientId].contacts = filteredPatientContacts;
        },
      )

      .addCase(getPatientMedicalContacts.pending, state => {
        state.status = 'loading';
      })
      .addCase(getPatientMedicalContacts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(
        getPatientMedicalContacts.fulfilled,
        (state, action: PayloadAction<PatientMedicalContacts>) => {
          const { patientId, medicalContacts } = action.payload;

          state.status = 'succeeded';
          if (patientId in state.data) {
            state.data[patientId].medicalContacts = medicalContacts;
          } else {
            state.data[patientId] = { contacts: [], medicalContacts };
          }
        },
      )

      .addCase(createPatientMedicalContact.pending, state => {
        state.status = 'loading';
      })
      .addCase(createPatientMedicalContact.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(
        createPatientMedicalContact.fulfilled,
        (state, action: PayloadAction<PatientMedicalContact>) => {
          const { patientId, medicalContact } = action.payload;

          state.status = 'succeeded';
          if (patientId in state.data) {
            state.data[patientId].medicalContacts = [
              ...state.data[patientId].medicalContacts,
              medicalContact,
            ];
          } else {
            state.data[patientId] = {
              contacts: [],
              medicalContacts: [medicalContact],
            };
          }
        },
      )

      .addCase(patchPatientMedicalContact.pending, state => {
        state.status = 'loading';
      })
      .addCase(patchPatientMedicalContact.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(
        patchPatientMedicalContact.fulfilled,
        (state, action: PayloadAction<PatientMedicalContact>) => {
          const { patientId, medicalContact } = action.payload;
          const patchedPatientMedicalContacts = state.data[
            patientId
          ].medicalContacts.map(mc =>
            mc.id === medicalContact.id ? medicalContact : mc,
          );

          state.status = 'succeeded';
          state.data[patientId].medicalContacts = patchedPatientMedicalContacts;
        },
      )

      .addCase(deletePatientMedicalContact.pending, state => {
        state.status = 'loading';
      })
      .addCase(deletePatientMedicalContact.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(
        deletePatientMedicalContact.fulfilled,
        (state, action: PayloadAction<PatientContactRemoved>) => {
          const { patientId, contactId } = action.payload;
          const filteredPatientMedicalContacts = state.data[
            patientId
          ].medicalContacts.filter(mc => mc.id !== contactId);

          state.status = 'succeeded';
          state.data[
            patientId
          ].medicalContacts = filteredPatientMedicalContacts;
        },
      );
  },
});

export default contactsSlice.reducer;
