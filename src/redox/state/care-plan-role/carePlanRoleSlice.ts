import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SliceState } from '@/state/store';

import { TeamRoles, TeamRole, TeamRoleDeleted, TeamRolesData } from './types';
import {
  getCarePlanRoles,
  createMembershipRole,
  deleteMembershipRole,
} from './thunks';

const initialState: SliceState<TeamRolesData> = {
  status: 'idle',
  error: null,
  data: {},
};

const carePlanRoleSlice = createSlice({
  name: 'carePlanRole',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCarePlanRoles.pending, state => {
        state.status = 'loading';
      })
      .addCase(getCarePlanRoles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(
        getCarePlanRoles.fulfilled,
        (state, action: PayloadAction<TeamRoles>) => {
          const { patientId, carePlanID, roles } = action.payload;

          state.status = 'succeeded';
          if (patientId in state.data) {
            state.data[patientId][carePlanID] = roles;
          } else {
            // error if I try a one-liner
            state.data[patientId] = {};
            state.data[patientId][carePlanID] = roles;
          }
        },
      )

      .addCase(createMembershipRole.pending, state => {
        state.status = 'loading';
      })
      .addCase(createMembershipRole.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(
        createMembershipRole.fulfilled,
        (state, action: PayloadAction<TeamRole>) => {
          const { patientId, carePlanID, role } = action.payload;

          state.status = 'succeeded';
          if (patientId in state.data) {
            if (carePlanID in state.data[patientId]) {
              state.data[patientId][carePlanID] = [
                ...state.data[patientId][carePlanID],
                role,
              ];
            } else {
              state.data[patientId][carePlanID] = [role];
            }
          } else {
            state.data[patientId] = {};
            state.data[patientId][carePlanID] = [role];
          }
        },
      )

      .addCase(deleteMembershipRole.pending, state => {
        state.status = 'loading';
      })
      .addCase(deleteMembershipRole.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(
        deleteMembershipRole.fulfilled,
        (state, action: PayloadAction<TeamRoleDeleted>) => {
          const { patientId, carePlanID, roleID } = action.payload;
          const filteredTeamRoles = state.data[patientId][carePlanID].filter(
            role => role.id !== roleID,
          );

          state.status = 'succeeded';
          state.data[patientId][carePlanID] = filteredTeamRoles;
        },
      );
  },
});

export default carePlanRoleSlice.reducer;
