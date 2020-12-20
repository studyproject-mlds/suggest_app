import { RootState } from '@/state/store';

export const selectAlertsStatus = (state: RootState) => state.alerts.status;

export const selectPatientAlerts = (state: RootState, patientId: number) =>
  patientId in state.alerts.data.patients
    ? state.alerts.data.patients[patientId]
    : null;

export const selectPhysicianAlerts = (state: RootState, hpId: number) =>
  hpId in state.alerts.data.physician
    ? state.alerts.data.physician[hpId]
    : null;

export const selectAlertMaxForPhysicanByPatient = (
  state: RootState,
  hpId: number,
  patientId: number,
) => {
  const alertsCriticities = {
    low: 1,
    medium: 2,
    high: 3,
  };
  // console.log(selectPhysicianAlerts(state, hpId), patientId);
  return (
    selectPhysicianAlerts(state, hpId)
      ?.[patientId]?.slice(0)
      ?.sort(
        (cur, nxt) =>
          alertsCriticities[nxt.config?.criticity] -
          alertsCriticities[cur.config?.criticity],
      )[0] ?? null
  );
};

export const selectPatientInactiveAlerts = (
  state: RootState,
  patientId: number,
) =>
  patientId in state.alerts.data.patients
    ? state.alerts.data.patients[patientId].filter(
        alert => alert.is_active === false,
      )
    : null;
