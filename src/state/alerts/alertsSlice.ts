import {
    getPatientAlerts,
    deletePatientAlert,
    getPhysicianAlerts,
} from './actions';

import {groupBy} from '@/utils';

const initialState = {
    data: {
        patients: {},
        physician: {},
    },
};

type FN = (...args: unknown[]) => undefined | void;
type Obj = Record<string | number | symbol, FN>;

type Fu = {
    f?: FN;
    fulfilled?: FN;
    r?: FN;
    rejected: FN;
    p?: FN;
    pending: FN;
};

type RecordX<X> = Record<string | number | symbol, X>;

type RecordObj = RecordX<FN>;

type SliceOpts = {
    initialState?: RecordX<unknown>;
    // [name: string]: Record<string | number | symbol, Function | Obj>;
};

type SliceOnlyFulfiled = RecordX<FN>;

type SliceAll = RecordX<Fu>;

type SliceAllAndOnlyFulfilled = SliceOnlyFulfiled | SliceAll;

type SliceNamespace = RecordX<SliceAllAndOnlyFulfilled>;

type Slice = SliceOpts & (SliceAllAndOnlyFulfilled | SliceNamespace);

export const alerts = {
    initialState,
    patients: {
        [getPatientAlerts.name]: (state, action) => {
            const {patientId, alerts} = action.payload;

            state.data.patients[patientId] = alerts;
        },

        [deletePatientAlert.name]: (state, action) => {
            const {patientId, alertId} = action.payload;
            const filteredPatientAlerts = state.data.patients[patientId].filter(
                (alert) => alert.id !== alertId,
            );

            state.data.patients[patientId] = filteredPatientAlerts;
        },
    },
    healthProfessionals: {
        [getPhysicianAlerts.name]: (state, action) => {
            const {hpId, alerts} = action.payload;

            state.data.physician[hpId] = groupBy(
                alerts ?? [],
                (alert) => alert.patient.user,
            );
        },
    },
};
