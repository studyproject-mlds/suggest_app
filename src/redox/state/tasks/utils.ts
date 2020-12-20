import i18n from '@/plugins/i18n';
import { Task } from './types';
import moment from 'moment';

export const isReport = (task: Task) => {
  return task.category === 'rédaction de compte-rendu';
};

export const isSupport = (task: Task) => {
  return task.category === 'accompagnement thérapeutique';
};

export const isDataReading = (task: Task) => {
  return task.category === 'lecture de données';
};

export const categoryText = (task: Task) => {
  if (isReport(task)) {
    return i18n.t('common.redaction_de_compte_rendu');
  }

  if (isSupport(task)) {
    return i18n.t('common.accompagnement_therapeutique');
  }

  if (isDataReading(task)) {
    return i18n.t('common.lecture_de_donnees');
  }
  return task.category;
};

export const getFormattedDate = (task: Task) => {
  const date = moment(task.date);
  return `${i18n.t('common.prevue')} ${date.from(moment())}, ${date.format(
    '[le] D MMMM',
  )}`; // TODO: i18n how ?
};
