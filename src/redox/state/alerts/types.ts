import { Patient } from '@/state/patients/types';
import { User, UserProfile } from '@/state/users/types';
import { AlertConfig } from '../alert-configs/types';

export type Alert = {
  id: number;
  date: string;
  date_removed: string;
  is_active: boolean;
  config: AlertConfig;
  patient: Patient;
  user_removed: User & UserProfile;
};

type BasePatientAlert = {
  patientId: number;
};

type BasePhysicianAlert = {
  hpId: number;
};

export type PatientAlerts = BasePatientAlert & {
  alerts: Alert[];
};

export type PhysicianAlerts = BasePhysicianAlert & {
  alerts: Alert[];
};

export type PatientAlertDelete = BasePatientAlert & {
  alertId: number;
};

export type AlertData = {
  patients: {
    [patientId: number]: Alert[];
  };
  physician: {
    [hpId: number]: {
      [patientId: number]: Alert[];
    };
  };
};
