import { Patient } from '../patients/types';
import { UserProfile } from '../users/types';
import { TeamMembership } from '../team-membership/types';

export type Profession =
  | 'medecin'
  | 'diabetologue'
  | 'infirmier'
  | 'pharmacien'
  | 'dieteticien'
  | 'autre';

export type Status = 'job' | 'on_call' | 'away';

export type HealthProfessional = {
  user: number;
  status: Status;
  profession: Profession;
};

export type HealthProfessionalWithPatients = HealthProfessional & {
  patients?: Patient[];
  patientsProfiles?: UserProfile[];
  memberships?: TeamMembership[];
};

export type HealthProfessionalsData = {
  [user: number]: HealthProfessionalWithPatients;
};
