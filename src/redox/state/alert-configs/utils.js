import HyperglycemiaParameters from '@/models/alertconfigs-parameters/HyperglycemiaParameters';
import i18n from '@/plugins/i18n';
import {
    AlertConfig,
    HypoglycemiaParameters,
    ObservanceParameters,
    ParametersCategories,
} from './types';

const CRITICITY_HIGH = 'high';
const CRITICITY_MEDIUM = 'medium';
const CRITICITY_LOW = 'low';

const CATEGORY_HYPO = 'hypoglycemia';
const CATEGORY_HYPER = 'hyperglycemia';
const CATEGORY_OBSERVANCE = 'observance';
const CATEGORY_SEVERE_HYPO = 'severe_hypoglycemia';
const CATEGORY_TECH_ALERT = 'technical_alert';
const CATEGORY_CETONE = 'presence_of_cetone';
const CATEGORY_CONSENT = 'remove_consent';

export const categories = {
    hypoglycemia: 'models.alert_config.evenement_hypoglycemique',
    hyperglycemia: 'models.alert_config.evenement_hyperglycemique',
    observance: 'models.alert_config.observance',
    severe_hypoglycemia: 'models.alert_config.hypoglycemie_severe',
    technical_alert: 'models.alert_config.alertes_techniques',
    presence_of_cetone:
        'models.alert_config.presence_de_cetone_dans_le_sang_ou_urine',
    remove_consent: 'models.alert_config.retrait_du_consentement',
};

export const isActive = (alertConfig) => {
    return alertConfig.is_active;
};

export const isInactive = (alertConfig) => {
    return !isActive(alertConfig);
};

export const getFormattedCategory = (alertConfig) => {
    return (
        categories[alertConfig.category] ??
        i18n.t('models.alert_config.alerte_inconnue')
    );
};

export const isHypoglycemia = (alertConfig) => {
    return alertConfig.category === CATEGORY_HYPO;
};

export const isHyperglycemia = (alertConfig) => {
    return alertConfig.category === CATEGORY_HYPER;
};

export const isObservance = (alertConfig) => {
    return alertConfig.category === CATEGORY_OBSERVANCE;
};

export const isSevereHypoglycemia = (alertConfig) => {
    return alertConfig.category === CATEGORY_SEVERE_HYPO;
};

export const isTechnical = (alertConfig) => {
    return alertConfig.category === CATEGORY_TECH_ALERT;
};

export const isCetone = (alertConfig) => {
    return alertConfig.category === CATEGORY_CETONE;
};

export const isConsent = (alertConfig) => {
    return alertConfig.category === CATEGORY_CONSENT;
};

export const getThemeColorClass = (alertConfig) => {
    if (alertConfig.criticity === CRITICITY_HIGH) {
        return 'criticity-high';
    } else if (alertConfig.criticity === CRITICITY_MEDIUM) {
        return 'criticity-medium';
    } else if (alertConfig.criticity === CRITICITY_LOW) {
        return 'criticity-low';
    } else {
        return 'gray-500';
    }
};

export const createParameters = (category) => {
    switch (category) {
        case 'hyperglycemia':
            return {max_number_of_hypers: 0, n_days: 0};
        case 'hypoglycemia':
            return {max_number_of_hypos: 0, n_days: 0};
        case 'observance':
            return {min_nb_of_measurements: 0, n_days: 0};
        default:
            return {};
    }
};
