import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SliceState } from '@/state/store';

import { PatientsData, Patient } from './types';
import {
  getPatient,
  patchPatient,
  getPatientsOfHealthProfessional,
} from './thunks';

const initialState: SliceState<PatientsData> = {
  status: 'idle',
  error: null,
  data: {},
};

const patientsSlice = createSlice({
  name: 'patientInfo',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder

      .addCase(getPatient.pending, state => {
        state.status = 'loading';
      })
      .addCase(getPatient.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(
        getPatient.fulfilled,
        (state, action: PayloadAction<Patient>) => {
          const { user: patientId } = action.payload;

          state.status = 'succeeded';
          state.data[patientId] = action.payload;
        },
      )

      .addCase(patchPatient.pending, state => {
        state.status = 'loading';
      })
      .addCase(patchPatient.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(
        patchPatient.fulfilled,
        (state, action: PayloadAction<Patient>) => {
          const { user: patientId } = action.payload;
          state.status = 'succeeded';
          state.data[patientId] = action.payload;
        },
      )

      .addCase(getPatientsOfHealthProfessional.pending, state => {
        state.status = 'loading';
      })
      .addCase(getPatientsOfHealthProfessional.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(
        getPatientsOfHealthProfessional.fulfilled,
        (state, action: PayloadAction<Patient[]>) => {
          const patients = action.payload;

          state.status = 'succeeded';
          for (const patient of patients) {
            state.data[patient.user] = patient;
          }
        },
      );
  },
});

export default patientsSlice.reducer;
