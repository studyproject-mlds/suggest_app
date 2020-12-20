import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SliceState } from '@/state/store';

import { User, UserProfile, UsersData } from '@/state/users/types';
import {
  getUser,
  patchUser,
  getUserProfile,
  patchUserProfile,
  getPatientsProfiles,
} from './thunks';

const initialState: SliceState<UsersData> = {
  status: 'idle',
  error: null,
  data: {
    0: {
      user: {
        id: 0,
        auth_id: '',
        user_type: 'patient',
        email: '',
        last_login: '',
        is_superuser: false,
        is_active: false,
        groups: [],
        user_permissions: [],
      },
      profile: {
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
    },
  },
};

const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getUser.fulfilled, (state, action: PayloadAction<User>) => {
        const { id: userId } = action.payload;
        state.status = 'succeeded';
        if (userId in state.data) {
          state.data[userId].user = action.payload;
        } else {
          state.data[userId] = {
            user: action.payload,
            profile: state.data[0].profile,
          };
        }
      })

      .addCase(patchUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(patchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(patchUser.fulfilled, (state, action: PayloadAction<User>) => {
        const { id: userId } = action.payload;
        state.status = 'succeeded';
        state.data[userId].user = action.payload;
      })

      .addCase(getUserProfile.pending, state => {
        state.status = 'loading';
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(
        getUserProfile.fulfilled,
        (state, action: PayloadAction<UserProfile>) => {
          const { user: userId } = action.payload;
          state.status = 'succeeded';
          if (userId in state.data) {
            state.data[userId].profile = action.payload;
          } else {
            state.data[userId] = {
              profile: action.payload,
              user: state.data[0].user,
            };
          }
        },
      )

      .addCase(patchUserProfile.pending, state => {
        state.status = 'loading';
      })
      .addCase(patchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(
        patchUserProfile.fulfilled,
        (state, action: PayloadAction<UserProfile>) => {
          const { user: userId } = action.payload;
          state.status = 'succeeded';
          if (userId in state.data) {
            state.data[userId].profile = action.payload;
          } else {
            state.data[userId] = {
              profile: action.payload,
              user: state.data[0].user,
            };
          }
        },
      )

      .addCase(getPatientsProfiles.pending, state => {
        state.status = 'loading';
      })
      .addCase(getPatientsProfiles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(
        getPatientsProfiles.fulfilled,
        (state, action: PayloadAction<UserProfile[]>) => {
          const profiles = action.payload;
          state.status = 'succeeded';

          for (const profile of profiles) {
            if (profile.user in state.data) {
              state.data[profile.user].profile = profile;
            } else {
              state.data[profile.user] = {
                profile: profile,
                user: state.data[0].user,
              };
            }
          }
        },
      );
  },
});

export default usersSlice.reducer;
