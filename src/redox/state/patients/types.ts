import { UserWithProfile } from '../users/types';

type DiabetesType = 'unspecified' | 'type_1' | 'type_2';

type InsulinTreatment = 'unspecified' | 'single_injection' | 'complex';

type EtapesProgram =
  | 'non_eligible'
  | 'type_1_teenager_insulin_6_months'
  | 'type_1_teenager_no_autonomy'
  | 'type_1_adult_insulin_6_months'
  | 'type_1_adult_no_autonomy'
  | 'type_2_adult'
  | 'type_2_complex'
  | 'type_2_insulin_6_months';

export type Patient = {
  user: number;
  social_security_number: string;
  diabetes_ald: boolean;
  glycated_hemoglobin_value: number;
  glycated_hemoglobin_date: string;
  comment: string;
  diabetes_type: DiabetesType;
  inclusion_is_valid: boolean;
  insulin_treatment: InsulinTreatment;
  telemonitoring_is_active: boolean;
  info_cannot_use_monitoring: boolean;
  info_other_pathology: boolean;
  info_chronic_dialysis: boolean;
  info_refuses_therapeutic_monitoring: boolean;
  info_liver_failure: boolean;
  info_no_home: boolean;
  eligibilitY_etapes_program: EtapesProgram;
};

export type PatientsData = {
  [user: number]: Patient;
};

export type PatientWithUserProfile = UserWithProfile & Patient;
