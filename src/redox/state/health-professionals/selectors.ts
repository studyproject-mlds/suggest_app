import { RootState } from '@/state/store';
import {
  HealthProfessionalWithPatients,
  HealthProfessionalsData,
} from './types';

export const selectDiabetesStatus = (state: RootState) =>
  state.healthProfessionals.status;

export const selectHealthProfessional = (
  state: RootState,
  hpId: number,
): HealthProfessionalWithPatients | null =>
  hpId in state.healthProfessionals.data
    ? state.healthProfessionals.data[hpId]
    : null;

export const selectAllHealthProfessionals = (
  state: RootState,
): HealthProfessionalsData => state.healthProfessionals.data;
