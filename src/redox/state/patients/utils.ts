export const NEW_ETAPES = {
  non_eligible: 'constants.eligibity.non_eligible_etapes',
  type_1_teenager_insulin_6_months:
    'constants.eligibity.type_1_teenager_insulin_6_months_etapes',
  type_1_teenager_no_autonomy: `constants.eligibity.type_1_teenager_no_autonomy`,
  type_1_adult_insulin_6_months:
    'constants.eligibity.type_1_adult_insulin_6_months_etapes',
  type_1_adult_no_autonomy: `constants.eligibity.type_1_adult_no_autonomy`,
  type_2_complex: 'constants.eligibity.type_2_complex_etapes',
  type_2_insulin_6_months: 'constants.eligibity.type_2_insulin_6_months_etapes',
  type_2_adult: `constants.eligibity.type_2_adult`,
};

export const CRITERIA = [
  {
    apiKey: 'info_cannot_use_monitoring',
    text: `Est-ce que le patient présente une impossibilité physique ou psychique
                    d’utiliser tous les composants du projet de télésurveillance ?`,
    answerValue: false,
  },
  {
    apiKey: 'info_other_pathology',
    text: `Est-ce que le patient présente une pathologie associée (en dehors du diabète)
                    au jour de l’inclusion, impliquant une espérance de vie < 12 mois ?`,
    answerValue: false,
  },
  {
    apiKey: 'info_chronic_dialysis',
    text: 'Est-ce que le patient est en situation de dialyse chronique ?',
    answerValue: false,
  },
  {
    apiKey: 'info_refuses_therapeutic_monitoring',
    text:
      'Est-ce que le patient refuse d’avoir un accompagnement thérapeutique ?',
    answerValue: false,
  },
  {
    apiKey: 'info_liver_failure',
    text: "Est-ce que le patient est atteint d'insuffisance hépatique sévère ?",
    answerValue: false,
  },
  {
    apiKey: 'info_no_home',
    text: 'Est-ce que le patient ne possède pas de lieu de séjour fixe ?',
    answerValue: false,
  },
];

export const CRITERIA2 = [
  {
    text: `constants.eligibity.info_cannot_user_monitoring`,
  },
  {
    text: `constants.eligibity.info_other_pathology`,
  },
  {
    text: 'constants.eligibity.info_chronic_dialysis',
  },
  {
    text: 'constants.eligibity.info_refuses_therapeutic_monitoring',
  },
  {
    text: 'constants.eligibity.info_liver_failure',
  },
  {
    text: 'constants.eligibity.info_no_home',
  },
];

export const ETAPES = {
  non_eligible: 'Patient non eligible',

  type_1_teenager_insulin_6_months: `Patient diabétique de type 1 âgés de plus de 12 ans et moins de 18 ans
                présentant une HbA1c≥8,5% lors de deux mesures réalisées dans un intervalle
                de 6 mois malgré une mise sous insuline de plus de 6 mois.`,

  type_1_teenager_no_autonomy: `Patient diabétique de type 1 âgés de plus de 12 ans et moins de 18 ans,
                lors de la découverte (6 premiers mois) du diabète lorsqu'il existe un
                risque quant à l'autonomisation du patient.`,

  type_1_adult_insulin_6_months: `Patient diabétique de type 1 âgés de 18 ans ou plus lorsqu’il existe
                un déséquilibre avec une HbA1c≥8% lors de deux mesures réalisées dans
                un intervalle de 6 mois malgré une mise sous insuline de plus de 6 mois.`,

  type_1_adult_no_autonomy: `Patient diabétique de type 1 âgés de 18 ans ou plus lors de la découverte
                (6 premiers mois) du diabète lorsqu’il existe un risque quant
                à l’autonomisation du patient.`,

  type_2_adult: `Patient diabétique de type 2 diagnostiqués depuis plus de 12 mois
                âgés de 18 ans ou plus chroniquement déséquilibrés, avec une HbA1c≥9%
                lors de deux mesures réalisées dans un intervalle de 6 mois et traités
                sous insuline (à l’initiation lorsqu’il existe un risque
                de non autonomisation, ou à distance de l’instauration).`,
};
