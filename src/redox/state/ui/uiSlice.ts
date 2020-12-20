import { createSlice } from '@reduxjs/toolkit';
import { SliceState } from '@/state/store';
import {
  patchUserProfileAndCreateRole,
  searchPatientByEmail,
  checkPatientExistsInDesmos,
} from './thunks';
import { uiData } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const initialState: SliceState<uiData> = {
  status: 'idle',
  error: null,
  data: {
    patientEmailFound: false,
    patientBeingAdded: null,
    patientExistsInDesmos: null,
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    resetSearchPatientByEmail(state) {
      state.data.patientBeingAdded = null;
      state.data.patientEmailFound = false;
    },
    resetCheckPatientExistsInDesmos(state) {
      state.data.patientExistsInDesmos = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(patchUserProfileAndCreateRole.pending, state => {
        state.status = 'loading';
      })
      .addCase(patchUserProfileAndCreateRole.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(patchUserProfileAndCreateRole.fulfilled, state => {
        state.status = 'succeeded';
      })

      .addCase(searchPatientByEmail.pending, state => {
        state.status = 'loading';
      })
      .addCase(searchPatientByEmail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(searchPatientByEmail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { patientEmailFound, patientBeingAdded } = action.payload;
        state.data.patientBeingAdded = patientBeingAdded[0];
        state.data.patientEmailFound = patientEmailFound;
      })

      .addCase(checkPatientExistsInDesmos.pending, state => {
        state.status = 'loading';
      })
      .addCase(checkPatientExistsInDesmos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(checkPatientExistsInDesmos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data.patientExistsInDesmos = action.payload;
      });
  },
});

export const {
  resetSearchPatientByEmail,
  resetCheckPatientExistsInDesmos,
} = uiSlice.actions;
export default uiSlice.reducer;
