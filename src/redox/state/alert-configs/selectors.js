export const selectAlertConfigsStatus = (state) => state.alertConfigs.status;

export const selectPatientAlertsConfigs = (state, patientId) =>
    patientId in state.alertConfigs.data
        ? state.alertConfigs.data[patientId]
        : [];
