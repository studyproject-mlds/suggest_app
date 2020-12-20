import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SliceState } from '@/state/store';

import { ConsentData, PatientConsent, PatientConsents } from './types';
import { getConsents, patchConsent } from './thunks';

const initialState: SliceState<ConsentData> = {
  status: 'idle',
  error: null,
  data: {},
};

const consentsSlice = createSlice({
  name: 'consents',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getConsents.pending, state => {
        state.status = 'loading';
      })
      .addCase(getConsents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(
        getConsents.fulfilled,
        (state, action: PayloadAction<PatientConsents>) => {
          const { patientId, consents } = action.payload;

          state.status = 'succeeded';
          state.data[patientId] = consents;
        },
      )

      .addCase(patchConsent.pending, state => {
        state.status = 'loading';
      })
      .addCase(patchConsent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(
        patchConsent.fulfilled,
        (state, action: PayloadAction<PatientConsent>) => {
          const { patientId, consent } = action.payload;
          const patchedConsents = state.data[patientId].map(cst =>
            cst.id === consent.id ? consent : cst,
          );

          state.status = 'succeeded';
          state.data[patientId] = patchedConsents;
        },
      );
  },
});

export default consentsSlice.reducer;
