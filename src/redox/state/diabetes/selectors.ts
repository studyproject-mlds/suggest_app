import moment from 'moment-timezone';
import { RootState } from '@/state/store';
import { ThresholdName } from './types';

export const selectDiabetesStatus = (state: RootState) => state.diabetes.status;

export const selectPatientDataForDate = (
  state: RootState,
  filterDate: moment.Moment,
) =>
  state.diabetes.data.dataviz?.filter(dayData =>
    moment
      .utc(dayData.date)
      .startOf('day')
      .isSame(moment.utc(filterDate.startOf('day').format()), 'day'),
  )[0];

export const selectPatientGlobalStats = (state: RootState) =>
  state.diabetes.data.globalStats;

export const selectPatientTargetDurationStats = (state: RootState) =>
  state.diabetes.data.targetDurationStats;

export const selectPatientDiabetesParameters = (state: RootState) =>
  state.diabetes.data.diabetesParams;

export const selectDiabetesParameterByName = (
  state: RootState,
  name: ThresholdName,
) =>
  state.diabetes.data.diabetesParams
    ? state.diabetes.data.diabetesParams[name]
    : null;
