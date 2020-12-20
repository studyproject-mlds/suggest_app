import { UserProfile } from '@/state/users/types';
import moment from 'moment';

export const getFullName = (userProfile: UserProfile): string =>
  `${userProfile?.first_name} ${userProfile?.last_name}`;

export const getReversedFullName = (userProfile: UserProfile): string =>
  `${userProfile?.last_name} ${userProfile?.first_name}`;

export const getInitials = (userProfile: UserProfile): string =>
  userProfile?.first_name.slice(0, 1) + userProfile?.last_name.slice(0, 1) ??
  '??';

export const getPhoneNumbers = (userProfile: UserProfile) =>
  userProfile?.phones.filter(phone => phone.number !== '');

export const getDayOfBirth = (userProfile: UserProfile) =>
  userProfile?.birth_date.split('-')[2];

export const getMonthOfBirth = (userProfile: UserProfile) =>
  userProfile?.birth_date.split('-')[1];

export const getYearOfBirth = (userProfile: UserProfile) =>
  userProfile?.birth_date.split('-')[0];

export const getAge = (userProfile: UserProfile) => {
  const birthDate = moment(userProfile?.birth_date);
  return moment().diff(birthDate, 'years');
};
