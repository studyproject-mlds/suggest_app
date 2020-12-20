type PhoneDescription = 'Portable' | 'Fixe';

type Phone = {
  description: PhoneDescription;
  number: string;
};

type MedicalContactType =
  | 'medecin'
  | 'medecin_prescripteur'
  | 'medecin_telesurveillant'
  | 'diabetologue'
  | 'infirmier'
  | 'pharmacien'
  | 'ide'
  | 'sante'
  | 'psychologue'
  | 'dieteticien'
  | 'prestataire'
  | 'ems'
  | 'autre';

export type MedicalContact = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  secure_email: string;
  postal_address: string;
  phones: Phone[];
  comment: string;
  type: MedicalContactType;
  patient: string;
};

type ContactType = 'ide' | 'aidant' | 'famille' | 'autre';

type Relationship =
  | 'unspecified'
  | 'grand_parent'
  | 'parent'
  | 'parent_in_low'
  | 'partner'
  | 'child'
  | 'brother'
  | 'cousin'
  | 'friend'
  | 'other';

export type Contact = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  postal_address: string;
  phones: Phone[];
  comment: string;
  is_emergency_contact: string;
  type: ContactType;
  relationship_with_patient: Relationship;
  patient: string;
};

type BasePatientContact = {
  patientId: number;
};

export type PatientContacts = BasePatientContact & {
  contacts: Contact[];
};

export type PatientContact = BasePatientContact & {
  contact: Contact;
};

export type PatientMedicalContacts = BasePatientContact & {
  medicalContacts: MedicalContact[];
};

export type PatientMedicalContact = BasePatientContact & {
  medicalContact: MedicalContact;
};

export type PatientContactRemoved = BasePatientContact & {
  contactId: number;
};

export type ContactsData = {
  [patientId: number]: {
    contacts: Contact[];
    medicalContacts: MedicalContact[];
  };
};
