import API from '@/api';
import { toastError } from '@/components/toast/ToastComponent';

export const REQUEST_PATIENT_DATAVIZ = 'REQUEST_PATIENT_DATAVIZ';
export const RECEIVE_PATIENT_DATAVIZ = 'RECEIVE_PATIENT_DATAVIZ';
export const REQUEST_GLOBAL_STATS = 'REQUEST_GLOBAL_STATS';
export const RECEIVE_GLOBAL_STATS = 'RECEIVE_GLOBAL_STATS';
export const REQUEST_TARGET_DURATION = 'REQUEST_TARGET_DURATION';
export const RECEIVE_TARGET_DURATION = 'RECEIVE_TARGET_DURATION';
export const REQUEST_TARGET_DURATION_STATS = 'REQUEST_TARGET_DURATION_STATS';
export const RECEIVE_TARGET_DURATION_STATS = 'RECEIVE_TARGET_DURATION_STATS';
export const REQUEST_MODAL_GLYCEMIA = 'REQUEST_MODAL_GLYCEMIA';
export const RECEIVE_MODAL_GLYCEMIA = 'RECEIVE_MODAL_GLYCEMIA';
export const REQUEST_MODAL_HYPOGLYCEMIA = 'REQUEST_MODAL_HYPOGLYCEMIA';
export const RECEIVE_MODAL_HYPOGLYCEMIA = 'RECEIVE_MODAL_HYPOGLYCEMIA';

export const requestPatientDataViz = token => ({
  type: REQUEST_PATIENT_DATAVIZ,
  token,
});
export const receivePatientDataViz = patientDataViz => ({
  type: RECEIVE_PATIENT_DATAVIZ,
  patientDataViz,
});

export const getPatientDataViz = (token, id, startDate, endDate) => {
  return async dispatch => {
    dispatch(requestPatientDataViz(token));
    try {
      const response = await API(token).get(`patients/${id}/dataviz/`, {
        params: { from: startDate, to: endDate },
      });
      return dispatch(receivePatientDataViz(response.data));
    } catch (error) {
      toastError(error.message);
    }
  };
};

export const requestGlobalStats = token => ({
  type: REQUEST_GLOBAL_STATS,
  token,
});
export const receiveGlobalStats = globalStats => ({
  type: RECEIVE_GLOBAL_STATS,
  globalStats,
});

export const getGlobalStats = (token, id, startDate, endDate) => {
  return async dispatch => {
    dispatch(requestGlobalStats(token));
    try {
      const response = await API(token).get(
        `patients/${id}/stats/global_stats/`,
        {
          params: { date_min: startDate, date_max: endDate },
        },
      );
      return dispatch(receiveGlobalStats(response.data));
    } catch (error) {
      toastError(error.message);
    }
  };
};

export const requestTargetDuration = token => ({
  type: REQUEST_TARGET_DURATION,
  token,
});
export const receiveTargetDuration = targetDuration => ({
  type: RECEIVE_TARGET_DURATION,
  targetDuration,
});

export const getTargetDuration = (token, id) => {
  return async dispatch => {
    dispatch(requestTargetDuration(token));
    try {
      const response = await API(token).get(
        `patients/${id}/stats/target_duration/`,
      );
      return dispatch(receiveTargetDuration(response.data));
    } catch (error) {
      toastError(error.message);
    }
  };
};

export const requestTargetDurationStats = token => ({
  type: REQUEST_TARGET_DURATION_STATS,
  token,
});
export const receiveTargetDurationStats = targetDurationStats => ({
  type: RECEIVE_TARGET_DURATION_STATS,
  targetDurationStats,
});

export const getTargetDurationStats = (token, id, startDate, endDate) => {
  return async dispatch => {
    dispatch(requestTargetDurationStats(token));
    try {
      const response = await API(token).get(
        `patients/${id}/stats/target_duration_stats/`,
        {
          params: { date_min: startDate, date_max: endDate },
        },
      );
      return dispatch(receiveTargetDurationStats(response.data));
    } catch (error) {
      toastError(error.message);
    }
  };
};

export const requestModalGlycemia = token => ({
  type: REQUEST_MODAL_GLYCEMIA,
  token,
});
export const receiveModalGlycemia = modalGlycemia => ({
  type: RECEIVE_MODAL_GLYCEMIA,
  modalGlycemia,
});

export const getModalGlycemia = (token, id, startDate, endDate) => {
  return async dispatch => {
    dispatch(requestModalGlycemia(token));
    try {
      const response = await API(token).get(
        `patients/${id}/stats/modal_glycemia/?date_min=${startDate}&date_max=${endDate}`,
      );
      return dispatch(receiveModalGlycemia(response.data));
    } catch (error) {
      toastError(error.message);
    }
  };
};

export const requestModalHypoglycemia = token => ({
  type: REQUEST_MODAL_HYPOGLYCEMIA,
  token,
});
export const receiveModalHypoglycemia = modalHypoglycemia => ({
  type: RECEIVE_MODAL_HYPOGLYCEMIA,
  modalHypoglycemia,
});

export const getModalHypoglycemia = (token, id, startDate, endDate) => {
  return async dispatch => {
    dispatch(requestModalHypoglycemia(token));
    try {
      const response = await API(token).get(
        `patients/${id}/stats/modal_hypoglycemia/?date_min=${startDate}&date_max=${endDate}`,
      );
      return dispatch(receiveModalHypoglycemia(response.data));
    } catch (error) {
      toastError(error.message);
    }
  };
};

// Diabetes Parameters

export const REQUEST_GET_DIABETES_PARAMETERS =
  'REQUEST_GET_DIABETES_PARAMETERS';
export const RECEIVE_GET_DIABETES_PARAMETERS =
  'RECEIVE_GET_DIABETES_PARAMETERS';

const requestDiabetesParameters = token => ({
  type: REQUEST_GET_DIABETES_PARAMETERS,
  token,
});
const receiveDiabetesParameters = diabetesParams => ({
  type: RECEIVE_GET_DIABETES_PARAMETERS,
  diabetesParams,
});

export const getDiabetesParameters = (token, patientId) => {
  return async dispatch => {
    dispatch(requestDiabetesParameters(token));
    try {
      const diabetesParams = await API(token).get(
        `patients/${patientId}/diabetes-parameters/`,
      );
      return dispatch(receiveDiabetesParameters(diabetesParams.data[0]));
    } catch (error) {
      toastError(error.message);
    }
  };
};

export const REQUEST_PATCH_DIABETES_PARAMETERS =
  'REQUEST_PATCH_DIABETES_PARAMETERS';
export const RECEIVE_PATCH_DIABETES_PARAMETERS =
  'RECEIVE_PATCH_DIABETES_PARAMETERS';

const requestPatchDiabetesParameters = token => ({
  type: REQUEST_PATCH_DIABETES_PARAMETERS,
  token,
});
const receivePatchDiabetesParameters = newDiabetesParams => ({
  type: RECEIVE_PATCH_DIABETES_PARAMETERS,
  newDiabetesParams,
});

export const patchDiabetesParameters = (token, patientId, paramsId, data) => {
  return async dispatch => {
    dispatch(requestPatchDiabetesParameters(token));
    try {
      const newDiabetesParams = await API(token).patch(
        `patients/${patientId}/diabetes-parameters/${paramsId}/`,
        data,
      );
      return dispatch(receivePatchDiabetesParameters(newDiabetesParams.data));
    } catch (error) {
      toastError(error.message);
    }
  };
};
