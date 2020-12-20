import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SliceState } from '@/state/store';

import {
  AlertData,
  PatientAlertDelete,
  PatientAlerts,
  PhysicianAlerts,
  Alert,
} from './types';
import {
  getPatientAlerts,
  deletePatientAlert,
  getPhysicianAlerts,
} from './thunks';

import { groupBy } from '@/utils';

const initialState: SliceState<AlertData> = {
  status: 'idle',
  error: null,
  data: {
    patients: {},
    physician: {},
  },
};

const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getPatientAlerts.pending, state => {
        state.status = 'loading';
      })
      .addCase(getPatientAlerts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(
        getPatientAlerts.fulfilled,
        (state, action: PayloadAction<PatientAlerts>) => {
          const { patientId, alerts } = action.payload;

          state.status = 'succeeded';
          state.data.patients[patientId] = alerts;
        },
      )

      .addCase(deletePatientAlert.pending, state => {
        state.status = 'loading';
      })
      .addCase(deletePatientAlert.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(
        deletePatientAlert.fulfilled,
        (state, action: PayloadAction<PatientAlertDelete>) => {
          const { patientId, alertId } = action.payload;
          const filteredPatientAlerts = state.data.patients[patientId].filter(
            alert => alert.id !== alertId,
          );

          state.status = 'succeeded';
          state.data.patients[patientId] = filteredPatientAlerts;
        },
      )
      .addCase(getPhysicianAlerts.pending, state => {
        state.status = 'loading';
      })
      .addCase(getPhysicianAlerts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(
        getPhysicianAlerts.fulfilled,
        (state, action: PayloadAction<PhysicianAlerts>) => {
          const { hpId, alerts } = action.payload;

          state.status = 'succeeded';

          state.data.physician[hpId] = groupBy(
            alerts ?? [],
            (alert: Alert) => alert.patient.user,
          ) as Record<number, PhysicianAlerts['alerts']>;
        },
      );
  },
});

export default alertsSlice.reducer;
