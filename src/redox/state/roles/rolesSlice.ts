import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SliceState } from '@/state/store';
import { Role, RoleData } from './types';
import { getRoles, postRole } from './thunks';

const initialState: SliceState<RoleData> = {
  status: 'idle',
  error: null,
  data: {},
};

const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getRoles.pending, state => {
        state.status = 'loading';
      })
      .addCase(getRoles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getRoles.fulfilled, (state, action: PayloadAction<Role[]>) => {
        const roles = action.payload;

        state.status = 'succeeded';
        for (const role of roles) {
          state.data[role.id] = role;
        }
      })

      .addCase(postRole.pending, state => {
        state.status = 'loading';
      })
      .addCase(postRole.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(postRole.fulfilled, (state, action: PayloadAction<Role>) => {
        const role = action.payload;

        state.status = 'succeeded';
        state.data[role.id] = role;
      });
  },
});

export default rolesSlice.reducer;
