import {
  REQUEST_USER_HEALTH_PROFESSIONAL,
  RECEIVE_USER_HEALTH_PROFESSIONAL,
  REQUEST_USER_PROFILE_HEALTH_PROFESSIONAL,
  RECEIVE_USER_PROFILE_HEALTH_PROFESSIONAL,
  REQUEST_PATCH_USER_HEALTH_PROFESSIONAL,
  RECEIVE_PATCH_USER_HEALTH_PROFESSIONAL,
  REQUEST_PATCH_USER_PROFILE_HEALTH_PROFESSIONAL,
  RECEIVE_PATCH_USER_PROFILE_HEALTH_PROFESSIONAL,
  REQUEST_GET_ME,
  RECEIVE_GET_ME,
  REQUEST_GET_TEAM_MEMBERSHIPS,
  RECEIVE_GET_TEAM_MEMBERSHIPS,
} from '../actions/healthProfessional';

import {
  REQUEST_HEALTH_PROFESSIONAL,
  RECEIVE_HEALTH_PROFESSIONAL,
  REQUEST_PATCH_HEALTH_PROFESSIONAL,
  RECEIVE_PATCH_HEALTH_PROFESSIONAL,
  REQUEST_PATIENTS,
  RECEIVE_PATIENTS,
  REQUEST_USER_PROFILE_PATIENTS,
  RECEIVE_USER_PROFILE_PATIENTS,
  REQUEST_CREATE_ORGANIZATION,
  RECEIVE_CREATE_ORGANIZATION,
  REQUEST_CREATE_CARETEAM,
  RECEIVE_CREATE_CARETEAM,
  REQUEST_CREATE_TEAM_MEMBERSHIP,
  RECEIVE_CREATE_TEAM_MEMBERSHIP,
  REQUEST_CREATE_ROLE,
  RECEIVE_CREATE_ROLE,
  REQUEST_CREATE_TEAM_MEMBERSHIP_CAREPLAN_ROLE,
  RECEIVE_CREATE_TEAM_MEMBERSHIP_CAREPLAN_ROLE,
  REQUEST_SEARCH_USER_BY_EMAIL,
  RECEIVE_SEARCH_USER_BY_EMAIL,
  RESET_SEARCH_USER_BY_EMAIL,
  REQUEST_CARETEAMS,
  RECEIVE_CARETEAMS,
  RECEIVE_PATIENTS_CARE_PLANS_ROLES_AND_PROFILES_WITH_MAX_ALERT,
  RECEIVE_CHECK_PATIENT_DESMOS,
  REQUEST_CHECK_PATIENT_DESMOS,
  RESET_CHECK_PATIENT_DESMOS,
} from '../actions/healthProfessional';

import Patient from '@/models/Patient';
import User from '@/models/UserApi';
import UserProfile from '@/models/UserProfile';
import HealthProfessional from '@/models/HealthProfessional';
import Role from '@/models/Role';
import CareTeam from '@/models/CareTeam';
import TeamMembership from '@/models/TeamMembership';
import TeamMembershipCarePlanRole from '@/models/TeamMembershipCarePlanRole';
import Organization from '@/models/Organization';
import ActiveAlert from '@/models/ActiveAlert';
import AlertConfig from '@/models/AlertConfig';
import AlertConfigParameters from '@/models/alertconfigs-parameters/AlertConfigParameters';

const healthProfessionalInitialState = {
  isFetching: false,
  healthProfessional: null,
  patients: null,
  organization: null,
  careTeams: null,
  teamMembership: null,
  teamMemberships: [],
  role: null,
  teamMembershipCarePlanRole: null,
  user: null,
  userProfile: null,
  patientEmailFound: false,
  patientBeingAdded: null,
  patientExistsInDesmos: null,
};

export default function (state = healthProfessionalInitialState, action) {
  switch (action.type) {
    //USER USER_PROFILE
    case REQUEST_USER_HEALTH_PROFESSIONAL:
      return { ...state, isFetching: true };
    case RECEIVE_USER_HEALTH_PROFESSIONAL:
      return {
        ...state,
        isFetching: false,
        user: Object.assign(new User(), action.user),
      };
    case REQUEST_GET_ME:
      return { ...state, isFetching: true };
    case RECEIVE_GET_ME:
      return {
        ...state,
        isFetching: false,
        userProfile: Object.assign(new UserProfile(), action.userProfile),
      };
    case REQUEST_USER_PROFILE_HEALTH_PROFESSIONAL:
      return { ...state, isFetching: true };
    case RECEIVE_USER_PROFILE_HEALTH_PROFESSIONAL:
      return {
        ...state,
        isFetching: false,
        userProfile: Object.assign(new UserProfile(), action.userProfile),
      };
    case REQUEST_PATCH_USER_HEALTH_PROFESSIONAL:
      return { ...state, isFetching: true };
    case RECEIVE_PATCH_USER_HEALTH_PROFESSIONAL:
      return {
        ...state,
        isFetching: false,
        user: Object.assign(new User(), action.user),
      };
    case REQUEST_PATCH_USER_PROFILE_HEALTH_PROFESSIONAL:
      return { ...state, isFetching: true };
    case RECEIVE_PATCH_USER_PROFILE_HEALTH_PROFESSIONAL:
      return {
        ...state,
        isFetching: false,
        userProfile: Object.assign(new UserProfile(), action.userProfile),
      };
    //HEALTH_PROFESSIONAL
    case REQUEST_HEALTH_PROFESSIONAL:
      return { ...state, isFetching: true };
    case RECEIVE_HEALTH_PROFESSIONAL:
      return {
        ...state,
        isFetching: false,
        healthProfessional: Object.assign(
          new HealthProfessional(),
          action.healthProfessional,
        ),
      };
    case REQUEST_PATCH_HEALTH_PROFESSIONAL:
      return { ...state, isFetching: true };
    case RECEIVE_PATCH_HEALTH_PROFESSIONAL:
      return {
        ...state,
        isFetching: false,
        healthProfessional: Object.assign(
          new HealthProfessional(),
          action.healthProfessional,
        ),
      };
    case REQUEST_PATIENTS:
      return { ...state, isFetching: true };
    case RECEIVE_PATIENTS:
      const receive_patients = action.patients.map(patient =>
        Object.assign(new Patient(), patient),
      );
      return {
        ...state,
        isFetching: false,
        patients: receive_patients.filter(
          (item, pos) =>
            receive_patients.findIndex(
              patient => patient.user === item.user,
            ) === pos,
        ),
      };
    case REQUEST_USER_PROFILE_PATIENTS:
      return { ...state, isFetching: true };
    case RECEIVE_USER_PROFILE_PATIENTS:
      return {
        ...state,
        isFetching: false,
        userProfilesPatients: action.userProfilesPatients.map(userProfile =>
          Object.assign(new UserProfile(), userProfile),
        ),
      };
    case REQUEST_CREATE_ORGANIZATION:
      return { ...state, isFetching: true };
    case RECEIVE_CREATE_ORGANIZATION:
      return {
        ...state,
        isFetching: false,
        organization: Object.assign(new Organization(), action.organization),
      };
    case REQUEST_CREATE_CARETEAM:
      return { ...state, isFetching: true };
    case RECEIVE_CREATE_CARETEAM:
      return {
        ...state,
        isFetching: false,
        careTeam: Object.assign(new CareTeam(), action.careTeam),
      };
    case REQUEST_CREATE_TEAM_MEMBERSHIP:
      return { ...state, isFetching: true };
    case RECEIVE_CREATE_TEAM_MEMBERSHIP:
      return {
        ...state,
        isFetching: false,
        teamMembership: Object.assign(
          new TeamMembership(),
          action.teamMembership,
        ),
      };
    case REQUEST_GET_TEAM_MEMBERSHIPS:
      return { ...state, isFetching: true };
    case RECEIVE_GET_TEAM_MEMBERSHIPS:
      return {
        ...state,
        isFetching: false,
        teamMemberships: action.teamMemberships.map(item =>
          Object.assign(new TeamMembership(), item),
        ),
      };
    case REQUEST_CREATE_ROLE:
      return { ...state, isFetching: true };
    case RECEIVE_CREATE_ROLE:
      return {
        ...state,
        isFetching: false,
        role: Object.assign(new Role(), action.role),
      };
    case REQUEST_CREATE_TEAM_MEMBERSHIP_CAREPLAN_ROLE:
      return { ...state, isFetching: true };
    case RECEIVE_CREATE_TEAM_MEMBERSHIP_CAREPLAN_ROLE:
      return {
        ...state,
        isFetching: false,
        teamMembershipCarePlanRole: Object.assign(
          new TeamMembershipCarePlanRole(),
          action.teamMembershipCarePlanRole,
        ),
      };
    case REQUEST_SEARCH_USER_BY_EMAIL:
      return { ...state, isFetching: true };
    case RECEIVE_SEARCH_USER_BY_EMAIL:
      return {
        ...state,
        isFetching: false,
        patientEmailFound: action.patientEmailFound,
        patientBeingAdded: Object.assign(
          new UserProfile(),
          action.patientBeingAdded[0],
        ),
      };
    case RESET_SEARCH_USER_BY_EMAIL:
      return { ...state, patientEmailFound: false, patientBeingAdded: null };
    case REQUEST_CARETEAMS:
      return { ...state, isFetching: true };
    case RECEIVE_CARETEAMS:
      return { ...state, isFetching: false, careTeams: action.careTeams };
    case RECEIVE_PATIENTS_CARE_PLANS_ROLES_AND_PROFILES_WITH_MAX_ALERT:
      const patients = action.patients.map(patient => {
        const alertMax = patient.alertMax
          ? Object.assign(new ActiveAlert(), {
              ...patient.alertMax,
              config: Object.assign(new AlertConfig(), {
                ...patient.alertMax.config,
                parameters: Object.assign(
                  new AlertConfigParameters(),
                  patient.alertMax.config.parameters,
                ),
              }),
            })
          : null;

        return Object.assign(new Patient(), {
          ...patient,
          profile: Object.assign(new UserProfile(), patient.profile),
          alertMax,
        });
      });

      return {
        ...state,
        patients,
      };

    case REQUEST_CHECK_PATIENT_DESMOS:
      return { ...state, isFetching: true };
    case RECEIVE_CHECK_PATIENT_DESMOS:
      return {
        ...state,
        isFetching: false,
        patientExistsInDesmos: action.patientExistsInDesmos,
      };
    case RESET_CHECK_PATIENT_DESMOS:
      return {
        ...state,
        patientExistsInDesmos: null,
      };
    default:
      return state;
  }
}
