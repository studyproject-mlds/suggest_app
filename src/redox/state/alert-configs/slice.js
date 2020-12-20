import {
    getPatientAlertConfigs,
    createPatientAlertConfigs,
    patchPatientAlertConfigs,
    deletePatientAlertConfigs,
} from './thunks';

const alertConfigs = () => ({
    noPrefix: true,
    initialState: {
        // initialStateMerge
        data: {
            patients: {},
        },
    },
    patients: {
        initialState: {
            // initialStateMerge
            data: {
                patients: {},
            },
        },
        [getPatientAlertConfigs.name]: (state, action) => {
            const {patientId, alertConfigs} = action.payload;

            state.data[patientId] = alertConfigs;
        },

        [createPatientAlertConfigs.name]: (state, action) => {
            const {patientId, alertConfig} = action.payload;

            if (patientId in state.data) {
                state.data[patientId] = [...state.data[patientId], alertConfig];
            } else {
                state.data[patientId] = [alertConfig];
            }
        },

        [patchPatientAlertConfigs.name]: (state, action) => {
            const {patientId, alertConfig} = action.payload;
            const patchedAlertConfigs = state.data[patientId].map((ac) =>
                ac.id === alertConfig.id ? alertConfig : ac,
            );

            state.data[patientId] = patchedAlertConfigs;
        },
    },
    [deletePatientAlertConfigs.name]: (state, action) => {
        const {patientId, alertConfigId} = action.payload;
        const filteredAlertConfigs = state.data[patientId].filter(
            (ac) => ac.id !== alertConfigId,
        );

        state.data[patientId] = filteredAlertConfigs;
    },
});

export default alertConfigs;
