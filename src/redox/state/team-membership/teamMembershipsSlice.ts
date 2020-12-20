import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SliceState } from '@/state/store';
import { TeamMembershipData, TeamMembership } from './types';
import {
  getTeamMemberships,
  postTeamMemberships,
  getTeamMembership,
} from './thunks';

const initialState: SliceState<TeamMembershipData> = {
  status: 'idle',
  error: null,
  data: {},
};

const teamMembershipsSlice = createSlice({
  name: 'teamMemberships',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getTeamMembership.pending, state => {
        state.status = 'loading';
      })
      .addCase(getTeamMembership.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(
        getTeamMembership.fulfilled,
        (state, action: PayloadAction<TeamMembership>) => {
          const teamMembership = action.payload;

          state.status = 'succeeded';
          state.data[teamMembership.id] = teamMembership;
        },
      )

      .addCase(getTeamMemberships.pending, state => {
        state.status = 'loading';
      })
      .addCase(getTeamMemberships.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(
        getTeamMemberships.fulfilled,
        (state, action: PayloadAction<TeamMembership[]>) => {
          const teamMemberships = action.payload;

          state.status = 'succeeded';
          teamMemberships.forEach(teamMembership => {
            state.data[teamMembership.id] = teamMembership;
          });
        },
      )

      .addCase(postTeamMemberships.pending, state => {
        state.status = 'loading';
      })
      .addCase(postTeamMemberships.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(
        postTeamMemberships.fulfilled,
        (state, action: PayloadAction<TeamMembership>) => {
          const teamMembership = action.payload;

          state.status = 'succeeded';
          state.data[teamMembership.id] = teamMembership;
        },
      );
  },
});

export default teamMembershipsSlice.reducer;
