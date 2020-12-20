import {
  REQUEST_PATIENT_DATAVIZ,
  RECEIVE_PATIENT_DATAVIZ,
  REQUEST_GLOBAL_STATS,
  RECEIVE_GLOBAL_STATS,
  REQUEST_TARGET_DURATION,
  RECEIVE_TARGET_DURATION,
  REQUEST_TARGET_DURATION_STATS,
  RECEIVE_TARGET_DURATION_STATS,
  REQUEST_MODAL_GLYCEMIA,
  RECEIVE_MODAL_GLYCEMIA,
  REQUEST_MODAL_HYPOGLYCEMIA,
  RECEIVE_MODAL_HYPOGLYCEMIA,
  REQUEST_GET_DIABETES_PARAMETERS,
  RECEIVE_GET_DIABETES_PARAMETERS,
  REQUEST_PATCH_DIABETES_PARAMETERS,
  RECEIVE_PATCH_DIABETES_PARAMETERS,
} from '../actions/data';

import PatientData from '@/models/PatientData';
import GlobalStats from '@/models/GlobalStats';
import TargetDuration from '@/models/TargetDuration';
import TargetDurationStats from '@/models/TargetDurationStats';
import ModalGlycemia from '@/models/ModalGlycemia';
import ModalHypoglycemia from '@/models/ModalHypoglycemia';
import ModalHypoglycemiaChartData from '@/models/ModalHypoglycemiaChartData';

const userInitialState = {
  isFetching: false,
  patientDataViz: null,
  globalStats: null,
  targetDuration: null,
  targetDurationStats: null,
  diabetesParams: null,
  modalGlycemia: null,
  modalHypoglycemia: null,
};

export default function (state = userInitialState, action) {
  switch (action.type) {
    case REQUEST_PATIENT_DATAVIZ:
      return { ...state, isFetching: true };
    case RECEIVE_PATIENT_DATAVIZ:
      return {
        ...state,
        isFetching: false,
        patientDataViz: action.patientDataViz.map(d => {
          const modalHypoglycemia = Object.assign(new PatientData(), d);
          return modalHypoglycemia;
        }),
      };
    case REQUEST_GLOBAL_STATS:
      return { ...state, isFetching: true };
    case RECEIVE_GLOBAL_STATS:
      return {
        ...state,
        isFetching: false,
        globalStats: Object.assign(new GlobalStats(), action.globalStats),
      };
    case REQUEST_TARGET_DURATION:
      return { ...state, isFetching: true };
    case RECEIVE_TARGET_DURATION:
      return {
        ...state,
        isFetching: false,
        targetDuration: action.targetDuration.values.map(d => {
          const targetDuration = Object.assign(new TargetDuration(), d);
          targetDuration.date = new Date(d.date);
          return targetDuration;
        }),
      };
    case REQUEST_TARGET_DURATION_STATS:
      return { ...state, isFetching: true };
    case RECEIVE_TARGET_DURATION_STATS:
      const params = action.targetDurationStats.parameters;
      console.log(params);
      const targetDurationStats = Object.assign(new TargetDurationStats(), {
        ...action.targetDurationStats,
        glycemia_distribution: [
          {
            ...action.targetDurationStats.glycemia_distribution[0],
            glycemia_range: `>${params.threshold_hyperglycemia_2} mg/dL`,
          },
          {
            ...action.targetDurationStats.glycemia_distribution[0],
            glycemia_range: `${params.threshold_hyperglycemia} - ${params.threshold_hyperglycemia_2} mg/dL`,
          },
          ...action.targetDurationStats.glycemia_distribution.slice(2, 4),
          {
            ...action.targetDurationStats.glycemia_distribution[4],
            glycemia_range: `<${params.threshold_hypoglycemia_2} mg/dL`,
          },
        ],
      });

      return {
        ...state,
        isFetching: false,
        targetDurationStats,
      };
    case REQUEST_MODAL_GLYCEMIA:
      return { ...state, isFetching: true };
    case RECEIVE_MODAL_GLYCEMIA:
      return {
        ...state,
        isFetching: false,
        modalGlycemia: Object.assign(
          new ModalGlycemia(),
          ...action.modalGlycemia,
        ),
      };
    case REQUEST_MODAL_HYPOGLYCEMIA:
      return { ...state, isFetching: true };
    case RECEIVE_MODAL_HYPOGLYCEMIA:
      return {
        ...state,
        isFetching: false,
        modalHypoglycemia: Object.assign(new ModalHypoglycemiaChartData(), {
          values: action.ModalHypoglycemia.values.map(d => {
            const modalHypoglycemia = Object.assign(new ModalHypoglycemia(), d);
            return modalHypoglycemia;
          }),
          parameters: action.ModalHypoglycemia.parameters,
        }),
      };

    case REQUEST_GET_DIABETES_PARAMETERS:
      return { ...state, isFetching: true };
    case RECEIVE_GET_DIABETES_PARAMETERS:
      return {
        ...state,
        isFetching: false,
        diabetesParams: action.diabetesParams,
      };
    case REQUEST_PATCH_DIABETES_PARAMETERS:
      return { ...state, isFetching: true };
    case RECEIVE_PATCH_DIABETES_PARAMETERS:
      return {
        ...state,
        isFetching: false,
        diabetesParams: action.newDiabetesParams,
      };

    default:
      return state;
  }
}
