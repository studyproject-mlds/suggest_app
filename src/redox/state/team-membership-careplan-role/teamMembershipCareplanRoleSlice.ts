import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SliceState } from '@/state/store';
import {
  TeamMembershipCarePlanRoleData,
  TeamMembershipCarePlanRole,
  TeamMembershipCarePlanRoleRemoved,
} from './types';
import {
  postTeamMembershipCarePlanRole,
  getTeamMembershipCarePlanRoles,
  deleteTeamMembershipCarePlanRole,
} from './thunks';

const initialState: SliceState<TeamMembershipCarePlanRoleData> = {
  status: 'idle',
  error: null,
  data: {},
};

const teamMembershipCareplanRoleSlice = createSlice({
  name: 'teamMembershipCareplanRoles',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(postTeamMembershipCarePlanRole.pending, state => {
        state.status = 'loading';
      })
      .addCase(postTeamMembershipCarePlanRole.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(
        postTeamMembershipCarePlanRole.fulfilled,
        (state, action: PayloadAction<TeamMembershipCarePlanRole>) => {
          const carePlanRole = action.payload;

          state.status = 'succeeded';
          if (carePlanRole.id in state.data) {
            state.data[carePlanRole.id] = [
              ...state.data[carePlanRole.id],
              carePlanRole,
            ];
          } else {
            state.data[carePlanRole.id] = [carePlanRole];
          }
        },
      )

      .addCase(getTeamMembershipCarePlanRoles.pending, state => {
        state.status = 'loading';
      })
      .addCase(getTeamMembershipCarePlanRoles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(
        getTeamMembershipCarePlanRoles.fulfilled,
        (
          state,
          action: PayloadAction<
            TeamMembershipCarePlanRole[],
            string,
            { arg: { carePlanId: number } }
          >,
        ) => {
          state.status = 'succeeded';
          const { carePlanId } = action.meta.arg;
          const teamMembershipCareplanRoles = action.payload;
          for (const role of teamMembershipCareplanRoles) {
            if (carePlanId in state.data) {
              state.data[carePlanId] = [...state.data[carePlanId], role];
            } else {
              state.data[carePlanId] = [role];
            }
          }
        },
      )

      .addCase(deleteTeamMembershipCarePlanRole.pending, state => {
        state.status = 'loading';
      })
      .addCase(deleteTeamMembershipCarePlanRole.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(
        deleteTeamMembershipCarePlanRole.fulfilled,
        (state, action: PayloadAction<TeamMembershipCarePlanRoleRemoved>) => {
          const { carePlanId, roleId } = action.payload;
          const filteredRoles = state.data[carePlanId].filter(
            role => role.id !== roleId,
          );

          state.status = 'succeeded';
          state.data[carePlanId] = filteredRoles;
        },
      );
  },
});

export default teamMembershipCareplanRoleSlice.reducer;
