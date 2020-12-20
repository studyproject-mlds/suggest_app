import { MedicalContact, Contact } from '@/state/contacts/types';

export const getFullName = (contact: MedicalContact | Contact): string =>
  `${contact.first_name} ${contact.last_name}`;

export const relationships = {
  unspecified: 'models.contact.not_entered',
  partner: 'models.contact.partner',
  grand_parent: 'models.contact.grand_parent',
  parent: 'models.contact.parent',
  parent_in_law: 'models.contact.parent_in_law',
  child: 'models.contact.child',
  brother: 'models.contact.brother',
  cousin: 'models.contact.cousin',
  friend: 'models.contact.friend',
  other: 'models.contact.other',
};

export const jobs = {
  medecin: 'models.medecin',
  medecin_prescripteur: 'models.medical_contact.medecin_prescripteur',
  medecin_telesurveillant: 'models.medical_contact.medecin_telesurveillant',
  diabetologue: 'models.diabetologue',
  infirmier: 'models.infirmier',
  pharmacien: 'models.pharmacien',
  ide: 'models.medical_contact.ide',
  sante: 'models.medical_contact.sante_scolaire',
  psychologue: 'models.medical_contact.psychologue',
  dieteticien: 'models.dieteticien',
  prestataire: 'models.medical_contact.prestataire_de_pompe',
  ems: 'models.medical_contact.educateur_medico_sportif',
  autre: 'common.autre',
};
