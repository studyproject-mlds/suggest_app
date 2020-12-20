import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SliceState } from '@/state/store';

import { CarePlanData, PatientCarePlans, PatientCarePlan } from './types';
import { getCarePlansForPatient, postCarePlanForPatient } from './thunks';

const initialState: SliceState<CarePlanData> = {
  status: 'idle',
  error: null,
  data: {},
};

const carePlansSlice = createSlice({
  name: 'carePlans',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCarePlansForPatient.pending, state => {
        state.status = 'loading';
      })
      .addCase(getCarePlansForPatient.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(
        getCarePlansForPatient.fulfilled,
        (state, action: PayloadAction<PatientCarePlans>) => {
          const { patientId, carePlans } = action.payload;

          state.status = 'succeeded';
          state.data[patientId] = carePlans;
        },
      )

      .addCase(postCarePlanForPatient.pending, state => {
        state.status = 'loading';
      })
      .addCase(postCarePlanForPatient.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(
        postCarePlanForPatient.fulfilled,
        (state, action: PayloadAction<PatientCarePlan>) => {
          const { patientId, carePlan } = action.payload;

          state.status = 'succeeded';
          state.data[patientId] = [...state.data[patientId], carePlan];
        },
      );
  },
});

export default carePlansSlice.reducer;
