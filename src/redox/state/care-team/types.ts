type HealthProfessionalStatus = 'job' | 'on_call' | 'away';

type HealthProfessionalProfession =
  | 'medecin'
  | 'diabetologue'
  | 'infirmier'
  | 'pharmacien'
  | 'dieteticien'
  | 'autre';

type HealthProfessional = {
  user: number;
  status: HealthProfessionalStatus;
  profession: HealthProfessionalProfession;
};

export type BaseCareTeam = {
  id: number;
  name?: string;
  organization?: number;
};

export type CareGivers = BaseCareTeam & {
  healthProfessionals: HealthProfessional[];
};

export type CareTeamData = {
  [careTeamId: number]: CareGivers;
};
