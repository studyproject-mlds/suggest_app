export type Observation = {
  id: number;
  author: string;
  recipient: string;
  recipient_id: number;
  date: string;
  call_happened: boolean;
  analysis_description: string;
  message_text: string;
};

type BasePatientObservation = {
  patientId: number;
};

export type PatientObservation = BasePatientObservation & {
  observation: Observation;
};

export type PatientObservations = BasePatientObservation & {
  observations: Observation[];
};

export type ObservationData = {
  [patientId: number]: Observation[];
};
