export type CarePlan = {
  id: number;
  started: string;
  patient: string;
};

type BasePatientCarePlan = {
  patientId: number;
};

export type PatientCarePlans = BasePatientCarePlan & {
  carePlans: CarePlan[];
};

export type PatientCarePlan = BasePatientCarePlan & {
  carePlan: CarePlan;
};

export type CarePlanData = {
  [patientId: number]: CarePlan[];
};
