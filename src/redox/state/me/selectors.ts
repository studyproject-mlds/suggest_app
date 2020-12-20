import { UserProfile } from '../users/types';
import { RootState } from '@/state/store';

export const selectMeStatus = (state: RootState) => state.me.status;

export const selectMe = (state: RootState): UserProfile | null =>
  state.me.data.user !== 0 ? state.me.data : null;
