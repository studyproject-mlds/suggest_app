import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SliceState } from '@/state/store';
import { TaskData, PatientTasks, PatientTask } from './types';
import {
  getPatientTasks,
  resolvePatientTasks,
  movePatientTasks,
} from './thunks';

const initialState: SliceState<TaskData> = {
  status: 'idle',
  error: null,
  data: {},
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getPatientTasks.pending, state => {
        state.status = 'loading';
      })
      .addCase(getPatientTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(
        getPatientTasks.fulfilled,
        (state, action: PayloadAction<PatientTasks>) => {
          const { patientId, tasks } = action.payload;

          state.status = 'succeeded';
          state.data[patientId] = tasks;
        },
      )

      .addCase(resolvePatientTasks.pending, state => {
        state.status = 'loading';
      })
      .addCase(resolvePatientTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(
        resolvePatientTasks.fulfilled,
        (state, action: PayloadAction<PatientTask>) => {
          const { patientId, task } = action.payload;
          const patchedTasks = state.data[patientId].map(t =>
            t.id === task.id ? task : t,
          );

          state.status = 'succeeded';
          state.data[patientId] = patchedTasks;
        },
      )

      .addCase(movePatientTasks.pending, state => {
        state.status = 'loading';
      })
      .addCase(movePatientTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(
        movePatientTasks.fulfilled,
        (state, action: PayloadAction<PatientTask>) => {
          const { patientId, task } = action.payload;
          const patchedTasks = state.data[patientId].map(t =>
            t.id === task.id ? task : t,
          );

          state.status = 'succeeded';
          state.data[patientId] = patchedTasks;
        },
      );
  },
});

export default tasksSlice.reducer;
