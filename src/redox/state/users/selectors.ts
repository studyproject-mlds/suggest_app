import { RootState } from '@/state/store';

export const selectUserStatus = (state: RootState) => state.users.status;

export const selectUserProfileById = (state: RootState, userId: number) =>
  userId in state.users.data
    ? {
        ...state.users.data[userId].profile,
        email: state.users.data[userId].user.email,
      }
    : null;
