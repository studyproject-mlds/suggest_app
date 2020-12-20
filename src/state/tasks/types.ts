export type TaskStatus = 'scheduled' | 'done' | 'cancelled';

type TaskCategory =
  | 'lecture de données'
  | 'accompagnement thérapeutique'
  | 'rédaction de compte-rendu';

export type Task = {
  id: number;
  category: TaskCategory;
  date: string;
  start: string;
  end: string;
  status: TaskStatus;
  is_active: boolean;
  care_plan: number;
  terminated_by: number;
};

type BasePatientTask = {
  patientId: number;
};

export type PatientTasks = BasePatientTask & {
  tasks: Task[];
};

export type PatientTask = BasePatientTask & {
  task: Task;
};

export type TaskData = {
  [patientId: number]: Task[];
};
