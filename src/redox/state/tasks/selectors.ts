import { RootState } from '@/state/store';

export const selectTasksStatus = (state: RootState) => state.tasks.status;

export const selectPatientTasks = (state: RootState, patientId: number) =>
  patientId in state.tasks.data ? state.tasks.data[patientId] : [];

export const selectPatientTasksDone = (state: RootState, patientId: number) =>
  patientId in state.tasks.data
    ? state.tasks.data[patientId].filter(task => task.status === 'done')
    : [];

export const selectPatientTasksScheduled = (
  state: RootState,
  patientId: number,
) =>
  patientId in state.tasks.data
    ? state.tasks.data[patientId].filter(task => task.status === 'scheduled')
    : [];

export const selectPatientTasksTodayAndPrevious = (
  state: RootState,
  patientId: number,
) =>
  selectPatientTasks(state, patientId)?.filter(
    task => new Date(task.date) <= new Date(),
  ) ?? [];
