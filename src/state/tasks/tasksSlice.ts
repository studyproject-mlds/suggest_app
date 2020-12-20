import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {SliceState} from '@/state/store';
import {TaskData, PatientTasks, PatientTask} from './types';
import {getPatientTasks, resolvePatientTasks, movePatientTasks} from './thunks';

const initialState: SliceState<TaskData> = {
    status: 'idle',
    error: null,
    data: {},
};
type ActionType = PayloadAction<PatientTasks>;
function task<S extends ActionType>() {
    return {
        name: 'tasks',
        initialState,
        [getPatientTasks.name]: (state, action: S) => {
            const {patientId, tasks} = action.payload;

            state.data[patientId] = tasks;
        },

        [resolvePatientTasks.name]: (state, action: S) => {
            const {patientId, task} = action.payload;
            const patchedTasks = state.data[patientId].map((t) =>
                t.id === task.id ? task : t,
            );

            state.data[patientId] = patchedTasks;
        },

        [movePatientTasks.name]: (state, action: S) => {
            const {patientId, task} = action.payload;
            const patchedTasks = state.data[patientId].map((t) =>
                t.id === task.id ? task : t,
            );

            state.data[patientId] = patchedTasks;
        },
    };
}

export default tasksSlice.reducer;
