import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SliceState } from '@/state/store';

import { getMe } from './thunks';
import { MeData } from './types';

const initialState: SliceState<MeData> = {
  status: 'idle',
  error: null,
  data: {
    user: 0,
    first_name: '',
    last_name: '',
    phones: [],
    gender: 'male',
    birth_date: '',
    place_of_birth: '',
    marital_status: 'single',
    postal_address: '',
  },
};

const meSlice = createSlice({
  name: 'me',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder

      .addCase(getMe.pending, state => {
        state.status = 'loading';
      })
      .addCase(getMe.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getMe.fulfilled, (state, action: PayloadAction<MeData[]>) => {
        const me = action.payload[0];
        state.data = me;
      });
  },
});

export default meSlice.reducer;
