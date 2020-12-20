type ConsentType =
  | 'telemedecine'
  | 'accompagnement'
  | 'hebergement_donnees'
  | 'traitement_donnees'
  | 'partage_donnees'
  | 'protocol_cooperation';

type Consent = {
  id: number;
  user: number;
  type: ConsentType;
  type_label: string;
  is_given: boolean;
  date_given: string;
  user_given: number;
  date_removed: string;
  user_removed: number;
  motive_removed: string;
};

type BasePatientConsents = {
  patientId: number;
};

export type PatientConsents = BasePatientConsents & {
  consents: Consent[];
};

export type PatientConsent = BasePatientConsents & {
  consent: Consent;
};

export type ConsentData = {
  [patientId: number]: Consent[];
};
