import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SliceState } from '@/state/store';

import { getOrganization, postOrganization } from './thunks';
import { Organization, OrganizationData } from './types';

const initialState: SliceState<OrganizationData> = {
  status: 'idle',
  error: null,
  data: {},
};

const organizationsSlice = createSlice({
  name: 'organizations',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder

      .addCase(getOrganization.pending, state => {
        state.status = 'loading';
      })
      .addCase(getOrganization.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(
        getOrganization.fulfilled,
        (state, action: PayloadAction<Organization>) => {
          const organization = action.payload;
          state.data[organization.id] = organization;
        },
      )

      .addCase(postOrganization.pending, state => {
        state.status = 'loading';
      })
      .addCase(postOrganization.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(
        postOrganization.fulfilled,
        (state, action: PayloadAction<Organization>) => {
          const organization = action.payload;
          state.data[organization.id] = organization;
        },
      );
  },
});

export default organizationsSlice.reducer;
