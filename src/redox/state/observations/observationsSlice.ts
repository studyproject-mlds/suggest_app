import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SliceState } from '@/state/store';

import {
  PatientObservation,
  ObservationData,
  PatientObservations,
} from './types';
import { postObservationForPatient, getPatientObservations } from './thunks';

const initialState: SliceState<ObservationData> = {
  status: 'idle',
  error: null,
  data: {},
};

const observationsSlice = createSlice({
  name: 'observations',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(postObservationForPatient.pending, state => {
        state.status = 'loading';
      })
      .addCase(postObservationForPatient.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(
        postObservationForPatient.fulfilled,
        (state, action: PayloadAction<PatientObservation>) => {
          const { patientId, observation } = action.payload;

          state.status = 'succeeded';
          state.data[patientId] = [
            ...(state.data[patientId] ?? {}),
            observation,
          ];
        },
      )

      .addCase(getPatientObservations.pending, state => {
        state.status = 'loading';
      })
      .addCase(getPatientObservations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(
        getPatientObservations.fulfilled,
        (state, action: PayloadAction<PatientObservations>) => {
          const { patientId, observations } = action.payload;

          state.status = 'succeeded';
          state.data[patientId] = observations;
        },
      );
  },
});

export default observationsSlice.reducer;
