import {
  REQUEST_USER_PATIENT,
  RECEIVE_USER_PATIENT,
  REQUEST_USER_PROFILE_PATIENT,
  RECEIVE_USER_PROFILE_PATIENT,
  REQUEST_PATCH_USER_PATIENT,
  RECEIVE_PATCH_USER_PATIENT,
  REQUEST_PATCH_USER_PROFILE_PATIENT,
  RECEIVE_PATCH_USER_PROFILE_PATIENT,
  REQUEST_PATIENT_CARE_TEAM,
  RECEIVE_PATIENT_CARE_TEAM,
  REQUEST_DELETE_MEMBERSHIP_ROLE,
  RECEIVE_DELETE_MEMBERSHIP_ROLE,
  REQUEST_CREATE_MEMBERSHIP_ROLE,
  RECEIVE_CREATE_MEMBERSHIP_ROLE,
} from '../actions/patient';

import {
  REQUEST_PATIENT,
  RECEIVE_PATIENT,
  REQUEST_PATCH_PATIENT,
  RECEIVE_PATCH_PATIENT,
  REQUEST_GET_CARE_PLANS_FOR_PATIENT,
  RECEIVE_GET_CARE_PLANS_FOR_PATIENT,
  REQUEST_CREATE_CARE_PLAN_FOR_PATIENT,
  RECEIVE_CREATE_CARE_PLAN_FOR_PATIENT,
  //contacts
  REQUEST_PATIENTS_CONTACTS,
  RECEIVE_PATIENT_CONTACTS,
  REQUEST_CREATE_PATIENT_CONTACT,
  RECEIVE_CREATE_PATIENT_CONTACT,
  REQUEST_PATCH_PATIENT_CONTACT,
  RECEIVE_PATCH_PATIENT_CONTACT,
  REQUEST_DELETE_PATIENT_CONTACT,
  RECEIVE_DELETE_PATIENT_CONTACT,
  //medical_contacts
  REQUEST_PATIENT_MEDICAL_CONTACTS,
  RECEIVE_PATIENT_MEDICAL_CONTACTS,
  REQUEST_CREATE_PATIENT_MEDICAL_CONTACT,
  RECEIVE_CREATE_PATIENT_MEDICAL_CONTACT,
  REQUEST_PATCH_PATIENT_MEDICAL_CONTACT,
  RECEIVE_PATCH_PATIENT_MEDICAL_CONTACT,
  REQUEST_DELETE_PATIENT_MEDICAL_CONTACT,
  RECEIVE_DELETE_PATIENT_MEDICAL_CONTACT,
  //consents
  REQUEST_CONSENTS,
  RECEIVE_CONSENTS,
  REQUEST_PATCH_CONSENT,
  RECEIVE_PATCH_CONSENT,
  //observations
  REQUEST_CREATE_OBSERVATION_FOR_PATIENT,
  RECEIVE_CREATE_OBSERVATION_FOR_PATIENT,
  // alerts
  REQUEST_PATIENT_ALERTS,
  RECEIVE_PATIENT_ALERTS,
  REQUEST_RESOLVE_PATIENT_ALERT,
  RECEIVE_RESOLVE_PATIENT_ALERT,
  // alertconfigs
  REQUEST_PATIENT_ALERT_CONFIGS,
  RECEIVE_PATIENT_ALERT_CONFIGS,
  REQUEST_PATCH_PATIENT_ALERT_CONFIGS,
  RECEIVE_PATCH_PATIENT_ALERT_CONFIGS,
  REQUEST_DELETE_PATIENT_ALERT_CONFIGS,
  RECEIVE_DELETE_PATIENT_ALERT_CONFIGS,
  REQUEST_CREATE_PATIENT_ALERT_CONFIGS,
  RECEIVE_CREATE_PATIENT_ALERT_CONFIGS,
  // tasks
  REQUEST_PATIENT_TASKS,
  RECEIVE_PATIENT_TASKS,
  REQUEST_RESOLVE_PATIENT_TASKS,
  RECEIVE_RESOLVE_PATIENT_TASKS,
  REQUEST_MOVE_PATIENT_TASKS,
  RECEIVE_MOVE_PATIENT_TASKS,
  // history
  REQUEST_PATIENT_HISTORY,
  RECEIVE_PATIENT_HISTORY,
  REQUEST_CARE_TEAM,
  RECEIVE_CARE_TEAM,
} from '../actions/patient';

import Patient from '@/models/Patient';
import UserProfile from '@/models/UserProfile';
import User from '@/models/UserApi';
import Contact from '@/models/Contact';
import MedicalContact from '@/models/MedicalContact';
import Task from '@/models/Task';
import CarePlan from '@/models/CarePlan';
import Consent from '@/models/Consent';
import ActiveAlert from '@/models/ActiveAlert';
import AlertConfig from '@/models/AlertConfig';
import AlertConfigParameters from '@/models/alertconfigs-parameters/AlertConfigParameters';
import Observation from '@/models/Observation';

const patientInitialState = {
  isFetching: false,
  patient: null,
  carePlan: [],
  carePlans: [],
  careTeams: {},
  user: null,
  userProfile: null,
  consents: null,
  observations: [],
  alerts: [],
  alertConfigs: [],
  tasks: [],
  history: [],
};

export default function (state = patientInitialState, action) {
  switch (action.type) {
    //USER USER_PROFILE
    case REQUEST_USER_PATIENT:
      return { ...state, isFetching: true };
    case RECEIVE_USER_PATIENT:
      return {
        ...state,
        isFetching: false,
        user: Object.assign(new User(), action.user),
      };
    case REQUEST_USER_PROFILE_PATIENT:
      return { ...state, isFetching: true };
    case RECEIVE_USER_PROFILE_PATIENT:
      return {
        ...state,
        isFetching: false,
        userProfile: Object.assign(new UserProfile(), action.userProfile),
      };
    case REQUEST_PATCH_USER_PATIENT:
      return { ...state, isFetching: true };
    case RECEIVE_PATCH_USER_PATIENT:
      return {
        ...state,
        isFetching: false,
        user: Object.assign(new User(), action.user),
      };
    case REQUEST_PATCH_USER_PROFILE_PATIENT:
      return { ...state, isFetching: true };
    case RECEIVE_PATCH_USER_PROFILE_PATIENT:
      return {
        ...state,
        isFetching: false,
        userProfile: Object.assign(new UserProfile(), action.userProfile),
      };
    //PATIENT
    case REQUEST_PATIENT:
      return { ...state, isFetching: true };
    case RECEIVE_PATIENT:
      return {
        ...state,
        isFetching: false,
        patient: Object.assign(new Patient(), action.patient),
      };
    case REQUEST_PATCH_PATIENT:
      return { ...state, isFetching: true };
    case RECEIVE_PATCH_PATIENT:
      return {
        ...state,
        isFetching: false,
        patient: Object.assign(new Patient(), action.patient),
      };
    case REQUEST_GET_CARE_PLANS_FOR_PATIENT:
      return { ...state, isFetching: true };
    case RECEIVE_GET_CARE_PLANS_FOR_PATIENT:
      return {
        ...state,
        isFetching: false,
        carePlans: action.carePlans.map(carePlan =>
          Object.assign(new CarePlan(), carePlan),
        ),
      };
    case REQUEST_CREATE_CARE_PLAN_FOR_PATIENT:
      return { ...state, isFetching: true };
    case RECEIVE_CREATE_CARE_PLAN_FOR_PATIENT:
      return {
        ...state,
        isFetching: false,
        carePlan: Object.assign(new CarePlan(), action.carePlan),
      };
    //CONTACTS
    case REQUEST_PATIENTS_CONTACTS:
      return { ...state, isFetching: true };
    case RECEIVE_PATIENT_CONTACTS:
      return {
        ...state,
        isFetching: false,
        contacts: action.contacts.map(contact =>
          Object.assign(new Contact(), contact),
        ),
      };
    case REQUEST_CREATE_PATIENT_CONTACT:
      return { ...state, isFetching: true };
    case RECEIVE_CREATE_PATIENT_CONTACT:
      return {
        ...state,
        isFetching: false,
        contacts: [
          ...state.contacts,
          Object.assign(new Contact(), action.contact),
        ],
      };
    case REQUEST_PATCH_PATIENT_CONTACT:
      return { ...state, isFetching: true };
    case RECEIVE_PATCH_PATIENT_CONTACT:
      return {
        ...state,
        isFetching: false,
        contacts: [
          ...state.contacts.filter(contact => contact.id !== action.contact.id),
          Object.assign(new Contact(), action.contact),
        ],
      };
    case REQUEST_DELETE_PATIENT_CONTACT:
      return { ...state, isFetching: true };
    case RECEIVE_DELETE_PATIENT_CONTACT:
      return {
        ...state,
        isFetching: false,
        contacts: [
          ...state.contacts.filter(contact => contact.id !== action.contactID),
        ],
      };
    //MEDICAL_CONTACTS
    case REQUEST_PATIENT_MEDICAL_CONTACTS:
      return { ...state, isFetching: true };
    case RECEIVE_PATIENT_MEDICAL_CONTACTS:
      return {
        ...state,
        isFetching: false,
        medicalContacts: action.medicalContacts.map(medicalContact =>
          Object.assign(new MedicalContact(), medicalContact),
        ),
      };
    case REQUEST_CREATE_PATIENT_MEDICAL_CONTACT:
      return { ...state, isFetching: true };
    case RECEIVE_CREATE_PATIENT_MEDICAL_CONTACT:
      return {
        ...state,
        isFetching: false,
        medicalContacts: [
          ...state.medicalContacts,
          Object.assign(new MedicalContact(), action.medicalContact),
        ],
      };
    case REQUEST_PATCH_PATIENT_MEDICAL_CONTACT:
      return { ...state, isFetching: true };
    case RECEIVE_PATCH_PATIENT_MEDICAL_CONTACT:
      return {
        ...state,
        isFetching: false,
        medicalContacts: [
          ...state.medicalContacts.filter(
            medicalContact => medicalContact.id !== action.medicalContact.id,
          ),
          Object.assign(new MedicalContact(), action.medicalContact),
        ],
      };
    case REQUEST_DELETE_PATIENT_MEDICAL_CONTACT:
      return { ...state, isFetching: true };
    case RECEIVE_DELETE_PATIENT_MEDICAL_CONTACT:
      return {
        ...state,
        isFetching: false,
        medicalContacts: [
          ...state.medicalContacts.filter(
            medicalContact => medicalContact.id !== action.medicalContactID,
          ),
        ],
      };
    case REQUEST_CONSENTS:
      return { ...state, isFetching: true };
    case RECEIVE_CONSENTS:
      return {
        ...state,
        isFetching: false,
        consents: action.consents.map(consent =>
          Object.assign(new Consent(), consent),
        ),
      };
    case REQUEST_PATCH_CONSENT:
      return { ...state, isFetching: true };
    case RECEIVE_PATCH_CONSENT:
      return {
        ...state,
        isFetching: false,
        consent: [
          ...state.consents.filter(consent => consent.id !== action.consent.id),
          action.consent,
        ],
      };
    // OBSERVATIONS
    case REQUEST_CREATE_OBSERVATION_FOR_PATIENT:
      return { ...state, isFetching: true };
    case RECEIVE_CREATE_OBSERVATION_FOR_PATIENT:
      return {
        ...state,
        isFetching: false,
        observations: [
          ...state.observations,
          Object.assign(new Observation(), action.observations),
        ],
      };
    // ALERTS
    case REQUEST_PATIENT_ALERTS:
      return { ...state, isFetching: true };
    case RECEIVE_PATIENT_ALERTS:
      const newAlerts = action.alerts.map(alert =>
        Object.assign(new ActiveAlert(), {
          ...alert,
          user: null,
          user_removed: null,
          config: Object.assign(new AlertConfig(), {
            ...alert.config,
            parameters: Object.assign(
              new AlertConfigParameters(),
              alert.config.parameters,
            ),
          }),
        }),
      );

      return {
        ...state,
        isFetching: false,
        alerts: newAlerts,
      };
    case REQUEST_RESOLVE_PATIENT_ALERT:
      return { ...state, isLoading: true };
    case RECEIVE_RESOLVE_PATIENT_ALERT:
      return {
        ...state,
        isLoading: false,
        alerts: state.alerts.filter(alert => alert.id !== action.alertId),
      };
    // TASKS
    case REQUEST_PATIENT_TASKS:
      return { ...state, isFetching: true };
    case RECEIVE_PATIENT_TASKS:
      return {
        ...state,
        isFetching: false,
        tasks: action.tasks.map(task => Object.assign(new Task(), task)),
      };
    case REQUEST_RESOLVE_PATIENT_TASKS:
      return { ...state, isFetching: true };
    case RECEIVE_RESOLVE_PATIENT_TASKS:
      return {
        ...state,
        isFetching: false,
        tasks: state.tasks.filter(task => task.id !== action.task.id),
      };
    case REQUEST_MOVE_PATIENT_TASKS:
      return { ...state, isFetching: true };
    case RECEIVE_MOVE_PATIENT_TASKS:
      return {
        ...state,
        isFetching: false,
        tasks: state.tasks.map(task =>
          task.id === action.task.id
            ? Object.assign(new Task(), action.task)
            : task,
        ),
      };
    case REQUEST_PATIENT_HISTORY:
      return { ...state, isLoading: true };
    case RECEIVE_PATIENT_HISTORY:
      const history = action.history.map(element => {
        if (element.type === 'task') {
          return Object.assign(new Task(), element);
        } else if (element.type === 'alert') {
          return Object.assign(new ActiveAlert(), {
            ...element,
            config: Object.assign(new AlertConfig(), {
              ...element.config,
              parameters: Object.assign(
                new AlertConfigParameters(),
                element.config.parameters,
              ),
            }),
            user_removed: Object.assign(
              new UserProfile(),
              element.user_removed,
            ),
          });
        } else if (element.type === 'observation') {
          return Object.assign(new Observation(), {
            ...element,
            author: element.author,
          });
        }
      });

      return {
        ...state,
        isLoading: false,
        history: history.sort((a, b) => new Date(b.date) - new Date(a.date)),
      };
    case REQUEST_CARE_TEAM:
      return { ...state, isFetching: true };
    case RECEIVE_CARE_TEAM:
      return {
        ...state,
        isFetching: false,
        careTeams: { ...state.careTeams, [action.carePlanId]: action.careTeam },
      };
    case REQUEST_PATIENT_ALERT_CONFIGS:
      return { ...state, isFetching: true };
    case RECEIVE_PATIENT_ALERT_CONFIGS:
      const alertConfigs = action.alertConfigs.map(alertConfig =>
        Object.assign(new AlertConfig(), {
          ...alertConfig,
          parameters: Object.assign(
            new AlertConfigParameters(),
            alertConfig.parameters,
          ),
        }),
      );

      return {
        ...state,
        isFetching: false,
        alertConfigs: alertConfigs,
      };
    case REQUEST_PATCH_PATIENT_ALERT_CONFIGS:
      return { ...state, isFetching: true };
    case RECEIVE_PATCH_PATIENT_ALERT_CONFIGS:
      const updatedAlertConfigsList = state.alertConfigs.map(alertConfig => {
        if (alertConfig.id === action.patchedAlertConfig.id) {
          return Object.assign(new AlertConfig(), {
            ...action.patchedAlertConfig,
            parameters: Object.assign(
              new AlertConfigParameters(),
              action.patchedAlertConfig.parameters,
            ),
          });
        }

        return alertConfig;
      });

      return {
        ...state,
        isFetching: false,
        alertConfigs: updatedAlertConfigsList,
      };
    case REQUEST_DELETE_PATIENT_ALERT_CONFIGS:
      return { ...state, isFetching: true };
    case RECEIVE_DELETE_PATIENT_ALERT_CONFIGS:
      return {
        ...state,
        isFetching: false,
        alertConfigs: state.alertConfigs.filter(
          alertConfig => alertConfig.id !== action.alertConfigId,
        ),
      };

    case REQUEST_CREATE_PATIENT_ALERT_CONFIGS:
      return { ...state, isFetching: true };
    case RECEIVE_CREATE_PATIENT_ALERT_CONFIGS:
      return {
        ...state,
        isFetching: false,
        alertConfigs: [
          ...state.alertConfigs,
          Object.assign(new AlertConfig(), {
            ...action.alertConfig,
            parameters: Object.assign(
              new AlertConfigParameters(),
              action.alertConfig.parameters,
            ),
          }),
        ],
      };
    case REQUEST_PATIENT_CARE_TEAM:
      return { ...state, isFetching: true };
    case RECEIVE_PATIENT_CARE_TEAM:
      const members = action.careTeam.members.map(member => ({
        ...member,
        membership: {
          ...member.membership,
          health_professional: Object.assign(
            new UserProfile(),
            member.membership.health_professional,
          ),
        },
      }));

      return {
        ...state,
        isFetching: false,
        careTeams: {
          ...state.careTeams,
          [action.carePlanId]: {
            ...state.careTeams[action.carePlanId],
            ...action.careTeam,
            members,
          },
        },
      };
    case REQUEST_DELETE_MEMBERSHIP_ROLE:
      return { ...state, isFetching: true };
    case RECEIVE_DELETE_MEMBERSHIP_ROLE:
      const newCareTeam = state.careTeams[action.carePlanId].members.map(
        member => {
          if (member.id === action.memberId) {
            return {
              ...member,
              membership: {
                ...member.membership,
                health_professional: Object.assign(
                  new UserProfile(),
                  member.membership.health_professional,
                ),
              },
              roles: member.roles.filter(role => role.id !== action.roleId),
            };
          }

          return member;
        },
      );

      return {
        ...state,
        isFetching: false,
        careTeams: {
          ...state.careTeams,
          [action.carePlanId]: {
            ...state.careTeams[action.carePlanId],
            members: newCareTeam,
          },
        },
      };

    case REQUEST_CREATE_MEMBERSHIP_ROLE:
      return { ...state, isFetching: true };
    case RECEIVE_CREATE_MEMBERSHIP_ROLE:
      const newCareTeamRoleAdded = state.careTeams[
        action.carePlanId
      ].members.map(member => {
        if (member.membership.health_professional.user === action.hpId) {
          return {
            ...member,
            membership: {
              ...member.membership,
              health_professional: Object.assign(
                new UserProfile(),
                member.membership.health_professional,
              ),
            },
            roles: [...member.roles, action.newRole],
          };
        }

        return member;
      });

      return {
        ...state,
        isFetching: false,
        careTeams: {
          ...state.careTeams,
          [action.carePlanId]: {
            ...state.careTeams[action.carePlanId],
            members: newCareTeamRoleAdded,
          },
        },
      };
    default:
      return state;
  }
}
