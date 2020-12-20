import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SliceState } from '@/state/store';

import { HealthProfessionalsData, HealthProfessional } from './types';
import {
  getHealthProfessional,
  patchHealthProfessional,
  getHealthProfessionalTeamMemberships,
} from './thunks';
import { TeamMembership } from '../team-membership/types';

const initialState: SliceState<HealthProfessionalsData> = {
  status: 'idle',
  error: null,
  data: {},
};

const healthProfessionalsSlice = createSlice({
  name: 'healthProfessionals',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder

      .addCase(getHealthProfessional.pending, state => {
        state.status = 'loading';
      })
      .addCase(getHealthProfessional.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(
        getHealthProfessional.fulfilled,
        (state, action: PayloadAction<HealthProfessional>) => {
          const { user: healthProfessionalId } = action.payload;

          state.status = 'succeeded';
          state.data[healthProfessionalId] = action.payload;
        },
      )

      .addCase(patchHealthProfessional.pending, state => {
        state.status = 'loading';
      })
      .addCase(patchHealthProfessional.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(
        patchHealthProfessional.fulfilled,
        (state, action: PayloadAction<HealthProfessional>) => {
          const { user: healthProfessionalId } = action.payload;
          state.status = 'succeeded';
          state.data[healthProfessionalId] = action.payload;
        },
      )

      .addCase(getHealthProfessionalTeamMemberships.pending, state => {
        state.status = 'loading';
      })
      .addCase(
        getHealthProfessionalTeamMemberships.rejected,
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        },
      )
      .addCase(
        getHealthProfessionalTeamMemberships.fulfilled,
        (
          state,
          action: PayloadAction<
            TeamMembership[],
            string,
            { arg: { id: number } }
          >,
        ) => {
          state.status = 'succeeded';
          const { id: healthProfessionalId } = action.meta.arg;
          state.data[healthProfessionalId].memberships = action.payload;
        },
      );
  },
});

export default healthProfessionalsSlice.reducer;
