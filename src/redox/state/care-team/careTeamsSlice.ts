import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SliceState } from '@/state/store';

import { CareTeamData, CareGivers } from './types';
import { getCareTeamHP, postCareTeam } from './thunks';

const initialState: SliceState<CareTeamData> = {
  status: 'idle',
  error: null,
  data: {},
};

const careTeamsSlice = createSlice({
  name: 'careTeams',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCareTeamHP.pending, state => {
        state.status = 'loading';
      })
      .addCase(getCareTeamHP.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(
        getCareTeamHP.fulfilled,
        (state, action: PayloadAction<CareGivers>) => {
          const { id, healthProfessionals } = action.payload;

          state.status = 'succeeded';
          if (id in state.data) {
            state.data[id].healthProfessionals = healthProfessionals;
          } else {
            state.data[id] = action.payload;
          }
        },
      )

      .addCase(postCareTeam.pending, state => {
        state.status = 'loading';
      })
      .addCase(postCareTeam.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(
        postCareTeam.fulfilled,
        (state, action: PayloadAction<CareGivers>) => {
          const careTeam = action.payload;

          state.status = 'succeeded';
          state.data[careTeam.id] = careTeam;
        },
      );
  },
});

export default careTeamsSlice.reducer;
